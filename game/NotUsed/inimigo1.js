var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var jogadorPosicaoX = myCanvas.width * 0.35; // Posição fixa no eixo X
var jogadorPosicaoY = myCanvas.height * 0.25; // Posição fixa no eixo Y

// Lista para armazenar as imagens
var imagens = [];
for (let i = 1; i <= 16; i++) {
    let imagem = new Image();
    imagem.src = `fogo_sprites/fogo${i}.png`; // Assumindo que as imagens são nomeadas fogo1.png, fogo2.png, ..., fogo16.png
    imagens.push(imagem);
}

var frameAtual = 0;
var contadorFrame = 0;

function inicializar() {
    setInterval(gameLoop, 20); // Chama o loop do jogo a cada 20ms
}

function gameLoop() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    // Atualizar o frame da animação
    contadorFrame++;
    if (contadorFrame % 10 === 0) {
        frameAtual = (frameAtual + 1) % imagens.length; // Alterna entre as 16 imagens
    }

    // Desenhar a imagem atual
    ctx.drawImage(
        imagens[frameAtual], 
        jogadorPosicaoX, jogadorPosicaoY, // Posição no canvas
        100, 100 // Tamanho da imagem no canvas (ajuste como desejar)
    );

    // Sem movimentação: o jogador permanece parado no lugar
}

inicializar();

