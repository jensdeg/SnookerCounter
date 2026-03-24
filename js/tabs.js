const tabbuttons = document.querySelectorAll(".tab-button");
const TabColor = "linear-gradient(to bottom, rgba(211, 211, 211, 0.083), rgba(255, 255, 255, 0.365))"
const activeTabColor = "linear-gradient(to bottom, rgba(211, 211, 211, 0.083), rgba(255, 255, 255, 0.612))"
openTab("Games");

function openTab(tab) {
    tabbuttons.forEach(tabbutton => {
        if(tabbutton.textContent === tab) {
            document.getElementById(tab).style.display = "block";
            tabbutton.style.backgroundImage = activeTabColor;
        }
        else if (tabbutton.textContent !== tab){
            document.getElementById(tabbutton.textContent).style.display = "none";
            tabbutton.style.backgroundImage = TabColor;
        }});

    if(tab === "Log"){
        RenderMatchups();
    }
}


tabbuttons.forEach(tabbutton => {
    tabbutton.addEventListener("click", (e) => {
        openTab(tabbutton.textContent);
    });
});