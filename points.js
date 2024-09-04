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
