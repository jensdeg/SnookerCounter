class Match{
    constructor(id, name, player1Name, player2Name, player1Score, player2Score){
        this.id = id;
        this.name = name;
        this.player1Name = player1Name;
        this.player2Name = player2Name;
        this.player1Score = player1Score;
        this.player2Score = player2Score;
        this.date = new Date().toLocaleString();
    }
}