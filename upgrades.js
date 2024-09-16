import { updateTotalPoints, canAfford, updateStats, getTotalPoints, updateAllPoints } from "./points.js";
import { updateLabel, displayMessage, updateLevel } from "./uiManager.js";

function getUpgradeCount(item) {
	return parseInt(localStorage.getItem(item) || "0", 10);
}

function updateUpgradeCount(item, count) {
	localStorage.setItem(item, count);
}

export function calculateUpgradeCost(baseCost, level) {
	let upgradeCost = baseCost * Math.pow(3.5, level - 1);
	return Math.ceil(upgradeCost);
}

export function purchaseUpgrade(item, baseCost, labelHave, labelMessage) {
	if (window.isRunning === true) {
		checkAndUpdateLevel();

		const currentLevel = parseInt(localStorage.getItem("currentLevel") || "1", 10);
		const calculatedCost = calculateUpgradeCost(baseCost, currentLevel);

		if (canAfford(calculatedCost)) {
			//audio
			const upgradeSound = document.getElementById("upgrade-sound");
			upgradeSound.play();

			const currentCount = getUpgradeCount(item) + 1;
			updateUpgradeCount(item, currentCount);
			updateTotalPoints(-calculatedCost);
			updateLabel(labelHave, currentCount);

			let totalUpgrades = parseInt(localStorage.getItem("totalUpgrades") || "0", 10);
			totalUpgrades++;
			localStorage.setItem("totalUpgrades", totalUpgrades);

			updateStats();


			// new
			if (item === "sling") {
				incrementClickPoints();
			} else if (item === "drone") {
				//removeAllBirdsFromRow(row);
				//activateRowSelection();
				activateDroneMode();
			} else if (item === "tnt") {
				removeAllBirdsFromScreen();
			} else if (item === "autoclicker") {
				let autoClickerCount = getUpgradeCount("autoclicker") + 1;
				updateUpgradeCount("autoclicker", autoClickerCount)
				startAutoClicker(autoClickerCount, currentLevel);
			}
		} else {
			const originalMessage = labelMessage.textContent;
			displayMessage(labelMessage, "Keep Playing", originalMessage);
		}
	}
}

let clickPoints = parseInt(localStorage.getItem("clickPoints") || "1", 10);

let autoClickerInterval;

export function startAutoClicker(clickerCount, level) {
	const clicksPerSecond = clickerCount * level;
	const interval = 5000 / clicksPerSecond;

	clearInterval(autoClickerInterval);

	autoClickerInterval = setInterval(() => {
		autoClickAllRows();
	}, interval);
}

function autoClickAllRows() {
	const rows = [document.querySelector(".first-row"), document.querySelector(".second-row"), document.querySelector(".third-row")];
	rows.forEach(row => {
		const birds = row.querySelectorAll(".image");
		birds.forEach(bird => {
			let points = parseInt(bird.dataset.points, 10);
			const getPoints = getClickPoints();

			points -= getPoints;

			if (points <= 0) {
				row.removeChild(bird);
			} else {
				bird.dataset.points = points;
				const numberLabel = bird.querySelector("div");
				numberLabel.textContent = points;
			}

			let totalPoints = getTotalPoints();
			totalPoints += getPoints;
			updateTotalPoints(getPoints);
			updateAllPoints(getPoints);
			updateStats();

			document.querySelector(".label-top-container-total-count-points").textContent = totalPoints;
		});
	});
}

function incrementClickPoints() {
	clickPoints *= 2;
	localStorage.setItem("clickPoints", clickPoints);
}

export function getClickPoints() {
	return clickPoints;
}

function activateDroneMode() {
	const rows = document.querySelectorAll(".first-row, .second-row, .third-row");

	rows.forEach(row => {
		row.classList.add("row-class");
	});

	activateRowSelection(); 
}

function deactivateDroneMode() {
	const rows = document.querySelectorAll(".first-row, .second-row, .third-row");

	rows.forEach(row => {
		row.classList.remove("row-class");
	});
	
	deactivateRowSelection(); 
}

function activateRowSelection() {
	window.isRowSelectionActive = true;
	document.querySelectorAll(".row-class").forEach(row => {
		row.classList.add("selectable-row");
		row.addEventListener("click", handleRowClick);
	});
}

function handleRowClick(event) {
	if (window.isRowSelectionActive) {
		const row = event.currentTarget;
		removeAllBirdsFromRow(row);
		//deactivateRowSelection();
		deactivateDroneMode();
	}
}

