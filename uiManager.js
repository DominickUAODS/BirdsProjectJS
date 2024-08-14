import { purchaseUpgrade } from './upgrades.js';

export function toggleContainers() {
    const leftContainer = document.querySelector('.left-container');
    const leftContainerStat = document.querySelector('.left-container-stat');

    if (leftContainerStat.style.display === 'block' || leftContainerStat.style.display === '') {
        leftContainerStat.style.display = 'none';
        leftContainer.style.display = 'block';
    } else {
        leftContainerStat.style.display = 'block';
        leftContainer.style.display = 'none';
    }
}

export function initializePreloader() {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
    }, 1000); 
}

export function updateLabel(label, value) {
    label.textContent = value;
    localStorage.setItem(label.className, value);
}

export function displayMessage(labelMessage, message, initialMessage = '') {
    labelMessage.textContent = message;
    setTimeout(() => {
        labelMessage.textContent = initialMessage;
    }, 2000); 
}

export function bindUpgradeButtons() {
    const slingButton = document.querySelector('.sling-button');
    const dronButton = document.querySelector('.dron-button');
    const tntButton = document.querySelector('.tnt-button');

    const slingLabelHave = document.querySelector('.sling-label-have');
    const dronLabelHave = document.querySelector('.dron-label-have');
    const tntLabelHave = document.querySelector('.tnt-label-have');

    const slingMessage = document.querySelector('.desc-sling-label');
    const dronMessage = document.querySelector('.desc-dron-label');
    const tntMessage = document.querySelector('.desc-tnt-label');
    slingLabelHave.textContent = localStorage.getItem('sling-label-have') || '0';
    dronLabelHave.textContent = localStorage.getItem('dron-label-have') || '0';
    tntLabelHave.textContent = localStorage.getItem('tnt-label-have') || '0';

    slingButton.addEventListener('click', () => purchaseUpgrade('sling', 150, slingLabelHave, slingMessage));
    dronButton.addEventListener('click', () => purchaseUpgrade('drone', 200, dronLabelHave, dronMessage));
    tntButton.addEventListener('click', () => purchaseUpgrade('tnt', 300, tntLabelHave, tntMessage));
}
