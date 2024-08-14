import { startSpawning, stopSpawning } from './birdManager.js';
import { toggleContainers, initializePreloader, bindUpgradeButtons } from './uiManager.js';

document.getElementById('statistic-btn').addEventListener('click', toggleContainers);
window.onload = initializePreloader;

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.btn-start');
    const stopButton = document.querySelector('.btn-stop');

    startButton.addEventListener('click', startSpawning);
    stopButton.addEventListener('click', stopSpawning);

    bindUpgradeButtons(); 
});

