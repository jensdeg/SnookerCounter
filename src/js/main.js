const buttons = document.querySelectorAll(".Ball-button");



buttons.forEach(button => {
    button.addEventListener("click", () => {
        console.log("Button clicked!" + button.textContent);
        const scoreElement = button.closest(".Score-window").querySelector(".Score");
        const currentScore = parseInt(scoreElement.textContent);
        const pointsToAdd = parseInt(button.textContent);
        const newScore = currentScore + pointsToAdd;
        scoreElement.textContent = newScore;
    })
});