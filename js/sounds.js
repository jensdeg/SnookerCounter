const NumberSounds = [];

for (let i = 1; i <= 7; i++) {
    NumberSounds[i] = new Audio(`../resources/sounds/${i}.mp3`);
}

function PlayNumberSound(number){
    number = parseInt(number);
    if (number < 1 || number > 7) return;

    const player = NumberSounds[number];
    player.currentTime = 0;
    player.play();
}