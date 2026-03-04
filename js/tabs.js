const tabbuttons = document.querySelectorAll(".tablinks");
openTab("Wins");

function openTab(tab) {
    if(tab === "Snooker") {
        document.getElementById("Counter").style.display = "block";
        document.getElementById("Wins").style.display = "none";
        document.getElementById("Log").style.display = "none";
    }
    if(tab === "Wins") {
        document.getElementById("Counter").style.display = "none";
        document.getElementById("Wins").style.display = "block";
        document.getElementById("Log").style.display = "none";
    }
    if(tab === "Log") {
        document.getElementById("Counter").style.display = "none";
        document.getElementById("Wins").style.display = "none";
        document.getElementById("Log").style.display = "block";
    }
}


tabbuttons.forEach(tabbutton => {
    tabbutton.addEventListener("click", (e) => {
        openTab(tabbutton.textContent);
    });
});