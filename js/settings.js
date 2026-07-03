const ScheduleKey = "ScheduleSetting"
const CurrentGamesKey = "CurrentGames"


document.getElementById("settings-button").addEventListener("click", ToggleSettingOverlay)
const settingsOverlay = document.getElementById("Settings")

function ToggleSettingOverlay(){
    LoadSettings()
    if(settingsOverlay.style.display == "flex"){
        settingsOverlay.style.display = "none";
    }
    else if(settingsOverlay.style.display == "none"){
        settingsOverlay.style.display = "flex";
    }
}

document.getElementById(ScheduleKey).addEventListener("change", function() { localStorage.setItem(ScheduleKey, this.checked) })
document.getElementById(ScheduleKey).checked = localStorage.getItem(ScheduleKey) == "true"

function LoadSchedule(){
    let enabled = localStorage.getItem(ScheduleKey) == "true"
    let schedule = [
        "9BallGame-8BallGame",
        "8BallGame-SnookerGame",
        "9BallGame-SnookerGame"
    ]

    if(localStorage.getItem(CurrentGamesKey) == null){
        localStorage.setItem(CurrentGamesKey, schedule[0])
    }
    var CurrentGames = localStorage.getItem(CurrentGamesKey)

    var games = [
            document.getElementById("8BallGame"),
            document.getElementById("9BallGame"),
            document.getElementById("SnookerGame")
        ]

    if(enabled){
        games.forEach(element => {
            if(CurrentGames.includes(element.id)){
                element.style.display = "block"
            }
            else{
                element.style.display = "none"
            }
        });
    }
    else{
        games.forEach(element => {
            element.style.display = "block"
        });
    }
}

function NextScheduleGames(){
    let schedule = [
        "9BallGame-8BallGame",
        "8BallGame-SnookerGame",
        "9BallGame-SnookerGame"
    ]
    var index = schedule.indexOf(localStorage.getItem(CurrentGamesKey))
    if(index > 1){
        index = 0;
    }
    else{
        index++
    }
    localStorage.setItem(CurrentGamesKey, schedule[index]);
    LoadSchedule()
}



function LoadSettings(){
    LoadSchedule()
}

LoadSettings()