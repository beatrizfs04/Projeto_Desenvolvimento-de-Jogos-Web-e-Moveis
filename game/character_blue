var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var jogadorPosicaoX = canvas.width * 0.35; // Posição fixa no eixo X
var jogadorPosicaoY = canvas.height * 0.25; // Posição fixa no eixo Y

// Lista para armazenar as imagens
var imagens = [];
for (let i = 1; i <= 27; i++) {
    let imagem = new Image();
    imagem.src = `character_blue_sprites/character_blue_${i}.png`; // Assumindo que as imagens são nomeadas fogo1.png, fogo2.png, ..., fogo16.png
    imagens.push(imagem);
}

var frameAtual = 0;
var contadorFrame = 0;

function inicializar() {
    setInterval(gameLoop, 20); // Chama o loop do jogo a cada 20ms
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar o frame da animação
    contadorFrame++;
    if (contadorFrame % 10 === 0) {
        frameAtual = (frameAtual + 1) % imagens.length; // Alterna entre as 16 imagens
    }

    // Desenhar a imagem atual
    ctx.drawImage(
        imagens[frameAtual], 
        jogadorPosicaoX, jogadorPosicaoY, // Posição no canvas
        200, 200 // Tamanho da imagem no canvas (ajuste como desejar)
    );

    // Sem movimentação: o jogador permanece parado no lugar
}

inicializar();
