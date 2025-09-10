const buttons = document.querySelectorAll(".ball-button, .clear-button");

function updateScore(button) {
    const scoreElement = button.closest(".score-window").querySelector(".score");
    const currentScore = parseInt(scoreElement.textContent);
    if(button.textContent === "Reset") {
        scoreElement.textContent = "0";
        saveScores();
        return;
    }
    const pointsToAdd = parseInt(button.textContent);
    const newScore = currentScore + pointsToAdd;
    if (newScore < 0) {
        newScore = 0;
    }
    scoreElement.textContent = newScore;
    saveScores();
}

// score saving
let player1Score = parseInt(localStorage.getItem("player1score")) || 0;
let player2Score = parseInt(localStorage.getItem("player2score")) || 0;

document.getElementById("Player1Score").textContent = player1Score;
document.getElementById("Player2Score").textContent = player2Score;

function saveScores() {
    localStorage.setItem("player1Score", document.getElementById("Player1Score").textContent);
    localStorage.setItem("player2Score", document.getElementById("Player2Score").textContent);
}

buttons.forEach(button => {
    button.addEventListener("mousedown", () => {
        button.classList.add("active");
    });
    button.addEventListener("mouseup", () => {
        button.classList.remove("active");
        updateScore(button);
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
    button.addEventListener("touchend", (e) => {
        e.preventDefault();
        button.classList.remove("active");
        updateScore(button);
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