
//player
var player = new Image();
player.src = "img/run_right.png";

var playerBack = new Image();
playerBack.src = "img/run_left.png";

var playerIdleRight = new Image();
playerIdleRight.src = "img/idle_right.png";

var playerIdleLeft = new Image();
playerIdleLeft.src = "img/idle_left.png";

let freezedParallax = false;
let fell = false;



//frames and sprites
const frameWidth = 30;
const frameHeight = 48;

//number of frames tem a ver com a quantidade de imagens da boneca na image original.
const numberOfFrames = 5;
const numberOfFramesIdle = 5;

let currentFrame = 0;
let currentSprite = 0; // 0: right, 1: left
let currentSpriteIdle = 0; // 0: right, 1: left

let spriteRunning = false;
let spriteIdle = true;


//Inimigo
var enemy1 = new Image();
enemy1.src = "img/enemy1.png";
let enemy1X = 100;
let enemy1Y = 220;

let frameWidthEnemy1 = 25.5;
let frameHeightEnemy1 = 20;

const numberOfFramesEnemy1 = 2;
let currentFrameEnemy = 0;

let enemyFrameX = 1;
let enemyFrameY = 1;

let hitBoxEnemy1 = {
	x: enemy1X,
	y: enemy1Y,
	width: frameWidthEnemy1 * 0.8, //opcional
	height: frameHeightEnemy1 * 0.6, //opcional
}

let hitboxFramesEnemy1 = [
  { width: 14, height: 10, offsetX: 6, offsetY: 0 },  // Para o frame 0
  { width: 17, height: 8, offsetX: 3, offsetY: 1},   // Para o frame 1
];

//Vida da Bruxinha
VidaCount = 5;

//backgrounds
var background5 = new Image();
background5.src = "img/background5.png";
var background5X = 0;
var backgroundY = 0;

var background4 = new Image();
background4.src = "img/background4.png";
var background4X = 0;

var background3 = new Image();
background3.src = "img/background3.png";
background3X = 0;

var background2 = new Image();
background2.src = "img/background2.png";
background2X = 0;

var ground1 = new Image();
ground1.src = "img/ground.png";
ground1X = 0;

const earth = new Image();
earth.src = "img/highground.png";

//não me parece que esteja sendo usada. é definida no keydown
let velPlayer = 0;


//deixar a animção do player mais devagar
let frameDelayRunning = 18; 
let frameDelayIdle = 18; 
let frameCount = 0; 

//deixa a animação do enemy mais devagar
let frameDelayEnemy = 30; 
let frameCountEnemy = 0;


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
block.src = "img/block2.png";


let blockX = 480;
let blockY = 180;

//ground
isOnGround = true;
let ground = [
  { x: 520, y: 150, width: 160, height: 150, type: "earth" },
  {x: 0, y: 229, width: 800, height:40, type: "ground"},
  {x: 1000, y: 229, width: 400, height:40, type: "ground"},
];


//plataformas (blocos)
let platforms = [
  { x: 280, y: 189, width: 45, height: 20, type: "block" },
  { x: 395, y: 170, width: 45, height: 20, type: "block" },
  {x: 800, y: 150, width: 100, height: 150, type: "earth"},
  {x: 900, y: 200, width: 100, height:80, type: "earth"},
  {x: 1400, y: 200, width: 100, height:80, type: "earth"},
  {x: 1500, y: 150, width: 100, height:120, type: "earth"},
  {x: 1700, y: 150, width: 100, height:120, type: "earth"},
];


let isOnPlatform = false;
let isCollidingRight = false;
let isCollidingLeft = false;
let isCollidingBottom = false;
let platformImage;

// deslocamento horizontal do mundo

//mushroom
const mushroom = new Image();
mushroom.src = "img/mushroom.png";

let mushrooms = [
  { x: 740, y: 80, width: 10, height: 10 },
  { x: 1050, y: 140, width: 10, height: 10 },
  { x: 1645, y: 90, width: 10, height: 10 },
]


//pontuação
mushroomCount = 0;

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
let worldOffsetX = 0; 


let playerX = (canvas.width / 2) - (frameWidth / 2); // Centraliza o player
let playerY = 180;


//player hitbox
let playerHitbox = {
  x: playerX ,
  y: playerY ,
  width: frameWidth * 0.4,  //opcional
  height: frameHeight * 0.8 //opcional
};



let worldMovementSpeed = 2;

