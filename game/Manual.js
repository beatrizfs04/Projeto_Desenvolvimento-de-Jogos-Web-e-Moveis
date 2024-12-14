// Selecionar o canvas e o contexto
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// Carregar a imagem de fundo
const backgroundImage = new Image();
backgroundImage.src = "img/Fundo.jpg"; // Substitua pelo caminho da sua imagem de fundo

// Variáveis do retângulo branco
const rectWidth = 300; // Largura do retângulo
const rectHeight = 150; // Altura do retângulo
const rectX = (canvas.width / 2) - (rectWidth / 2); // Posição X (centrado)
const rectY = (canvas.height / 2) - (rectHeight / 2); // Posição Y (centrado)

// Variáveis do botão
const buttonX = canvas.width / 2 + 105; // Posição X
const buttonY = rectY + rectHeight - 145; // Posição Y (ajustado para ficar abaixo do retângulo)
const buttonWidth = 40;
const buttonHeight = 28;
const borderRadius = 10; // Raio das bordas
const buttonColor = "grey"; // Cor do botão
const textColor = "black"; // Cor do texto no botão

// Função para desenhar a tela inicial
function drawStartScreen() {
  // Desenhar a imagem de fundo
  backgroundImage.onload = () => {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Desenhar o retângulo branco
    context.fillStyle = "white";
    context.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Desenhar o botão
    drawButton();
  };
}

// Função para desenhar o botão
function drawButton() {
  // Botão retangular com bordas arredondadas
  context.fillStyle = buttonColor;
  context.beginPath();
  context.moveTo(buttonX + borderRadius, buttonY);
  context.lineTo(buttonX + buttonWidth - borderRadius, buttonY);
  context.quadraticCurveTo(buttonX + buttonWidth, buttonY, buttonX + buttonWidth, buttonY + borderRadius);
  context.lineTo(buttonX + buttonWidth, buttonY + buttonHeight - borderRadius);
  context.quadraticCurveTo(buttonX + buttonWidth, buttonY + buttonHeight, buttonX + buttonWidth - borderRadius, buttonY + buttonHeight);
  context.lineTo(buttonX + borderRadius, buttonY + buttonHeight);
  context.quadraticCurveTo(buttonX, buttonY + buttonHeight, buttonX, buttonY + buttonHeight - borderRadius);
  context.lineTo(buttonX, buttonY + borderRadius);
  context.quadraticCurveTo(buttonX, buttonY, buttonX + borderRadius, buttonY);
  context.closePath();
  context.fill();

  // Texto no botão
  context.fillStyle = textColor;
  context.font = "20px Arial";
  context.textAlign = "center";
  context.fillText("X", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2 + 7);
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
    // Redirecionar para homeManual.html
    window.location.href = "home1.html";
  }
});

// Desenhar a tela inicial
drawStartScreen();
