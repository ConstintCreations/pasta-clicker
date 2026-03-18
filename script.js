const clickButton = document.querySelector(".click-button");
const meatballsText = document.querySelector(".meatball-count p");

let meatballs = 0;
let forks = 0;

clickButton.addEventListener("click", () => {
    meatballs++;
    meatballsText.textContent = meatballs;
});

const forkButton = document.querySelector(".buy-fork-button");
const forkElementContainer = document.querySelector(".fork-container");

const maxForks = 40;
const forkOrbitTime = 8;
const forkJabTime = 1;

let forkInterval = null;

forkButton.addEventListener("click", () => {
    if (forks >= maxForks) return;
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
            meatballsText.textContent = meatballs;
        }, 1000);
    }

    forks++;
}); 