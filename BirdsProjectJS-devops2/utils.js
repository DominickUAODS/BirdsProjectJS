export function getRandomRow() {
	const rows = [document.querySelector(".first-row"), document.querySelector(".second-row"), document.querySelector(".third-row")];
	return rows[Math.floor(Math.random() * rows.length)];
}

export function getRandomSpeed() {
	return Math.random() * 5 + 8;
}

export function getRandomDelay() {
	return Math.random() * 2000 + 2000;
}
