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
