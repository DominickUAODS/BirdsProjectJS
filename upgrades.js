import { getTotalPoints, updateTotalPoints, canAfford } from './points.js';
import { updateLabel, displayMessage } from './uiManager.js';

function getUpgradeCount(item) {
    return parseInt(localStorage.getItem(item) || '0', 10);
}

function updateUpgradeCount(item, count) {
    localStorage.setItem(item, count);
}

export function purchaseUpgrade(item, cost, labelHave, labelMessage) {
    if (canAfford(cost)) {
        const currentCount = getUpgradeCount(item) + 1;
        updateUpgradeCount(item, currentCount);
        updateTotalPoints(-cost);
        updateLabel(labelHave, currentCount);
    } else {
        displayMessage(labelMessage, 'KeepPlaying');
    }
}

export function loadUpgradeCounts() {
    const slingCount = getUpgradeCount('sling');
    const dronCount = getUpgradeCount('drone');
    const tntCount = getUpgradeCount('tnt');

    return { slingCount, dronCount, tntCount };
}


