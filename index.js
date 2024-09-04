import { startSpawning, stopSpawning } from "./birdManager.js";
import { toggleContainers, initializePreloader, bindUpgradeButtons } from "./uiManager.js";

document.getElementById("statistic-btn").addEventListener("click", toggleContainers);
window.onload = initializePreloader;

document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.querySelector(".btn-start");
	const stopButton = document.querySelector(".btn-stop");

	startButton.addEventListener("click", startSpawning);
	stopButton.addEventListener("click", stopSpawning);

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
