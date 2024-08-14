import { getRandomRow, getRandomSpeed, getRandomDelay } from './utils.js';
import { getTotalPoints, updateTotalPoints } from './points.js';

let isRunning = false;
let spawnIntervalId;

export function startSpawning() {
    if (!isRunning) {
        isRunning = true;
        spawnBirds();
        spawnIntervalId = setInterval(spawnBirds, getRandomDelay());
    }
}

export function stopSpawning() {
    isRunning = false;
    clearInterval(spawnIntervalId);
    removeAllBirds();
}

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
        points--;
        imgWrapper.dataset.points = points;
        numberLabel.textContent = points;

        let totalPoints = getTotalPoints();
        totalPoints++;
        updateTotalPoints(1); // Update total points
        document.querySelector('.label-top-container-total-count-points').textContent = totalPoints;

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

function spawnBirds() {
    if (!isRunning) return;
    const row = getRandomRow();
    if (row.querySelectorAll('.image').length < 10) { 
        createImageElement(row, getRandomDelay(), getRandomSpeed(), 'img/flying-fly.gif');
    }
}

function removeAllBirds() {
    const rows = [document.querySelector('.first-row'), document.querySelector('.second-row'), document.querySelector('.third-row')];
    rows.forEach(row => {
        const birds = row.querySelectorAll('.image');
        birds.forEach(bird => row.removeChild(bird));
    });
}
