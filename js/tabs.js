const tabbuttons = document.querySelectorAll(".tablinks");
document.getElementById("Wins").style.display = "none";
document.getElementById("Counter").style.display = "block";

function openTab(evt, tabbutton) {
    if(tabbutton.textContent === "Snooker") {
        document.getElementById("Counter").style.display = "block";
        document.getElementById("Wins").style.display = "none";
    }
    if(tabbutton.textContent === "Wins") {
        document.getElementById("Counter").style.display = "none";
        document.getElementById("Wins").style.display = "block";
    }
}


tabbuttons.forEach(tabbutton => {
    tabbutton.addEventListener("click", (e) => {
        openTab(e, tabbutton);
    })
});