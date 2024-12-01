
//player
var player = new Image();
player.src = "img2/character_blue_run_right.png";

var playerBack = new Image();
playerBack.src = "img2/character_blue_run_left.png";

var playerIdleRight = new Image();
playerIdleRight.src = "img2/character_blue_idle_right.png";

var playerIdleLeft = new Image();
playerIdleLeft.src = "img2/character_blue_idle_left.png";
let playerX = 28;
let playerY = 180;


let freezedParallax = false;
let fell = false;

//Inimigo
var Inimigo = new Image();
Inimigo.src = "img2/Inimigo.png";
let InimigoX = 40;
let IninmigoY = 180;

//frames and sprites
const frameWidth = 130;
const frameHeight = 155;

const scaleFactor = 1.5; // Aumentar altura (150%)
const scaledWidth = frameWidth; // Largura permanece igual
const scaledHeight = frameHeight * scaleFactor; // Nova altura

const heightDifference = scaledHeight - frameHeight; // Diferença na altura
playerY -= heightDifference; // Move a posição para cima

//number of frames tem a ver com a quantidade de imagens da boneca na image original.
const numberOfFrames = 4;
const numberOfFramesIdle = 8;

let currentFrame = 0;
let currentSprite = 0; // 0: right, 1: left
let currentSpriteIdle = 0; // 0: right, 1: left

let spriteRunning = false;
let spriteIdle = true;

//player hitbox
let playerHitbox = {
  x: playerX ,
  y: playerY ,
  width: frameWidth * 0.4,  //opcional
  height: frameHeight * 0.8 //opcional
};

//Inimigo hitbox
let InimigoHitbox = {
  x: InimigoX ,
  y: InimigoX ,
  width: frameWidth * 0.4,  
  height: frameHeight * 0.8
};

//Vida da Bruxinha
VidaCount = 5;

//backgrounds
var background5 = new Image();
background5.src = "img2/background5.png";
var background5X = 0;
var backgroundY = 0;

var background4 = new Image();
background4.src = "img2/background4.png";
var background4X = 0;

var background3 = new Image();
background3.src = "img2/background3.png";
background3X = 0;

var background2 = new Image();
background2.src = "img2/background2.png";
background2X = 0;

var ground1 = new Image();
ground1.src = "img2/ground.png";
ground1X = 0;

const earth = new Image();
earth.src = "img2/highground.png";

//não me parece que esteja sendo usada. é definida no keydown
let velPlayer = 0;


//deixar a animção mais devagar
let frameDelayRunning = 18; 
let frameDelayIdle = 18; 
let frameCount = 0; 

//salto 
let isJumping = false; 
let jumpFrameCount = 0; 
const jumpDuration = 30; 
const jumpPower = 5;
const gravityAction = 1.5; 
let gravity = true;

//movimentação + teclado
let knownKey = true;

//blocks
var block = new Image();
block.src = "img2/block2.png";


let blockX = 480;
let blockY = 180;

//ground
isOnGround = true;

let ground = [
  {x: 0, y: 229, width: 550, height:40},
  {x: 700, y: 200, width: 100, height:80},
  {x: 900, y: 200, width: 100, height:80},
];

//plataformas (blocos)
let platforms = [
  { x: 280, y: 189, width: 45, height: 20, type: "block" },
  { x: 400, y: 170, width: 45, height: 20, type: "block" },
  { x: 520, y: 150, width: 80, height: 150, type: "earth" }
];

let isOnPlatform = false;
let isCollidingRight = false;
let isCollidingLeft = false;
let isCollidingBottom = false;
let platformImage;

// deslocamento horizontal do mundo
let worldOffsetX = 0; 

//cristal
const cristal = new Image();
cristal.src = "img2/cristal.png";
let cristal = [
  { x: 300, y: 215, width: 10, height: 10 },
  { x: 350, y: 215, width: 10, height: 10 }
]

//pontuação
cristalCount = 0;

let keysPressed = {};

let CharMovement = function(e) {
  keysPressed[e.keyCode] = true;
};

let CharStopMovement = function(e) {
  keysPressed[e.keyCode] = false;

  if (!keysPressed[37] && !keysPressed[39]) {
    spriteRunning = false; 
    spriteIdle = true;     
  }
};

inicializar();

function inicializar() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  window.addEventListener('keydown', CharMovement);
  window.addEventListener('keyup', CharStopMovement);
  
  requestAnimationFrame(gameLoop);
}

let worldMovementSpeed = 2;

