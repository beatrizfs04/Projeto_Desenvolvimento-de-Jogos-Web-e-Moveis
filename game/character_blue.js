var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var playerX = 200; // Posição fixa no eixo X
var playerX = 50; // Posição fixa no eixo Y

// Lista para armazenar as imagens
var imagensPlayer = [];
for (let i = 1; i <= 27; i++) {
    let player = new Image();
    player.src = `character_blue_sprites/character_blue_${i}.png`; // Assumindo que as imagens são nomeadas character_blue1.png, character_blue2.png, ..., character_blue27.png
    imagensPlayer.push(player);
}

var frameAtual = 0;
var contadorFrame = 0;

function inicializar() {
    setInterval(gameLoop, 20); // Chama o loop do jogo a cada 20ms
}

function gameLoop() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    contadorFrame++;
    if (contadorFrame % 10 === 0) {
        frameAtual = (frameAtual + 1) % imagens.length; 
    }
    ctx.drawImage(imagensPlayer[frameAtual], playerX, playerY, 100, 100);
}

inicializar();
