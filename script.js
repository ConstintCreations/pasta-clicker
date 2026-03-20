const clickButton = document.querySelector(".click-button");
const meatballsText = document.querySelector(".meatball-count p");
const multiplierText = document.querySelector(".meatball-count div strong");

const clickButtonImage = clickButton.querySelector("img");

let meatballs = 0;
let forks = 0;
let clickValue = 0.5;
let multiplier = 1;

let runUpgradesNeeded = 40;
let rebirthMultiplierGain = 0;
let rebirthEnabled = false;

const totalClickStats = document.querySelector(".total-clicks p");
const totalUpgradesStats = document.querySelector(".total-upgrades-bought p");
const totalJabsStats = document.querySelector(".total-fork-jabs p");
const totalRebirthsStats = document.querySelector(".total-rebirths p");
const totalSpentStats = document.querySelector(".total-meatballs-spent p");
const totalGainedStats = document.querySelector(".total-meatballs-gained p");

let stats = {
    totalTimesClicked: 0,
    totalUpgradesBought: 0,
    totalForkJabs: 0,
    totalRebirths: 0, 
    totalMeatballsSpent: 0,
    totalMeatballsGained: 0
}

document.addEventListener("contextmenu", (e)=>{
    e.preventDefault();
})

clickButton.addEventListener("click", Click);
clickButton.addEventListener("contextmenu", Click);

function Click() {
    meatballs += clickValue*multiplier;
    stats.totalMeatballsGained += clickValue*multiplier;
    totalGainedStats.textContent = stats.totalMeatballsGained.toFixed(0);
    displayMeatballCount();

    stats.totalTimesClicked++;
    totalClickStats.textContent = stats.totalTimesClicked.toFixed(0);
}

function displayMeatballCount() {
    meatballsText.textContent = meatballs.toFixed(0);
}

function displayMultiplier() {
    multiplierText.textContent = "x" + multiplier.toFixed(2);
}

const forkButton = document.querySelector(".buy-fork-button");
const forkElementContainer = document.querySelector(".fork-container");
const buyForkCostElement = document.querySelector(".buy-fork-button p strong");
const forkOwnedCountElement = document.querySelector(".buy-fork-button div div h3");

const maxForks = 40;
const forkOrbitTime = 8;
const forkJabTime = 1;

let forkInterval = null;

function checkRebirthConditions() {
    runUpgradesNeeded--;
    document.querySelector(".rebirth-upgrades-needed").textContent = runUpgradesNeeded;
    rebirthMultiplierGain += 0.01;
    document.querySelector(".rebirth-button").textContent = "Rebirth: +" + rebirthMultiplierGain.toFixed(2) + "%";
    if (runUpgradesNeeded <= 0) {
        rebirthEnabled = true;
        document.querySelector(".rebirth-upgrades-needed-full").classList.add("noshow");
        document.querySelector(".rebirth-button").classList.remove("disabled");
    }
}

document.querySelector(".rebirth-button").addEventListener("click", () => {
    if (document.querySelector(".rebirth-button").classList.contains("disabled")) return;

    runUpgradesNeeded = 40;
    stats.totalRebirths++;
    totalRebirthsStats.textContent = stats.totalRebirths;
    document.querySelector(".rebirth-upgrades-needed-full").classList.remove("noshow");
    document.querySelector(".rebirth-button").classList.add("disabled");
    document.querySelector(".rebirth-upgrades-needed").textContent = "40";

    multiplier += rebirthMultiplierGain;
    rebirthMultiplierGain = 0;
    document.querySelector(".rebirth-button").textContent = "Rebirth: +0.00%";

    meatballs = 0;
    displayMeatballCount();

    displayMultiplier();

    forks = 0;
    clickValue = 0.5;

    if (forkInterval != null) {
        clearInterval(forkInterval);
    }

    clickUpgradeCount = 1;
    multiplierUpgradeCount = 0;

    clickUpgradeCostElement.textContent = "10";
    clickValueOwnedCountElement.textContent = "1/50";

    forkOwnedCountElement.textContent = "0/40";
    buyForkCostElement.textContent = "50";

    multiplierUpgradeCostElement.textContent = "100";
    multiplierUpgradeOwnedCountElement.textContent = "0/20";

    forkElementContainer.innerHTML = "";
})