let updateCharacterMovement = function() {
  if (keysPressed[37]) { //pra trás
    currentSprite = 1;
    currentSpriteIdle = 1;
    spriteRunning = true;
    velPlayer = -1;
    if (canMoveLeft){
      playerX = Math.max(0, playerX + velPlayer);
      worldOffsetX = Math.max(0, worldOffsetX + velPlayer * worldMovementSpeed);
      moveParallaxRight();
    }
  }
  if (keysPressed[39]) { //pra frente
    currentSprite = 0;
    currentSpriteIdle = 0;
    spriteRunning = true;
    velPlayer = 1;
    if (canMoveRight){
      if (playerX < canvas.width - frameWidth) playerX += velPlayer;
      moveParallaxLeft();
      worldOffsetX += velPlayer * worldMovementSpeed;
    }
    
  }
  if (keysPressed[38]) { //salto
    if (!isJumping && (isOnGround || isOnPlatform)) { // Inicia o salto somente se não estiver no ar
      isJumping = true;
      jumpFrameCount = 0; 
      spriteIdle = true;
      isOnGround = false; 
      isOnPlatform = false;
    }
  }
  if (keysPressed[37] && keysPressed[39]) { // Prevent movement if both keys are pressed
    velPlayer = 0; 
  }
};

function freezeParallax(){
  if(playerX < 6){
    freezedParallax = true;
  }
}

function desenhaImagem(imagem, x, y, width, height) {
  context.drawImage(imagem, x, y, width, height);
}

function desenhaPlayer(imagem, x, y, width, height, frameX, frameY) {
  context.drawImage(imagem, frameX, frameY, frameWidth, frameHeight, x, y, width, height);
}

function desenhaInimigo(imagem, x, y, width, height, frameX, frameY) {
  context.drawImage(imagem, frameX, frameY, frameWidth, frameHeight, x, y, width, height);
}

function drawGround() {
  for (let i = 0; i < ground.length; i++) {
    const groundSegment = ground[i];
    const screenX = groundSegment.x - worldOffsetX; // Ajusta a posição no eixo X

    context.fillStyle = "transparent";  
    context.fillRect(screenX, groundSegment.y, groundSegment.width, groundSegment.height);
    
    context.drawImage(ground1, screenX, groundSegment.y -6, groundSegment.width, groundSegment.height);
  }
}

function drawPlatforms() {
  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    const screenX = platform.x - worldOffsetX; 
    let platformImage;

    if (platform.type === "block") {
      platformImage = block;
    } else if (platform.type === "earth") {
      platformImage = earth;
    }

    if (platformImage) {
      desenhaImagem(platformImage, screenX, platform.y, platform.width, platform.height);
    }  
  }
}

function drawCristal() {
  for (let i = 0; i < cristal.length; i++) {
    const cristalObj = cristal[i];  // nome da variável na lista de cristais
    const screenX = cristalObj.x - worldOffsetX;
    desenhaImagem(cristal, screenX, cristalObj.y, cristalObj.width, cristalObj.height);
  }
}

function checkCristalCollision() {
  for (let i = 0; i < cristal.length; i++) {
    const cristalObj = cristal[i];
    const screenX = cristalObj.x - worldOffsetX; // Considera o deslocamento do mundo

    // Verifica colisão com o cristal
    if (
      playerHitbox.x + playerHitbox.width > screenX && // O player está à direita do cristal
      playerHitbox.x < screenX + cristalObj.width && // O player está à esquerda do cristal
      playerHitbox.y + playerHitbox.height > cristalObj.y && // O player está abaixo do cristal
      playerHitbox.y < cristalObj.y + cristalObj.height // O player está acima do cristal
    ) {
      cristal.splice(i, 1); // Remove o cristal da lista
      i--; // Ajusta o índice devido à remoção
      cristalCount += 1; // Incrementa a pontuação
    }
  }
}

