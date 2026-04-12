const MatchesKey = "matches";

function SaveMatches(matchNames){
    if(!matchNames || matchNames.length === 0) {
        return;
    }
    let matches = JSON.parse(localStorage.getItem(MatchesKey)) || [];

    matchNames.forEach(name => {
        
        let id = matches.length > 0 
            ? matches[matches.length - 1].id + 1 
            : 1;
        var player1Name = localStorage.getItem("player1Name") || "Player 1";
        var player2Name = localStorage.getItem("player2Name") || "Player 2";

        var player1Score = parseInt(localStorage.getItem(`${name}player1Wins`)) || 0;
        var player2Score = parseInt(localStorage.getItem(`${name}player2Wins`)) || 0;

        if(player1Score === 0 && player2Score === 0) {
            return;
        }

        let newMatch = new Match(id, name, player1Name, player2Name, player1Score, player2Score);
        matches.push(newMatch);
    });

    localStorage.setItem(MatchesKey, JSON.stringify(matches));
}

function GetMatchups(){
    const matches = JSON.parse(localStorage.getItem(MatchesKey)) || [];
    if (matches.length === 0) {
        return [];
    }

    const matchups = [];
    let id = 0;
    matches.forEach(m => {
        const exists = matchups.some(u =>
            (u.player1 === m.player1Name && u.player2 === m.player2Name  && u.matchName === m.name) ||
            (u.player1 === m.player2Name && u.player2 === m.player1Name  && u.matchName === m.name)
        );
        if (!exists) {
            var player1TotalScore = GetPlayerTotalScore(m.player1Name, m.player2Name, m.name, matches);
            var player2TotalScore = GetPlayerTotalScore(m.player2Name, m.player1Name, m.name, matches);
            matchups.push({ id: id++, player1: m.player1Name, player2: m.player2Name, player1Score: player1TotalScore, player2Score: player2TotalScore, matchName: m.name });
        }
    });

    return matchups;
}

function GetPlayerTotalScore(player, opponent, matchname, matches){
    let totalScore = 0;
    matches.forEach(m => {
        if((m.player1Name === player && m.player2Name === opponent && m.name === matchname)){
            totalScore += m.player1Score;
        }
        else if (m.player1Name === opponent && m.player2Name === player && m.name === matchname) {
            totalScore += m.player2Score;
        }
    });
    return totalScore;
}

function RenderMatchups(){
    const matchups = GetMatchups();
    const container = document.getElementById("match-log-container");
    let html = ``;
    matchups.forEach(m => {
        let totalMatches = m.player1Score + m.player2Score;
        let player1WinRate =  ((m.player1Score / totalMatches) * 100).toFixed(0);
        let player2WinRate = ((m.player2Score / totalMatches) * 100).toFixed(0);

        if(player1WinRate > player2WinRate){
            player1WinRate = `<u><b>${player1WinRate}</u></b>`;
        }
        else if(player2WinRate > player1WinRate){
            player2WinRate = `<u><b>${player2WinRate}</u></b>`;
        }

        html += `
            <button id="${m.id}" class="matchup-button">
            <div style="padding: 10px;">
            <div>
                <span><b>${m.player1}</b></span>
                <span>vs</span>
                <span><b>${m.player2}</b></span>
            </div>
            <div>
                <span>${m.matchName}</span>
            </div>
            <hr style="margin: 5px 0;">
            <div>
                <span style="margin-right: 10px;">${player1WinRate}%</span>
                <span><b>-</b></span>
                <span style="margin-left: 10px;">${player2WinRate}%</span>
            </div>
            </div>
        </button>
    `;
    });
    container.innerHTML = html;

    document.querySelectorAll(".matchup-button").forEach(button => {
        button.addEventListener("click", () => {
            RenderMatches(matchups.find(m => m.id == button.id));
        });
    });
}

