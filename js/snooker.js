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
    let newScore = currentScore + pointsToAdd;
    if (newScore < 0) {
        newScore = 0;
    }
    scoreElement.textContent = newScore;
    saveScores();
    PlayNumberSound(pointsToAdd);
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

document.getElementById("player1-name").textContent = player1Name || "Player 1";
document.getElementById("player2-name").textContent = player2Name || "Player 2";

document.getElementById("Player1").addEventListener("input", (event) => {
    player1Name = event.target.value;
    localStorage.setItem("player1Name", player1Name);
    document.getElementById("player1-name").textContent = player1Name || "Player 1";
});
document.getElementById("Player2").addEventListener("input", (event) => {
    player2Name = event.target.value;
    localStorage.setItem("player2Name", player2Name);
    document.getElementById("player2-name").textContent = player2Name || "Player 2";
});

document.getElementById("End-Game").addEventListener("click", () => {
    if(!confirm("Are you sure you want to end the game?")) return;

    let player1scoreElement = document.getElementById("Player1Score");
    let player2scoreElement = document.getElementById("Player2Score");

    let player1score = parseInt(player1scoreElement.textContent);
    let player2score = parseInt(player2scoreElement.textContent);

    let player1WincountElement = document.getElementById("snooker-win-container").querySelector("#player1");
    let player2WincountElement = document.getElementById("snooker-win-container").querySelector("#player2");

    if (player1score > player2score){
        let currentWins = parseInt(player1WincountElement.textContent);
        SaveWins("Snooker", "player1", currentWins + 1);
        player1WincountElement.textContent = currentWins + 1;
    }
    else if (player2score > player1score){
        let currentWins = parseInt(player2WincountElement.textContent);
        SaveWins("Snooker", "player2", currentWins + 1);
        player2WincountElement.textContent = currentWins + 1;
    } 
    else{
        return;
    }

    player1scoreElement.textContent = 0;
    player2scoreElement.textContent = 0;
    saveScores();
});