function checkGroundCollision() {
  let onGround = false; 
  let isCollidingLeft = false; // Colisão à esquerda
  let isCollidingRight = false; // Colisão à direita

  for (let i = 0; i < ground.length; i++) { 
    let groundElement = ground[i];   
    const groundScreenX = groundElement.x - worldOffsetX;

    // Verificação de colisão vertical (em cima do chão)
    if (
      playerHitbox.x + playerHitbox.width > groundScreenX &&
      playerHitbox.x < groundScreenX + groundElement.width &&
      playerHitbox.y + playerHitbox.height >= groundElement.y &&
      playerHitbox.y + playerHitbox.height <= groundElement.y + gravityAction
    ) {
      if (!isJumping) {
        onGround = true; 
        break; 
      }
    }

    // Colisão lateral à direita
    if (
      playerHitbox.x + playerHitbox.width >= groundScreenX && // Lado direito do jogador encosta
      playerHitbox.x < groundScreenX && // Dentro do limite esquerdo do chão
      playerHitbox.y + playerHitbox.height > groundElement.y && // Dentro da altura do chão
      playerHitbox.y < groundElement.y + groundElement.height // Jogador não está "em cima"
    ) {
      isCollidingRight = true;
      console.log("colidiu direita");
    }

    // Colisão lateral à esquerda
    if (
      playerHitbox.x <= screenX + groundElement.width && // Lado esquerdo do jogador encosta
      playerHitbox.x + playerHitbox.width > screenX + groundElement.width && // Dentro do limite direito do chão
      playerHitbox.y + playerHitbox.height > groundElement.y && // Dentro da altura do chão
      playerHitbox.y < groundElement.y + groundElement.height // Jogador não está "em cima"
    ) {
      isCollidingLeft = true;
      console.log("colidiu esquerda");
    }
  }

  // Atualiza estados de colisão
  isOnGround = onGround; 

  // Impede movimento horizontal baseado nas colisões laterais
  if (isCollidingRight) {
    canMoveRight = false;
  } else {
    canMoveRight = true;
  }

  if (isCollidingLeft) {
    canMoveLeft = false;
  } else {
    canMoveLeft = true;
  }
}

function debugDraw() {
  context.strokeStyle = "red";
  context.strokeRect(playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height);

  ground.forEach((g) => {
    let groundScreenX = g.x - worldOffsetX;
    context.strokeRect(groundScreenX, g.y, g.width, g.height);
  });

  platforms.forEach((p) => {
    let platformScreenX = p.x - worldOffsetX;
    context.strokeRect(platformScreenX, p.y, p.width, p.height);
  });
}

function checkPlatformCollision() {
  isOnPlatform = false; // Reseta o estado da colisão vertical
  let isCollidingLeft = false; // Colisão à esquerda
  let isCollidingRight = false; // Colisão à direita

  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    const platformScreenX = platform.x - worldOffsetX; // Ajusta a posição da plataforma com base no deslocamento do mundo

    // Colisão vertical (em cima da plataforma)
    if (
      playerHitbox.x + playerHitbox.width > platformScreenX && // Jogador dentro da largura da plataforma
      playerHitbox.x < platformScreenX + platform.width &&
      playerHitbox.y + playerHitbox.height >= platform.y && // Jogador encostando no topo
      playerHitbox.y + playerHitbox.height <= platform.y + gravityAction // Não atravessou a plataforma
    ) {
      isOnPlatform = true; // Sai do loop, pois já está em cima de uma plataforma
    }

    // Colisão lateral à direita
    if (
      playerHitbox.x + playerHitbox.width >= platformScreenX && // Lado direito do jogador encosta
      playerHitbox.x < platformScreenX && // Dentro do limite esquerdo da plataforma
      playerHitbox.y + playerHitbox.height > platform.y && // Dentro da altura da plataforma
      playerHitbox.y < platform.y + platform.height && // Jogador não está "em cima"
      !isOnPlatform // Garante que a colisão lateral não interfira na vertical
    ) {
      isCollidingRight = true;
    }

    // Colisão lateral à esquerda
    if (
      playerHitbox.x <= platformScreenX + platform.width && // Lado esquerdo do jogador encosta
      playerHitbox.x + playerHitbox.width > platformScreenX + platform.width && // Dentro do limite direito da plataforma
      playerHitbox.y + playerHitbox.height > platform.y && // Dentro da altura da plataforma
      playerHitbox.y < platform.y + platform.height && // Jogador não está "em cima"
      !isOnPlatform // Garante que a colisão lateral não interfira na vertical
    ) {
      isCollidingLeft = true;
    }
  }

  // Impede movimento horizontal baseado nas colisões laterais
  if (isCollidingRight) {
    canMoveRight = false;
  } else {
    canMoveRight = true;
  }

  if (isCollidingLeft) {
    canMoveLeft = false;
  } else {
    canMoveLeft = true;
  }
}

function gameOver(){
  if(playerY > 250) {
    fell = true; 
  }
}

function drawParallax(imagem, x, y, width, height){
  context.drawImage(imagem, x, y, width, height);
  context.drawImage(imagem, x-canvas.width, y, width, height);
  context.drawImage(imagem, x+canvas.width, y, width, height);
}


