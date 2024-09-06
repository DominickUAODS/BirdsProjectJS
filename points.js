export function getTotalPoints() {
	return parseInt(localStorage.getItem("totalPoints") || "0", 10);
}

export function updateTotalPoints(amount) {
	const totalPoints = getTotalPoints() + amount;
	localStorage.setItem("totalPoints", totalPoints);
	return totalPoints;
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
	currentPoints = parseInt(localStorage.getItem("currentPoints") || "0", 10);
	totalPoints = parseInt(localStorage.getItem("totalPoints") || "0", 10);

	// Stat
	document.querySelector("#current-points").textContent = currentPoints;
	document.querySelector("#total-points").textContent = totalPoints;

	// Missed points
	missedPoints = parseInt(localStorage.getItem("missedPoints") || "0", 10);
	document.querySelector("#missed-points").textContent = missedPoints;

	// Start
	const startTime = localStorage.getItem("startTime");
	document.querySelector("#start-time").textContent = startTime;

	// Total
	const totalTimePlayed = parseInt(localStorage.getItem("totalTimePlayed") || "0", 10);
	const totalTimeInSeconds = Math.floor(totalTimePlayed / 1000);
	document.querySelector("#total-time-played").textContent = formatTime(totalTimeInSeconds);

	// Total purchases
	totalPurchases = parseInt(localStorage.getItem("totalPurchases") || "0", 10);
	document.querySelector("#total-purchases").textContent = totalPurchases;
}

export function formatTime(seconds) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds % 60;
	return `${h}h ${m}m ${s}s`;
}