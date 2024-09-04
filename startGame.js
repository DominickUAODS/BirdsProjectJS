let birdInterval;
let birdCount = 0;
let totalScore = 0;
const birdPoints = [10, 20, 30];
const generateBirdTime = 1500;
const birdFlightTime = 3000;

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame);

function startGame() {
	document.querySelector(".label-top-container-total-count-points").innerText = 0;
	totalScore = 0;
	birdInterval = setInterval(generateBird, generateBirdTime);
}

function stopGame() {
	clearInterval(birdInterval);
	const birds = document.querySelectorAll(".bird");
	birds.forEach(bird => bird.remove());
}

function generateBird() {
	const container = document.getElementById("centerContainer");
	const bird = document.createElement("div");
	bird.classList.add("bird");

	// Assign random points to the bird
	const randomPoints = birdPoints[Math.floor(Math.random() * birdPoints.length)];
	bird.dataset.points = randomPoints;

	// Randomly decide if the bird comes from the left or right
	const fromLeft = Math.random() > 0.5;
	bird.style.top = `${Math.random() * container.clientHeight}px`;
	bird.style.left = fromLeft ? "-50px" : `${container.clientWidth + 50}px`; // Start from left or right outside the container
	container.appendChild(bird);
	birdCount++;

	// Add click event to the bird to increase score
	bird.addEventListener("click", function () {
		let birdPoints = parseInt(bird.dataset.points);
		let pointsToAdd = Math.min(birdPoints, 5);
		totalScore += pointsToAdd;
		birdPoints -= pointsToAdd;
		if (birdPoints <= 0) {
			bird.remove();
		} else {
			bird.dataset.points = birdPoints;
		}
		updateScore();
	});

	// Animate bird to fly across the container
	setTimeout(() => {
		bird.style.left = fromLeft ? `${container.clientWidth + 50}px` : "-50px";
	}, 100);

	// Remove bird after animation completes to clean up DOM
	setTimeout(() => {
		bird.remove();
	}, birdFlightTime);
}

function updateScore() {
	document.querySelector(".label-top-container-total-count-points").innerText = totalScore;
}