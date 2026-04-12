const winbuttons = document.querySelectorAll(".win-button");

let player1 = document.getElementById("player1-name");
let player2 = document.getElementById("player2-name");

let player1Snooker = document.getElementById("Player1");
let player2Snooker = document.getElementById("Player2");

const red = "rgb(160, 10, 10)";

let StartingPlayer = localStorage.getItem("startingPlayer") || null;

const Games = ["8 Ball", "9 Ball", "Snooker"];

if(StartingPlayer == null) {
    RandomizeStartingPlayer();
}
else{
    SetStartingPlayer(StartingPlayer);
}

function SetStartingPlayer(StartingPlayer) {
    if(StartingPlayer === '1') {
        ActivatePlayerName(player1);
        ActivatePlayerName(player1Snooker);
        DeactivatePlayerName(player2);
        DeactivatePlayerName(player2Snooker);
    } else if (StartingPlayer === '2') {
        ActivatePlayerName(player2);
        ActivatePlayerName(player2Snooker);
        DeactivatePlayerName(player1);
        DeactivatePlayerName(player1Snooker);
    }
    localStorage.setItem("startingPlayer", StartingPlayer);
}

function ActivatePlayerName(player){
    player.style.color = red;
    player.style.textShadow = "0 0 10px white, 0 0 10px white";
}
function DeactivatePlayerName(player){
    player.style.color = "black";
    player.style.textShadow = "none";
}

function RandomizeStartingPlayer() {
    let randomPlayer = Math.round(Math.random()) + 1;
    SetStartingPlayer(randomPlayer.toString());
}


function ToggleStartingPlayer() {
    let startingPlayer = localStorage.getItem("startingPlayer");
    if (startingPlayer == '1') {
        SetStartingPlayer('2'); 
    } else if (startingPlayer == '2') {    
        SetStartingPlayer('1');
    }
}

function updateWins(button) {
    let winsElement;
    if (button.nextElementSibling?.classList.contains("win-count")) {
        winsElement = button.nextElementSibling;
    } else if (button.previousElementSibling?.classList.contains("win-count")) {
        winsElement = button.previousElementSibling;
    }
    if (!winsElement) return;

    let currentWins = parseInt(winsElement.textContent);
    let winsToAdd = parseInt(button.value);
    let newWins = currentWins + winsToAdd;
    if (newWins < 0) {
        newWins = 0;
    }
    let game = button.closest(".game").querySelector(".game-title").textContent;
    SaveWins(game, winsElement.id, newWins);
    winsElement.textContent = newWins;

    if(newWins > 0 || currentWins != 0) {
        ToggleStartingPlayer(); 
    }
}
function GetWins(button){
    let winsElement;
    if (button.nextElementSibling?.classList.contains("win-count")) {
        winsElement = button.nextElementSibling;
    } else if (button.previousElementSibling?.classList.contains("win-count")) {
        winsElement = button.previousElementSibling;
    }
    if (!winsElement) return;
    let game = button.closest(".game").querySelector(".game-title").textContent;
    let player = winsElement.id;
    let key = game + player + "Wins";
    let score = localStorage.getItem(key) || 0;
    winsElement.textContent = score;
}


function SaveWins(game, player, wins){
    let key = game + player + "Wins";
    localStorage.setItem(key, wins);
}

function ResetWins(){
    RandomizeStartingPlayer();
    let wins = document.querySelectorAll(".win-count");
    wins.forEach(w => w.textContent = 0);
    Games.forEach(game => {
        localStorage.setItem(game + "player1Wins", 0);
        localStorage.setItem(game + "player2Wins", 0);
    });
}

winbuttons.forEach(button => {
    GetWins(button);
    button.addEventListener("mousedown", () => {
        button.classList.add("active");
    });
    button.addEventListener("mouseup", () => {
        button.classList.remove("active");
        updateWins(button);
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
        updateWins(button);
    });
    button.addEventListener("touchcancel", () => {
        button.classList.remove("active");
    });
});

document.getElementById("reset-wins").addEventListener("click", () => {
    if(confirm("Are you sure you want to reset the current scores?")) {
        ResetWins();
    }
});

document.getElementById("log-wins").addEventListener("click", () => {
    if(confirm("Are you sure you want to log the current scores? This will reset the scores after logging.")) {
        SaveMatches(Games);
        ResetWins();
        openTab("Log");
    }
});