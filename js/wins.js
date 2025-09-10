const winbuttons = document.querySelectorAll(".win-button");


function updateWins(button) {
    let container = button.closest(".win-container");
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
}
function GetScores(button){
    let container = button.closest(".win-container");
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