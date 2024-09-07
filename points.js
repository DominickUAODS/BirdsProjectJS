export function getTotalPoints() {
	return parseInt(localStorage.getItem("totalPoints") || "0", 10);
}

export function updateTotalPoints(amount) {
	const totalPoints = getTotalPoints() + amount;
	localStorage.setItem("totalPoints", totalPoints);
	return totalPoints;
}

export function getAllPoints() {
	return parseInt(localStorage.getItem("allPoints") || "0", 10);
}

export function updateAllPoints(amount) {
	const allPoints = getAllPoints() + amount;
	localStorage.setItem("allPoints", allPoints);
	return allPoints;
}

export function canAfford(cost) {
	return getTotalPoints() >= cost;
}

export function resetAllData() {
	localStorage.clear();
	window.location.reload();
}

export function updateStats() {
	// Current point
	let allPoints = parseInt(localStorage.getItem("allPoints") || "0", 10);
	let totalPoints = parseInt(localStorage.getItem("totalPoints") || "0", 10);

	// Stat
	document.querySelector("#all-points").textContent = allPoints;
	document.querySelector("#total-points").textContent = totalPoints;

	// Missed points
	let missedPoints = parseInt(localStorage.getItem("missedPoints") || "0", 10);
	document.querySelector("#missed-points").textContent = missedPoints;

	// Start
	const startTime = localStorage.getItem("startTime");
	document.querySelector("#start-time").textContent = startTime;

	// Total
	const totalTimePlayed = parseInt(localStorage.getItem("totalTimePlayed") || "0", 10);
	const totalTimeInSeconds = Math.floor(totalTimePlayed / 1000);
	document.querySelector("#total-time-played").textContent = formatTime(totalTimeInSeconds);

	// Total Upgrades
	let totalUpgrades = parseInt(localStorage.getItem("totalUpgrades") || "0", 10);
	document.querySelector("#total-upgrades").textContent = totalUpgrades;
}

export function formatTime(seconds) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds % 60;
	return `${h}h ${m}m ${s}s`;
}
