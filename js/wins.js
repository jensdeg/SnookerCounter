const winbuttons = document.querySelectorAll(".win-button");

let player1 = document.getElementById("player1-name");
let player2 = document.getElementById("player2-name");

const StartingPlayer = Math.round(Math.random());
const red = "rgb(160, 10, 10)";

if(StartingPlayer === 0) {
    player1.style.color = "rgb(160, 10, 10)";
    player2.style.color = "black";
} else {
    player1.style.color = "black";
    player2.style.color = "rgb(160, 10, 10)";
}

function TogglePlayerColor() {
    console.log(Math.round(Math.random()));
    if(player1.style.color === red) {
        player1.style.color = "black";
        player2.style.color = red;
    } else {
        player1.style.color = red;
        player2.style.color = "black";
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
    SaveScore(game, winsElement.id, newWins);
    winsElement.textContent = newWins;

    if(game != "Billiard" && (newWins > 0 || currentWins != 0)) {
        TogglePlayerColor(); 
    }
}
function GetScores(button){
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


function SaveScore(game, player, wins){
    let key = game + player + "Wins";
    localStorage.setItem(key, wins);
}




winbuttons.forEach(button => {
    GetScores(button);
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