//função para mover o parallax quando aperto as teclas
function moveParallaxRight() {
  background5X += 0.1;
  background4X += 0.25;
  background3X += 0.5;
  background2X += 0.75;
  ground1X += 1;

  if (background5X > 424) background5X = 0;
  if (background4X > 424) background4X = 0;
  if (background3X > 424) background3X = 0;
  if (background2X > 424) background2X = 0;
  if (ground1X > 424) ground1X = 0;
}

function moveParallaxLeft() {
  background5X -= 0.1;
  background4X -= 0.25;
  background3X -= 0.5;
  background2X -= 0.75;
  ground1X -= 1;

  if (background5X < -424) background5X = 0;
  if (background4X < -424) background4X = 0;
  if (background3X < -424) background3X = 0;
  if (background2X < -424) background2X = 0;
  if (ground1X < -424) ground1X = 0;
}

// Adjusting gravity more smoothly
function applyGravity() {
  if (!isOnGround && !isOnPlatform) {
    playerY += gravityAction; 
  }
}

function applyGravityJump(){
  if (isJumping) {
    if (jumpFrameCount < jumpDuration) {
      playerY -= jumpPower - (jumpFrameCount * 0.1); 
      jumpFrameCount++;
    } else {
      isJumping = false;
    }
  }
}

function animation(){
   //deixa as animações mais devagar
   if (spriteRunning) {
    if (frameCount >= frameDelayRunning) {
      currentFrame = (currentFrame + 1) % numberOfFrames;
      frameCount = 0; 
    }
  } 
  else if (spriteIdle) {
    if (frameCount >= frameDelayIdle) {
      currentFrame = (currentFrame + 1) % numberOfFramesIdle; 
      frameCount = 0; 
    }
  }
}

function gameLoop() {
  gameOver();
  if (fell) {
    context.fillStyle = "red";  
    context.font = "30px Arial";  
    context.fillText("Game Over!", canvas.width / 2 - 60, canvas.height / 1.8); 
    return;
  }
  console.log(playerY);
  console.log(playerX);
  checkGroundCollision();
  
  context.clearRect(0, 0, canvas.width, canvas.height); 

  frameCount++; 

  //desenha o parallax
  drawParallax(background5, background5X, backgroundY,524, 246);
  drawParallax(background4, background4X, backgroundY,524, 246);
  drawParallax(background3, background3X, backgroundY,425, 246);
  drawParallax(background2, background2X, backgroundY,425, 246);

  applyGravity();
  applyGravityJump();
  
  drawGround();
  drawPlatforms();
  
  //definindo a hitbox para ficar na posição certa da boneca
  //a largura e altura são definidas lá em cima (playerHitbox.width, playerHitbox.height)
  let defineHitboxX = playerX + 4;
  let defineHitboxY = playerY + 2; //aqui

  playerHitbox.x = defineHitboxX; 
  playerHitbox.y = defineHitboxY; 

  context.fillStyle = "rgba(255, 0, 0, 0.5)";  
  context.fillRect(playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height);

  //checkGroundCollision();
  checkPlatformCollision();

  drawCristal();
  checkCristalCollision();
  
  animation();

  //define o frame da imagem da animação (divide a imagem)
  const frameX = currentFrame * frameWidth; 
  const frameY = 5; 
  //move os quadrados que detectam a colisão junto com a boneca

  desenhaInimigo(Inimigo, InimigoX, IninmigoY, frameWidth, frameHeight, frameX, frameY)
  //desenha a bruxinha
  if (spriteRunning) {
    if (currentSprite == 0) {
      desenhaPlayer(player, playerX, playerY, frameWidth, frameHeight, frameX, frameY);
    } else {
      desenhaPlayer(playerBack, playerX, playerY, frameWidth, frameHeight, frameX, frameY);
    }
  } else if (spriteIdle) {
    if (currentSpriteIdle == 0) {
      desenhaPlayer(playerIdleRight, playerX, playerY, frameWidth, frameHeight, frameX, frameY);
    } else {
      desenhaPlayer(playerIdleLeft, playerX, playerY, frameWidth, frameHeight, frameX, frameY);
    }
  }
  freezeParallax();

  context.fillStyle = "white";  // Cor do texto
  context.font = "9px Arial";  // Tamanho da fonte
  context.fillText("Vida Restante: " + VidaCount, 5, 15);  // Posição e texto

  context.fillStyle = "white";  // Cor do texto
  context.font = "9px Arial";  // Tamanho da fonte
  context.fillText("Cristais Coletados: " + cristalCount, 5, 30);  // Posição e texto

  updateCharacterMovement();
  requestAnimationFrame(gameLoop); // Chama o loop novamente
}