function deactivateRowSelection() {
	window.isRowSelectionActive = false;
	document.querySelectorAll(".selectable-row").forEach(row => {
		row.classList.remove("selectable-row");
		row.removeEventListener("click", handleRowClick);
	});
}

function removeAllBirdsFromRow(row) {
	const birds = row.querySelectorAll(".image");
	birds.forEach(bird => {
		row.removeChild(bird);
		incrementTotalAllPoints(parseInt(bird.dataset.points));
	});
}

function removeAllBirdsFromScreen() {
	const rows = [document.querySelector(".first-row"), document.querySelector(".second-row"), document.querySelector(".third-row")];
	rows.forEach(row => {
		const birds = row.querySelectorAll(".image");
		birds.forEach(bird => {
			row.removeChild(bird);
			incrementTotalAllPoints(parseInt(bird.dataset.points));
		});
	});
}

function incrementTotalAllPoints(points) {
	let totalPoints = parseInt(localStorage.getItem("totalPoints") || "0", 10);
	totalPoints += points;
	localStorage.setItem("totalPoints", totalPoints);
	let allPoints = parseInt(localStorage.getItem("allPoints") || "0", 10);
	allPoints += points;
	localStorage.setItem("allPoints", allPoints);
	const totalPointsLabel = document.querySelector(".label-top-container-total-count-points");
	totalPointsLabel.textContent = totalPoints;
}

export function loadUpgradeCounts() {
	const slingCount = getUpgradeCount("sling");
	const dronCount = getUpgradeCount("drone");
	const tntCount = getUpgradeCount("tnt");
	const autoclickerCount = getUpgradeCount("autoclicker");

	return { slingCount, dronCount, tntCount, autoclickerCount };
}

function checkAndUpdateLevel() {
	let level = parseInt(localStorage.getItem("currentLevel") || "1", 10);
	let allPoints = parseInt(localStorage.getItem("allPoints") || "0", 10);
	let totalUpgrades = parseInt(localStorage.getItem("totalUpgrades") || "0", 10);

	if (level === 1 && (allPoints >= 1000 || totalUpgrades >= 10)) {
		level = 2;
	} else if (level === 2 && (allPoints >= 10_000 || totalUpgrades >= 30)) {
		level = 3;
	} else if (level === 3 && (allPoints >= 100_000 || totalUpgrades >= 80)) {
		level = 4;
	} else if (level === 4 && (allPoints >= 500_000 || totalUpgrades >= 170)) {
		level = 5;
	} else if (level === 5 && (allPoints >= 1_000_000 || totalUpgrades >= 310)) {
		level = 6;
	} else if (level === 6 && (allPoints >= 5_000_000 || totalUpgrades >= 480)) {
		level = 7;
	} else if (level === 7 && (allPoints >= 10_000_000 || totalUpgrades >= 790)) {
		level = 8;
	} else if (level === 8 && (allPoints >= 50_000_000 || totalUpgrades >= 1_270)) {
		level = 9;
	} else if (level === 9 && (allPoints >= 100_000_000 || totalUpgrades >= 2_060)) {
		level = 10;
	} else if (level === 10 && (allPoints >= 500_000_000 || totalUpgrades >= 3_330)) {
		alert("Contact developers to add new levels")
	}

	updateLevel(level);
	adjustBirdPointsRange(level);
	updateUpgradeCosts(level);
}

export function adjustBirdPointsRange(level) {
	let basePoints = 40;
	//let rangeFactor = level * 2;
	let rangeFactor = Math.pow(1.5, level - 1);
	window.birdPointsRange = basePoints + basePoints * Math.ceil(rangeFactor);
}

export function updateUpgradeCosts(level) {
	const baseSlingCost = 150;
	const baseDroneCost = 200;
	const baseTntCost = 300;
	const baseAutoclickerCost = 500;

	const slingCost = calculateUpgradeCost(baseSlingCost, level);
	const droneCost = calculateUpgradeCost(baseDroneCost, level);
	const tntCost = calculateUpgradeCost(baseTntCost, level);
	const autoclickerCost = calculateUpgradeCost(baseAutoclickerCost, level);

	document.querySelector('.sling-button .price-label').textContent = slingCost;
	document.querySelector('.dron-button .price-label').textContent = droneCost;
	document.querySelector('.tnt-button .price-label').textContent = tntCost;
	document.querySelector('.auto-button .price-label').textContent = autoclickerCost;
}
