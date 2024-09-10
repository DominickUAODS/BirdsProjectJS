import { purchaseUpgrade } from "./upgrades.js";
import { resetAllData, updateStats } from "./points.js";

export function toggleContainers() {
	updateStats();
	const leftContainer = document.querySelector(".left-container");
	const leftContainerStat = document.querySelector(".left-container-stat");

	if (leftContainerStat.style.display === "block" || leftContainerStat.style.display === "") {
		leftContainerStat.style.display = "none";
		leftContainer.style.display = "block";
	} else {
		leftContainerStat.style.display = "block";
		leftContainer.style.display = "none";
	}
}

export function initializePreloader() {
	let preloader = document.getElementById("preloader");
	preloader.classList.add("hide-preloader");
	setTimeout(() => {
		preloader.classList.add("preloader-hidden");
	}, 1000);
}

export function updateLabel(label, value) {
	label.textContent = value;
	localStorage.setItem(label.className, value);
}

export function displayMessage(labelMessage, message, initialMessage = "") {
	labelMessage.textContent = message;
	setTimeout(() => {
		labelMessage.textContent = initialMessage;
	}, 2000);
}

export function bindUpgradeButtons() {
	const slingButton = document.querySelector(".sling-button");
	const dronButton = document.querySelector(".dron-button");
	const tntButton = document.querySelector(".tnt-button");
	const autoButton = document.querySelector(".auto-button");

	const slingLabelHave = document.querySelector(".sling-label-have");
	const dronLabelHave = document.querySelector(".dron-label-have");
	const tntLabelHave = document.querySelector(".tnt-label-have");
	const autoLabelHave = document.querySelector(".auto-label-have");

	const slingMessage = document.querySelector(".desc-sling-label");
	const dronMessage = document.querySelector(".desc-dron-label");
	const tntMessage = document.querySelector(".desc-tnt-label");
	const autoMessage = document.querySelector(".desc-auto-label");

	// slingLabelHave.textContent = localStorage.getItem("sling-label-have") || "0";
	// dronLabelHave.textContent = localStorage.getItem("dron-label-have") || "0";
	// tntLabelHave.textContent = localStorage.getItem("tnt-label-have") || "0";
	// autoLabelHave.textContent = localStorage.getItem("auto-label-have") || "0";

	slingLabelHave.textContent = localStorage.getItem("sling") || "0";
	dronLabelHave.textContent = localStorage.getItem("dron") || "0";
	tntLabelHave.textContent = localStorage.getItem("tnt") || "0";
	autoLabelHave.textContent = localStorage.getItem("autoclicker") || "0";

	slingButton.addEventListener("click", () => purchaseUpgrade("sling", 150, slingLabelHave, slingMessage));
	dronButton.addEventListener("click", () => purchaseUpgrade("drone", 200, dronLabelHave, dronMessage));
	tntButton.addEventListener("click", () => purchaseUpgrade("tnt", 300, tntLabelHave, tntMessage));
	autoButton.addEventListener("click", () => purchaseUpgrade("autoclicker", 500, autoLabelHave, autoMessage));
}

export function updateLevel(level) {
	const levelElement = document.getElementById("current-level");
	levelElement.textContent = level;
	localStorage.setItem("currentLevel", level);
}

document.getElementById("reset-button").addEventListener("click", resetAllData);
