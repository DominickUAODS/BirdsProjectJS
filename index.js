import { startSpawning, stopSpawning } from "./birdManager.js";
import { toggleContainers, initializePreloader, bindUpgradeButtons } from "./uiManager.js";
import { updateUpgradeCosts, adjustBirdPointsRange } from "./upgrades.js"
import { updateStats } from "./points.js"

document.getElementById("statistic-btn").addEventListener("click", toggleContainers);
window.onload = initializePreloader;

document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.querySelector(".btn-start");
	const stopButton = document.querySelector(".btn-stop");

	startButton.addEventListener("click", startSpawning);
	stopButton.addEventListener("click", stopSpawning);

	// Current level + point
	const currentLevel = localStorage.getItem("currentLevel") || "1";
	const totalPoints = localStorage.getItem("totalPoints") || "0";
	//const allPoints = localStorage.getItem("allPoints") || "0";
	//const missedPoints = localStorage.getItem("missedPoints") || "0";

	const levelElement = document.getElementById("current-level");
	if (levelElement) {
		levelElement.textContent = `${currentLevel}`;
	}

	const pointsElement = document.querySelector(".label-top-container-total-count-points");
	if (pointsElement) {
		pointsElement.textContent = `${totalPoints}`;
	}

	let sessionStartTime = Date.now();

	startButton.addEventListener("click", () => {
		sessionStartTime = Date.now();

		if (!localStorage.getItem("startTime")) {
			const startTime = new Date().toISOString();
			localStorage.setItem("startTime", startTime);
		}

	});

	stopButton.addEventListener("click", () => {
		const sessionEndTime = Date.now();
		const sessionDuration = sessionEndTime - sessionStartTime;

		let totalTimePlayed = parseInt(localStorage.getItem("totalTimePlayed") || "0", 10);
		totalTimePlayed += sessionDuration;
		localStorage.setItem("totalTimePlayed", totalTimePlayed);

		updateStats();
	});

	updateUpgradeCosts(currentLevel);
	adjustBirdPointsRange(currentLevel);
	bindUpgradeButtons();
	

	// Audio
	const muteToggle = document.getElementById("mute-toggle");
	const volumeSlider = document.getElementById("volume-slider");
	const backgroundMusic = document.getElementById("background-music");
	const clickSound = document.getElementById("click-sound");
	const upgradeSound = document.getElementById("upgrade-sound");

	let savedVolume = parseFloat(localStorage.getItem("volume")) || 1.0;
	let isMuted = localStorage.getItem("isMuted") === "true";

	let previousVolume = savedVolume;
	if (isMuted) {
		volumeSlider.value = 0;
	} else {
		volumeSlider.value = savedVolume * 100;
	}
	muteToggle.checked = isMuted;

	// Set volume
	const setVolume = (volume) => {
		backgroundMusic.volume = volume;
		clickSound.volume = volume;
		upgradeSound.volume = volume;
	};

	setVolume(isMuted ? 0 : previousVolume);

	// Background music
	backgroundMusic.play().catch(function (error) {
		const playButton = document.createElement("button");
		playButton.innerText = "Play Music";
		document.body.appendChild(playButton);
		playButton.addEventListener("click", function () {
			backgroundMusic.play();
			playButton.remove();
		});
	});

	// Volume control
	volumeSlider.addEventListener("input", function () {
		const volume = volumeSlider.value / 100;
		if (!muteToggle.checked) {
			previousVolume = volume;
			setVolume(volume);
			localStorage.setItem("volume", volume);
		}
	});

	// Mute
	muteToggle.addEventListener("change", function () {
		if (muteToggle.checked) {
			setVolume(0);
			volumeSlider.value = 0;
			localStorage.setItem("isMuted", true);
		} else {
			setVolume(previousVolume);
			volumeSlider.value = previousVolume * 100;
			localStorage.setItem("isMuted", false);
		}
	});
});
