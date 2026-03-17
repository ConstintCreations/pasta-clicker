const clickButton = document.querySelector(".click-button");
const meatballsText = document.querySelector(".meatball-count p");

let meatballs = 0;

clickButton.addEventListener("click", () => {
    meatballs++;
    meatballsText.textContent = meatballs;
})