let updateCharacterMovement = function() {
  if (keysPressed[37]) { // Esquerda
    currentSprite = 1;
    currentSpriteIdle = 1;
    spriteRunning = true;
    velPlayer = -1;

    if (canMoveLeft) {
      worldOffsetX = Math.max(0, worldOffsetX + velPlayer * worldMovementSpeed);
      moveParallaxRight();
    }
  }
  if (keysPressed[39]) { // Direita
    currentSprite = 0;
    currentSpriteIdle = 0;
    spriteRunning = true;
    velPlayer = 1;

    if (canMoveRight) {
      worldOffsetX += velPlayer * worldMovementSpeed;
      moveParallaxLeft();
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


//desenha o inimigo
function drawEnemy(imagem, x, y, width, height, frameX, frameY) {

  let currentHitbox = hitboxFramesEnemy1[currentFrameEnemy];

  hitBoxEnemy1.x = x + currentHitbox.offsetX; // Ajusta a posição X da hitbox
  hitBoxEnemy1.y = y + currentHitbox.offsetY; // Ajusta a posição Y da hitbox
  hitBoxEnemy1.width = currentHitbox.width;    // Atualiza a largura da hitbox
  hitBoxEnemy1.height = currentHitbox.height;  // Atualiza a altura da hitbox

  context.fillStyle = "rgba(255, 0, 0, 0.5)"; // Cor semi-transparente
  context.fillRect(hitBoxEnemy1.x, hitBoxEnemy1.y, hitBoxEnemy1.width, hitBoxEnemy1.height);
  context.drawImage(imagem, frameX, frameY, frameWidthEnemy1, frameHeightEnemy1, x, y, width, height);

}







function drawGround() {
  for (let i = 0; i < ground.length; i++) {
    const groundSegment = ground[i];
    const screenX = groundSegment.x - worldOffsetX; // ajusta a posição no eixo X
    const screenY = groundSegment.y * 0.97; //ajusta o chão com a hitbox do chão (o fillrect)
    context.fillStyle = "transparent";  
    context.fillRect(screenX, groundSegment.y, groundSegment.width, groundSegment.height);
    let groundImage;

    if (groundSegment.type === "ground") {
      groundImage = ground1;
    } else if (groundSegment.type === "earth") {
      groundImage = earth;
    }

    if(groundImage){
      desenhaImagem(groundImage, screenX, screenY, groundSegment.width, groundSegment.height);
    }
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

function drawMushrooms() {
  for (let i = 0; i < mushrooms.length; i++) {
    const mushroomObj = mushrooms[i];  // nome da variável na lista de cogumelos
    const screenX = mushroomObj.x - worldOffsetX;
    desenhaImagem(mushroom, screenX, mushroomObj.y, mushroomObj.width, mushroomObj.height);
  }
}

function checkMushroomCollision() {
  for (let i = 0; i < mushrooms.length; i++) {
    const mushroomObj = mushrooms[i];
    const screenX = mushroomObj.x - worldOffsetX; // Considera o deslocamento do mundo

    // Verifica colisão com o cogumelo
    if (
      playerHitbox.x + playerHitbox.width > screenX && // O player está à direita do cogumelo
      playerHitbox.x < screenX + mushroomObj.width && // O player está à esquerda do cogumelo
      playerHitbox.y + playerHitbox.height > mushroomObj.y && // O player está abaixo do cogumelo
      playerHitbox.y < mushroomObj.y + mushroomObj.height // O player está acima do cogumelo
    ) {
      mushrooms.splice(i, 1); // Remove o cogumelo da lista
      i--; // Ajusta o índice devido à remoção
      mushroomCount += 1; // Incrementa a pontuação
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


function checkEnemyCollision(playerHitbox, enemyHitbox){
  if (
    playerHitbox.x < enemyHitbox.x + enemyHitbox.width &&
    playerHitbox.x + playerHitbox.width > enemyHitbox.x &&
    playerHitbox.y < enemyHitbox.y + enemyHitbox.height &&
    playerHitbox.y + playerHitbox.height > enemyHitbox.y
  ) {
    // Colisão detectada!
    console.log("Colisão com o inimigo!");
  }
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

function animateEnemy() {
  frameCountEnemy++;

  if (frameCountEnemy >= frameDelayEnemy) {
    currentFrameEnemy = (currentFrameEnemy + 1) % numberOfFramesEnemy1; 
    frameCountEnemy = 0;
  }
}

let direction = 1; // 1 para direita, -1 para esquerda


function updateEnemyPosition() {
  // Atualiza a posição do inimigo com base na direção atual
  enemy1X += 1 * direction; 

  if (enemy1X >= 300) {
    direction = -1; // Muda a direção para a esquerda
  }

  // Verifica se atingiu o limite esquerdo (40)
  if (enemy1X <= 100) {
    direction = 1; // Muda a direção para a direita
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
  //console.log(playerY);
  //console.log(playerX);
  checkGroundCollision();
  
  context.clearRect(0, 0, canvas.width, canvas.height); 

  frameCount++; 

  //desenha o parallax
  drawParallax(background5, background5X, backgroundY,524, 246);
  drawParallax(background4, background4X, backgroundY,524, 246);
  drawParallax(background3, background3X, backgroundY,524, 246);
  drawParallax(background2, background2X, backgroundY,524, 246);

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

  const enemyFrameX = currentFrameEnemy * frameWidthEnemy1;  // Calcula o frame X
  drawEnemy(enemy1, enemy1X - worldOffsetX, enemy1Y, frameWidthEnemy1, frameHeightEnemy1, enemyFrameX, 0);

  animateEnemy(); 
  updateEnemyPosition(); 
  checkEnemyCollision(playerHitbox, hitBoxEnemy1);


  drawMushrooms();
  checkMushroomCollision();
  
  animation();

  //define o frame da imagem da animação (divide a imagem)
  const frameX = 5; 
  const frameY = currentFrame * frameHeight; 
  //move os quadrados que detectam a colisão junto com a boneca

  
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
  context.fillText("Cogumelos Coletados: " + mushroomCount, 5, 30);  // Posição e texto

  updateCharacterMovement();
  requestAnimationFrame(gameLoop); // Chama o loop novamente
}

