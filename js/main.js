const buttons = document.querySelectorAll(".Ball-button");

function updateScore(button) {
    const scoreElement = button.closest(".Score-window").querySelector(".Score");
    const currentScore = parseInt(scoreElement.textContent);
    const pointsToAdd = parseInt(button.textContent);
    const newScore = currentScore + pointsToAdd;
    scoreElement.textContent = newScore;
}

buttons.forEach(button => {
    button.addEventListener("mousedown", () => {
        button.classList.add("active");
    });
    button.addEventListener("mouseup", () => {
        updateScore(button);
        button.classList.remove("active");
    });
    button.addEventListener("mouseleave", () => {
        button.classList.remove("active");
    });
    button.addEventListener("mouseenter", () => {
        button.classList.add("active");
    });
    // touchscreen
    button.addEventListener("touchstart", () => {
        button.classList.add("active");
    });
    button.addEventListener("touchend", () => {
        updateScore(button);
        button.classList.remove("active");
    });
    button.addEventListener("touchcancel", () => {
        button.classList.remove("active");
    });
});

// player name input
let player1Name = localStorage.getItem("player1Name") || "";
let player2Name = localStorage.getItem("player2Name") || "";

document.getElementById("Player1").value = player1Name;     
document.getElementById("Player2").value = player2Name;

document.getElementById("Player1").addEventListener("input", (event) => {
    player1Name = event.target.value;
    localStorage.setItem("player1Name", player1Name);
});
document.getElementById("Player2").addEventListener("input", (event) => {
    player2Name = event.target.value;
    localStorage.setItem("player2Name", player2Name);
});