function RenderMatches(matchup){
    let matches = JSON.parse(localStorage.getItem(MatchesKey)) || [];
    matches = matches.filter(m =>
        (m.player1Name === matchup.player1 && m.player2Name === matchup.player2 && m.name === matchup.matchName) ||
        (m.player1Name === matchup.player2 && m.player2Name === matchup.player1 && m.name === matchup.matchName)
    );
    matches.reverse();

    if(matchup.player1Score > matchup.player2Score){
        matchup.player1Score = `<u><b>${matchup.player1Score}</b></u>`;
    }
    else if(matchup.player2Score > matchup.player1Score){
        matchup.player2Score = `<u><b>${matchup.player2Score}</b></u>`;
    }

    const container = document.getElementById("match-log-container");
    let html;
    if(matchup.matchName == "Snooker"){
        let player1name = localStorage.getItem("player1Name") || "Player 1";
        let player2name = localStorage.getItem("player2Name") || "Player 2";

        let player1Highscore = localStorage.getItem(player1name + "snookerHighScore") || 0;
        let player2Highscore = localStorage.getItem(player2name + "snookerHighScore") || 0;

        if(player1Highscore > player2Highscore){
            player1Highscore = `<u><b>${player1Highscore}</b></u>`;
        }
        else if(player2Highscore > player1Highscore){
            player2Highscore = `<u><b>${player2Highscore}</b></u>`;
        }

        html = `<div class="match-list">
                    <div class="player-names">
                        <table cellspacing="0" cellpadding="0" width="100%" height="120%">
                            <tr>
                                <td id="player1-name" style="width: 30%;"><b>${matchup.player1}</b></td>
                                <td id="player1-score" style="width: 30%;"></td>
                                <td id="player2-name" style="width: 30%;"><b>${matchup.player2}</b></td>
                            </tr>
                            <tr>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                            </tr>
                            <tr>
                                <td id="player1-score" style="width: 30%;">${matchup.player1Score}</td>
                                <td id="player1-score" style="width: 30%; opacity: 0.7; zoom: 0.8;">Total Wins</td>
                                <td id="player2-score" style="width: 30%;">${matchup.player2Score}</td>
                            </tr>
                            <tr>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                            </tr>
                            <tr>
                                <td id="player1-score" style="width: 30%;">${player1Highscore}</td>
                                <td id="player1-score" style="width: 30%; opacity: 0.7; zoom: 0.8;">Highest Score</td>
                                <td id="player1-score" style="width: 30%;">${player2Highscore}</td>
                            </tr>
                            <tr>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                            </tr>
                        </table>
                    </div>`;
    }
    else{
        html = `<div class="match-list">
                    <div class="player-names">
                        <table cellspacing="0" cellpadding="0" width="100%" height="120%">
                            <tr>
                                <td id="player1-name" style="width: 30%;"><b>${matchup.player1}</b></td>
                                <td id="player1-score" style="width: 30%;"></td>
                                <td id="player2-name" style="width: 30%;"><b>${matchup.player2}</b></td>
                            </tr>
                            <tr>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                            </tr>
                            <tr>
                                <td id="player1-score" style="width: 30%;">${matchup.player1Score}</td>
                                <td id="player1-score" style="width: 30%; opacity: 0.7; zoom: 0.8;">Total Wins</td>
                                <td id="player2-score" style="width: 30%;">${matchup.player2Score}</td>
                            </tr>
                            <tr>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                                <td id="player1-score" style="width: 30%;"><hr style="opacity:0.4;"></td>
                            </tr>
                        </table>
                    </div>`;
    }

    matches.forEach(m => {
        let year = GetYear(m.date);

        m.date = m.date
            .replace(/-/g, "/")
            .replace(",", "")
            .replace(year, year - 2000)
            .slice(0, -3);

        if(m.player1Score > m.player2Score){
            m.player1Score = `<u><b>${m.player1Score}</b></u>`;
        }
        else if(m.player2Score > m.player1Score){
            m.player2Score = `<u><b>${m.player2Score}</b></u>`;
        }
        html += `   
            <div class="match-container">
                <span>${m.date}</span><span>${m.player1Score} - ${m.player2Score}</span>
            </div>
        `;
    });
    html += `</div>`;
    container.innerHTML = html;
}
function GetYear(dateString){
    let year = new Date(dateString).getFullYear();
    if(!isNaN(year)){
        return year;
    }
    return parseInt(dateString.split("-")[2].split(",")[0]);
}


async function SaveToFile(){ // Copilot function
    const matches = JSON.parse(localStorage.getItem(MatchesKey)) || [];
    if(matches.length === 0){
        alert('No matches to export.');
        return;
    }

    const dataStr = JSON.stringify(matches, null, 2);
    let today = new Date();
    let fileName = `Match-Log-${today.toLocaleDateString()}-${today.getTime()}.json`;

    const blob = new Blob([dataStr], { type: 'application/json' });
    const file = new File([blob], fileName, { type: 'application/json' });

    // 1) Mobile Web Share API (preferred if available)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                title: 'SnookerCounter Match Log',
                text: 'Exported matches from SnookerCounter',
                files: [file]
            });
            return;
        } catch (err) {
            console.debug('Web Share failed', err);
            // continue to fallback
        }
    }

    // 2) Native file picker (desktop modern browsers)
    if (window.showSaveFilePicker) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [{
                    description: 'JSON file',
                    accept: { 'application/json': ['.json'] }
                }]
            });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return;
        } catch (err) {
            console.debug('File System Access API failed', err);
            // continue to fallback
        }
    }

    // 3) Blob link click fallback (desktop & Android WebView etc.)
    const url = URL.createObjectURL(blob);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.href = url;
    downloadAnchorNode.download = fileName;
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();

    setTimeout(() => {
        document.body.removeChild(downloadAnchorNode);
        URL.revokeObjectURL(url);
    }, 100);

    // 4) iOS fallback: data may open in new tab (user can share/save manually)
    if (/iP(ad|hone|od)/.test(navigator.userAgent) && !navigator.canShare) {
        window.open(url, '_blank');
    }
}

document.getElementById("download").addEventListener("click", () => {
    SaveToFile();
});

document.getElementById("MatchLogFile").addEventListener("change", fileEvent => {
    ImportFile(fileEvent); 
})

async function ImportFile(fileEvent){
    if(!confirm("are you sure you want to import this file? this will overide current data")) return;
    const input = fileEvent.target;
    const file = input.files[0];

    if(!file || !file.name.startsWith("Match-Log")) return

    let text = await file.text();

    localStorage.setItem(MatchesKey, text)
    RenderMatchups();

    input.value = "";
}