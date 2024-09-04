import { getClickPoints } from './upgrades.js';

document.getElementById('statistic-btn').addEventListener('click', function() {
    const leftContainer = document.querySelector('.left-container');
    const leftContainerStat = document.querySelector('.left-container-stat');

    if (leftContainerStat.style.display === 'block' || leftContainerStat.style.display === '') {
        leftContainerStat.style.display = 'none';
        leftContainer.style.display = 'block';
    } else {
        leftContainerStat.style.display = 'block';
        leftContainer.style.display = 'none';
    }
});

window.onload = function() {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
    setInterval(function() {
          preloader.classList.add('preloader-hidden');
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const firstRow = document.querySelector('.first-row');
    const secondRow = document.querySelector('.second-row');
    const thirdRow = document.querySelector('.third-row');
    const totalPointsLabel = document.querySelector('.label-top-container-total-count-points');
    const startButton = document.querySelector('.btn-start');
    const stopButton = document.querySelector('.btn-stop');
    
    let totalPoints = localStorage.getItem('totalPoints') || 0;
    totalPointsLabel.textContent = totalPoints;

    let isRunning = false;
    let spawnIntervalId;

    function createImageElement(row, delay, speed, src) {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('image');
        imgWrapper.style.animationDuration = `${speed}s`;

        const img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        img.style.height = '100%';
        let randomNumber = Math.floor(Math.random() * 40) + 1;
        imgWrapper.dataset.points = randomNumber;

        const numberLabel = document.createElement('div');
        numberLabel.textContent = randomNumber;
        numberLabel.style.position = 'absolute';
        numberLabel.style.top = '-20px';
        numberLabel.style.left = '0';
        numberLabel.style.width = '100%';
        numberLabel.style.textAlign = 'center';

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(numberLabel);

        imgWrapper.addEventListener('click', function() {
            let points = parseInt(imgWrapper.dataset.points, 10);
            //points--;
            points -= getClickPoints();  // new calculation
            imgWrapper.dataset.points = points;
            numberLabel.textContent = points;

            //totalPoints++;
            totalPoints += getClickPoints(); // new caclulation
            localStorage.setItem('totalPoints', totalPoints);
            totalPointsLabel.textContent = totalPoints;

            if (points <= 0) {
                row.removeChild(imgWrapper);
            }
        });

        row.appendChild(imgWrapper);

        imgWrapper.addEventListener('animationend', () => {
            if (imgWrapper.parentNode) {
                row.removeChild(imgWrapper);
            }
        });
    }

    function getRandomRow() {
        const rows = [firstRow, secondRow, thirdRow];
        return rows[Math.floor(Math.random() * rows.length)];
    }

    function getRandomSpeed() {
        return Math.random() * 5 + 8; 
    }

    function getRandomDelay() {
        return Math.random() * 2000 + 2000; 
    }

    function spawnBirds() {
        if (!isRunning) return;

        const row = getRandomRow();
        if (row.querySelectorAll('.image').length < 10) { 
            const delay = getRandomDelay();
            const speed = getRandomSpeed();
            createImageElement(row, delay, speed, 'img/flying-fly.gif');
        }
    }

    function startSpawning() {
        if (!isRunning) {
            isRunning = true;
            spawnBirds();
            spawnIntervalId = setInterval(spawnBirds, getRandomDelay());
        }
    }

    function stopSpawning() {
        isRunning = false;
        clearInterval(spawnIntervalId);
        const rows = [firstRow, secondRow, thirdRow];
        rows.forEach(row => {
            const birds = row.querySelectorAll('.image');
            birds.forEach(bird => row.removeChild(bird));
        });
    }

    startButton.addEventListener('click', startSpawning);
    stopButton.addEventListener('click', stopSpawning);
});
