const MatchesKey = "matches";

function SaveMatches(matchNames){
    if(!matchNames || matchNames.length === 0) {
        return;
    }
    matchNames.forEach(name => {
        let matches = JSON.parse(localStorage.getItem(MatchesKey)) || [];
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
        localStorage.setItem(MatchesKey, JSON.stringify(matches));
    });
}

function ClearDB(){
    localStorage.removeItem(MatchesKey);
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
        html += `
            <button id="${m.id}" class="matchup-button">
            <div style="padding: 10px;">
            <div>
                <span><b>${m.player1}</b></span>
                <span>vs</span>
                <span><b>${m.player2}</b></span>
            </div>
            <div>
                <span>${m.player1Score}</span>
                <span>-</span>
                <span>${m.player2Score}</span>
            </div>
            <div>
                <span><b>${m.matchName}</b></span>
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

    const container = document.getElementById("match-log-container");
    let html = `<div class="match-list">
                    <div class="player-names">
                        <table cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                            <td id="player1-name" style="width: 30%;">${matchup.player1}</td>
                            <td style="width: 1%;">-</td>
                            <td id="player2-name" style="width: 30%;">${matchup.player2}</td>
                            </tr>
                        </table>
                    </div>`;

    matches.forEach(m => {
        let year = new Date(m.date).getFullYear();
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