forkButton.addEventListener("click", () => {
    if (forks >= maxForks) return;

    const cost = Math.floor(50 * Math.pow(1.75, forks));

    if (meatballs >= cost) {
        meatballs -= cost;
        stats.totalMeatballsSpent += cost;
        stats.totalUpgradesBought++;
        totalSpentStats.textContent = stats.totalMeatballsSpent.toFixed(0);
        totalUpgradesStats.textContent = stats.totalUpgradesBought.toFixed(0);
        
        checkRebirthConditions();

        displayMeatballCount();
    } else {
        return;
    }

    let orbitDelay = 0;
    let jabDelay = -0.85;
    if (forks > 0) {
        const fork = document.querySelectorAll(".fork img")[0];
        const currentOrbitAnimationTime = fork.getAnimations()[0].currentTime;
        orbitDelay = (forkOrbitTime - (currentOrbitAnimationTime/1000) + (forks * (forkOrbitTime/maxForks)))%(forkOrbitTime) - forkOrbitTime;

        const currentJabAnimationTime = fork.getAnimations()[1].currentTime;
        jabDelay = (forkJabTime - (currentJabAnimationTime/1000) + 0.15)%(forkJabTime) - forkJabTime;
    }
    const newFork = document.createElement("div");
    newFork.classList.add("fork");

    newFork.innerHTML = `<img src="images/fork.png" width="80px" alt="Fork" draggable="false" style="animation: ${forkOrbitTime}s orbit ${orbitDelay}s linear infinite, ${forkJabTime}s forkJab ${jabDelay}s linear infinite;">`;
    

    forkElementContainer.appendChild(newFork);

    if (forkInterval == null) {
        forkInterval = setInterval(() => {
            meatballs += forks*clickValue*multiplier;
            stats.totalForkJabs += forks;
            totalJabsStats.textContent = stats.totalForkJabs.toFixed(0);
            stats.totalMeatballsGained += clickValue*multiplier;
            totalGainedStats.textContent = stats.totalMeatballsGained.toFixed(0);
            displayMeatballCount();

            clickButtonImage.classList.add("clicked");
            setTimeout(() => {
                clickButtonImage.classList.remove("clicked");
            }, 125)
        }, 1000);
    }

    forks++;
    forkOwnedCountElement.textContent = forks + "/" + maxForks;
    buyForkCostElement.textContent = Math.floor(50 * Math.pow(1.75, forks));
}); 

const clickUpgradeButton = document.querySelector(".buy-click-upgrade-button");
const clickUpgradeCostElement = document.querySelector(".buy-click-upgrade-button p strong");
const clickValueOwnedCountElement = document.querySelector(".buy-click-upgrade-button div div h3");

const maxClickUpgradeCount = 50;
const clickValueUpgradeAmount = 0.5;
let clickUpgradeCount = 1;

clickUpgradeButton.addEventListener("click", () => {
    if (clickUpgradeCount >= maxClickUpgradeCount) return;

    const cost = Math.floor((6+2/3) * Math.pow(1.5, clickUpgradeCount));

    if (meatballs >= cost) {
        meatballs -= cost;
        stats.totalMeatballsSpent += cost;
        stats.totalUpgradesBought++;
        totalSpentStats.textContent = stats.totalMeatballsSpent.toFixed(0);
        totalUpgradesStats.textContent = stats.totalUpgradesBought.toFixed(0);
        checkRebirthConditions();
        clickValue += clickValueUpgradeAmount;
        displayMeatballCount();
        clickUpgradeCount++;
        clickValueOwnedCountElement.textContent = clickUpgradeCount + "/" + maxClickUpgradeCount;
        clickUpgradeCostElement.textContent = Math.floor((6+2/3) * Math.pow(1.5, clickUpgradeCount));
    }
});

const multiplierUpgradeButton = document.querySelector(".buy-multiplier-upgrade-button");
const multiplierUpgradeCostElement = document.querySelector(".buy-multiplier-upgrade-button p strong");
const multiplierUpgradeOwnedCountElement = document.querySelector(".buy-multiplier-upgrade-button div div h3");

const maxMultiplierUpgradeCount = 20;
const multiplierValueUpgradeAmount = 0.1;
let multiplierUpgradeCount = 0;

multiplierUpgradeButton.addEventListener("click", () => {
    if (multiplierUpgradeCount >= maxMultiplierUpgradeCount) return;

    const cost = Math.floor(100 * Math.pow(2, multiplierUpgradeCount));

    if (meatballs >= cost) {
        meatballs -= cost;
        stats.totalMeatballsSpent += cost;
        stats.totalUpgradesBought++;
        totalSpentStats.textContent = stats.totalMeatballsSpent.toFixed(0);
        totalUpgradesStats.textContent = stats.totalUpgradesBought.toFixed(0);
        checkRebirthConditions();
        multiplier += multiplierValueUpgradeAmount;
        displayMultiplier();
        displayMeatballCount();
        multiplierUpgradeCount++;
        multiplierUpgradeOwnedCountElement.textContent = multiplierUpgradeCount + "/" + maxMultiplierUpgradeCount;
        multiplierUpgradeCostElement.textContent = Math.floor(100 * Math.pow(2, multiplierUpgradeCount));
    }
});