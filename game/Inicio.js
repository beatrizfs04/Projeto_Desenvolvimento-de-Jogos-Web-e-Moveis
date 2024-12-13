// Selecionar o canvas e o contexto
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// Carregar a imagem de fundo
const backgroundImage = new Image();
backgroundImage.src = "img/logo_game.png"; // Caminho da imagem logo.png

// Variáveis do botão
const buttonX = canvas.width / 2 - 70; // Posição X
    const buttonY = (canvas.height / 2) + 85;  // Posição Y
    const buttonWidth = 150;
    const buttonHeight = 28;
    const borderRadius = 10; // Raio das bordas
    const buttonColor = "white"; // Cor do botão
    const textColor = "black"; // Cor do texto no botão


// Função para desenhar o início
function drawStartScreen() {
  // Desenhar o fundo (imagem logo.png)
  backgroundImage.onload = () => {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Desenhar o botão
    drawButton();
  };
}

// Função para desenhar o botão
function drawButton() {
  // Botão retangular
  context.fillStyle = buttonColor;
  context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
  

  // Texto no botão
  context.fillStyle = textColor;
  context.font = "20px Arial";
  context.textAlign = "center";
  context.fillText("Play", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2 + 7);
}

// Evento de clique no botão
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Verificar se o clique foi dentro do botão
  if (
    mouseX >= buttonX &&
    mouseX <= buttonX + buttonWidth &&
    mouseY >= buttonY &&
    mouseY <= buttonY + buttonHeight
  ) {
    // Redirecionar para home1.html
    window.location.href = "home1.html";
  }
});

// Desenhar a tela inicial
drawStartScreen();
