import { getRandomRow, getRandomSpeed, getRandomDelay } from './utils.js';
import { getTotalPoints, updateTotalPoints, updateAllPoints, updateStats } from './points.js';
import { getClickPoints } from './upgrades.js'

window.isRunning = false;
let spawnIntervalId;

export function startSpawning() {
	if (!window.isRunning) {
		window.isRunning = true;
		spawnBirds();
		spawnIntervalId = setInterval(spawnBirds, getRandomDelay());
	}
}

export function stopSpawning() {
	window.isRunning = false;
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

	let randomNumber = Math.floor(Math.random() * window.birdPointsRange) + 1;
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

	if (!window.isRowSelectionActive) {
		imgWrapper.addEventListener('click', function () {

			let getPoints = getClickPoints();
			// audio
			const clickSound = document.getElementById('click-sound');
			clickSound.play();

			let points = parseInt(imgWrapper.dataset.points, 10);

			if (points < getPoints) {
				getPoints = points;
			}

			points -= getPoints;

			if (points <= 0) {
				row.removeChild(imgWrapper);
			} else {
				imgWrapper.dataset.points = points;
				numberLabel.textContent = points;
			}

			let totalPoints = getTotalPoints();
			//totalPoints++;
			totalPoints += getPoints;
			updateTotalPoints(getPoints);	// Update total points
			updateAllPoints(getPoints);		// Update all points
			updateStats();
			document.querySelector('.label-top-container-total-count-points').textContent = totalPoints;

		})
	};

	imgWrapper.addEventListener('animationend', () => {
		if (imgWrapper.parentNode) {
			row.removeChild(imgWrapper);

			let missedPoints = parseInt(localStorage.getItem("missedPoints") || "0", 10);
			missedPoints += parseInt(imgWrapper.dataset.points, 10);
			localStorage.setItem("missedPoints", missedPoints);
		}
	});

	row.appendChild(imgWrapper);
}

function spawnBirds() {
	if (!window.isRunning) return;
	const row = getRandomRow();
	if (row.querySelectorAll('.image').length < 10) {
		createImageElement(row, getRandomDelay(), getRandomSpeed(), 'img/bird-gif-main.gif');
	}
}

function removeAllBirds() {
	const rows = [document.querySelector('.first-row'), document.querySelector('.second-row'), document.querySelector('.third-row')];
	rows.forEach(row => {
		const birds = row.querySelectorAll('.image');
		birds.forEach(bird => row.removeChild(bird));
	});
}

document.querySelectorAll(".image").forEach(bird => {
	bird.addEventListener("click", function () {
		const row = bird.closest('.row-class');

		if (!window.isRowSelectionActive && !row) {
			let points = parseInt(bird.dataset.points, 10);
			let getPoints = getClickPoints();

			const clickSound = document.getElementById('click-sound');
			clickSound.play();
			
			points -= getPoints;

			if (points <= 0) {
				bird.remove(); 
			} else {
				bird.dataset.points = points;
			}

			let totalPoints = getTotalPoints();
			totalPoints += getPoints;
			updateTotalPoints(getPoints);
			updateAllPoints(getPoints);
			updateStats();
		}
	});
});
