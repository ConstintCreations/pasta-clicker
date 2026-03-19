const clickButton = document.querySelector(".click-button");
const meatballsText = document.querySelector(".meatball-count p");

let meatballs = 0;
let forks = 0;
let clickValue = 1;

clickButton.addEventListener("click", () => {
    meatballs += clickValue;
    displayMeatballCount();
});

function displayMeatballCount() {
    meatballsText.textContent = meatballs.toFixed(0);
}

const forkButton = document.querySelector(".buy-fork-button");
const forkElementContainer = document.querySelector(".fork-container");
const buyForkCostElement = document.querySelector(".buy-fork-button p strong");

const maxForks = 40;
const forkOrbitTime = 8;
const forkJabTime = 1;

let forkInterval = null;

forkButton.addEventListener("click", () => {
    if (forks >= maxForks) return;

    const cost = Math.floor(50 * Math.pow(1.75, forks));

    if (meatballs >= cost) {
        meatballs -= cost;
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

    newFork.innerHTML = `<img src="images/fork.png" width="80px" alt="Fork" style="animation: ${forkOrbitTime}s orbit ${orbitDelay}s linear infinite, ${forkJabTime}s forkJab ${jabDelay}s linear infinite;">`;
    

    forkElementContainer.appendChild(newFork);

    if (forkInterval == null) {
        forkInterval = setInterval(() => {
            meatballs += forks;
            displayMeatballCount();
        }, 1000);
    }

    forks++;
    buyForkCostElement.textContent = Math.floor(50 * Math.pow(1.75, forks));
}); 

const clickUpgradeButton = document.querySelector(".buy-click-upgrade-button");
const clickUpgradeCostElement = document.querySelector(".buy-click-upgrade-button p strong");

const maxClickUpgradeCount = 50;
const clickValueUpgradeAmount = 0.5;
let clickUpgradeCount = 0;

clickUpgradeButton.addEventListener("click", () => {
    if (clickUpgradeCount >= maxClickUpgradeCount) return;

    const cost = Math.floor(10 * Math.pow(1.5, clickUpgradeCount));

    if (meatballs >= cost) {
        meatballs -= cost;
        clickValue += clickValueUpgradeAmount;
        displayMeatballCount();
        clickUpgradeCount++;
        clickUpgradeCostElement.textContent = Math.floor(10 * Math.pow(1.5, clickUpgradeCount));
    }
});console.log(cost);