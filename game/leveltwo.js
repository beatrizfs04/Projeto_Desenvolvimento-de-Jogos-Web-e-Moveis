
//player
var player = new Image();
player.src = "img2/character_blue_run_right.png";

var playerBack = new Image();
playerBack.src = "img2/character_blue_run_left.png";

var playerIdleRight = new Image();
playerIdleRight.src = "img2/character_blue_idle_right.png";

var playerIdleLeft = new Image();
playerIdleLeft.src = "img2/character_blue_idle_left.png";

let freezedParallax = false;
let fell = false;

var playerDamageRight = new Image();
playerDamageRight.src = "img/damageright.png";

var playerDamageLeft = new Image();
playerDamageLeft.src = "img/damageleft.png";

//frames and sprites
const frameWidth = 130;
const frameHeight = 151;

const scaleFactor = 1.5; // Aumentar altura (150%)
const scaledWidth = frameWidth; // Largura permanece igual
const scaledHeight = frameHeight * scaleFactor; // Nova altura

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
let enemy1X = 1000;
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
block.src = "img2/block2.png";


let blockX = 480;
let blockY = 180;


let worldOffsetX = 1100; 


//ground
isOnGround = true;
let ground = [
  { x: 520, y: 150, width: 160, height: 150, type: "earth" },
  {x: 0, y: 229, width: 800, height:40, type: "ground"},
  {x: 1000, y: 229, width: 400, height:40, type: "ground"},
  {x: 2300, y: 229, width: 400, height:40, type: "ground"},
];


//plataformas (blocos)
let platforms = [
  {x: 280, y: 189, width: 45, height: 20, type: "block" },
  {x: 395, y: 170, width: 45, height: 20, type: "block" },
  {x: 800, y: 150, width: 100, height: 150, type: "earth"},
  {x: 900, y: 200, width: 100, height:80, type: "earth"},
  {x: 1400, y: 200, width: 50, height:80, type: "earth"},
  {x: 1500, y: 150, width: 100, height:120, type: "earth"}, // não está a colidir à direita
  //{x: 1600, y: 200, width: 100, height:80, type: "earth"},
  {x: 1700, y: 150, width: 100, height:120, type: "earth"},
  {x: 1880, y: 130, width: 45, height:20, type: "block"},
  {x: 2000, y: 110, width: 45, height:20, type: "block"},
  {x: 2100, y: 150, width: 100, height:120, type: "earth"},
  {x: 2200, y: 200, width: 100, height:120, type: "earth"},
];


let isOnPlatform = false;
let isCollidingRight = false;
let isCollidingLeft = false;
let isCollidingBottom = false;
let platformImage;

// deslocamento horizontal do mundo

//mushroom
const mushroom = new Image();
mushroom.src = "img2/cristal.png";

let mushrooms = [
  { x: 740, y: 80, width: 10, height: 10 },
  { x: 1050, y: 140, width: 10, height: 10 },
  { x: 1645, y: 90, width: 10, height: 10 },
  {x: 1950, y: 80, width: 10, height: 10 },
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
//dano 

let playerDamage = false;
let enemy1Damage = false;
let enemyColided = false;



//som
// Música de fundo
var backgroundMusic = new Audio("audio/main.mp3"); // Substitua pelo caminho do seu arquivo de áudio
backgroundMusic.loop = true; // Faz a música tocar em loop
backgroundMusic.volume = 0.2; // Define o volume entre 0 (mudo) e 1 (máximo)

var walkingSound = new Audio("audio/walk.mp3");
walkingSound.volume = 0.2; // Define o volume entre 0 (mudo) e 1 (máximo)

var jumpSound = new Audio("audio/jump.mp3"); // Substitua pelo caminho do seu arquivo de áudio
jumpSound.volume = 0.2; // Define o volume entre 0 (mudo) e 1 (máximo)

var gameOverSound = new Audio("audio/gameover.mp3");
inicializar();

function inicializar() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  window.addEventListener('keydown', CharMovement);
  window.addEventListener('keyup', CharStopMovement);
  
  requestAnimationFrame(gameLoop);
}


let playerX = (canvas.width / 2) - (frameWidth / 2); // Centraliza o player
let playerY = 50;


//player hitbox
let playerHitbox = {
  x: playerX ,
  y: playerY ,
  width: frameWidth * 0.8,  //opcional
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
      if (isOnGround || isOnPlatform){
        walkingSound.play(); 
      }
    }
  }
  if (keysPressed[39]) { // Direita
    currentSprite = 0;
    currentSpriteIdle = 0;
    spriteRunning = true;
    velPlayer = 1;
    backgroundMusic.play(); // Inicia a reprodu//ção da música

    if (canMoveRight) {
      worldOffsetX += velPlayer * worldMovementSpeed;
      moveParallaxLeft();
      if (isOnGround || isOnPlatform){
        walkingSound.play(); 
      }
    }
  }
  if (keysPressed[38]) { //salto
    if (!isJumping && (isOnGround || isOnPlatform)) { // Inicia o salto somente se não estiver no ar
      isJumping = true;
      jumpFrameCount = 0; 
      spriteIdle = true;
      isOnGround = false; 
      isOnPlatform = false;
      jumpSound.play(); // Toca o som do pulo

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
      console.log("chao")
    }

    // Colisão lateral à direita
    if (
      playerHitbox.x + playerHitbox.width >= groundScreenX && // Lado direito do jogador encosta
      playerHitbox.x < groundScreenX && // Dentro do limite esquerdo do chão
      playerHitbox.y + playerHitbox.height > groundElement.y && // Dentro da altura do chão
      playerHitbox.y < groundElement.y + groundElement.height // Jogador não está "em cima"
    ) {
      isCollidingRight = true;
      console.log("colidiu direita chão");
    }

    // Colisão lateral à esquerda
    if (
      playerHitbox.x <= screenX + groundElement.width && // Lado esquerdo do jogador encosta
      playerHitbox.x + playerHitbox.width > screenX + groundElement.width && // Dentro do limite direito do chão
      playerHitbox.y + playerHitbox.height > groundElement.y && // Dentro da altura do chão
      playerHitbox.y < groundElement.y + groundElement.height // Jogador não está "em cima"
    ) {
      isCollidingLeft = true;
      console.log("colidiu esquerda chão");
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
  //xCollision = box1.right >= box2.left && box1.left <= box2.right
  //yCollision = box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom
  //return xCollision && yCollision
  if (
    playerHitbox.x >= enemyHitbox.x + enemyHitbox.width && 
    playerHitbox.x + playerHitbox.width <= enemyHitbox.x &&
    playerHitbox.y <= enemyHitbox.y + enemyHitbox.height && 
    playerHitbox.x + playerHitbox.height >= enemyHitbox.y
    //playerHitbox.x < enemyHitbox.x + enemyHitbox.width &&
    //playerHitbox.x + playerHitbox.width > enemyHitbox.x &&
    //playerHitbox.y < enemyHitbox.y + enemyHitbox.height &&
    //playerHitbox.y + playerHitbox.height > enemyHitbox.y
  ) {
    enemyColided = true;
    console.log("Enemy!")
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

    // Colisão lateral à esquerda
    if (
      playerHitbox.x <= platformScreenX + platform.width && // Lado esquerdo do jogador encosta
      playerHitbox.x + playerHitbox.width > platformScreenX + platform.width && // Dentro do limite direito da plataforma
      playerHitbox.y + playerHitbox.height > platform.y && // Dentro da altura da plataforma
      playerHitbox.y < platform.y + platform.height && !isOnPlatform // Garante que a colisão lateral não interfira na vertical
    ) {
      isCollidingLeft = true;
      console.log("colidiu esquerda plataforma");
    }

     // Colisão lateral à direita
     if (
      playerHitbox.x + playerHitbox.width >= platformScreenX && // Lado direito do jogador encosta
      playerHitbox.x <= platformScreenX && // Dentro do limite esquerdo da plataforma
      playerHitbox.y + playerHitbox.height > platform.y && // Dentro da altura da plataforma
      playerHitbox.y < platform.y + platform.height && !isOnPlatform// Garante que a colisão lateral não interfira na vertical
    ) {
      isCollidingRight = true;
      console.log("colidiu direita plataforma");
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
  // Configura cor do botão
  context.fillStyle = "white";
  drawRoundedRect(context, 80, 50, 265, 170, 15);

  context.fillStyle = "red";  
  context.font = "30px Arial";  
  context.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2); 
  backgroundMusic.pause();
  gameOverSound.play(); // Inicia a reprodu//ção da música
  
  // Desenhar botão
  const buttonX = canvas.width / 2 - 75; // Posição X
  const buttonY = canvas.height / 2 + 30;  // Posição Y
  const buttonWidth = 150;
  const buttonHeight = 50;
  const borderRadius = 15; // Raio das bordas

  // Configura cor do botão
  context.fillStyle = "green";
  drawRoundedRect(context, buttonX, buttonY, buttonWidth, buttonHeight, borderRadius);

  // Adiciona texto no botão
  context.fillStyle = "white";
  context.font = "16px Arial";
  context.fillText("Tentar Novamente", buttonX + 10, buttonY + 30);

  // Adiciona evento de clique ao canvas
  canvas.addEventListener("click", handleCanvasClick);

  function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Verifica se o clique foi dentro do botão
    if (
      mouseX >= buttonX &&
      mouseX <= buttonX + buttonWidth &&
      mouseY >= buttonY &&
      mouseY <= buttonY + buttonHeight
    ) {
      // Recarregar a página
      window.location.reload();
    }
  }
  return;
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

//as variáveis 1380 e 998 tem que ser 
function updateEnemyPosition() {
  enemy1X += 1 * direction; 

  if (enemy1X >= 1380) {
    direction = -1; // Muda a direção para a esquerda
  }

  // Verifica se atingiu o limite esquerdo (40)
  if (enemy1X <= 998) {
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

function drawRoundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y); // Início no canto superior esquerdo (ajustado pelo raio)
  context.lineTo(x + width - radius, y); // Linha superior
  context.arcTo(x + width, y, x + width, y + radius, radius); // Canto superior direito
  context.lineTo(x + width, y + height - radius); // Linha direita
  context.arcTo(x + width, y + height, x + width - radius, y + height, radius); // Canto inferior direito
  context.lineTo(x + radius, y + height); // Linha inferior
  context.arcTo(x, y + height, x, y + height - radius, radius); // Canto inferior esquerdo
  context.lineTo(x, y + radius); // Linha esquerda
  context.arcTo(x, y, x + radius, y, radius); // Canto superior esquerdo
  context.closePath();
  context.fill(); // Preencher o retângulo
}

function gameLoop() {
  
  checkGroundCollision();
  checkPlatformCollision();  

  frameCount++; 
  //desenha o parallax
  drawParallax(background5, background5X, backgroundY,524, 246);
  drawParallax(background4, background4X, backgroundY,524, 246);
  drawParallax(background3, background3X, backgroundY,425, 246);
  drawParallax(background2, background2X, backgroundY,425, 246);

  applyGravity();
  applyGravityJump();
  console.log(isOnPlatform);
  
  drawGround();
  drawPlatforms();
  
  //definindo a hitbox para ficar na posição certa da boneca
  //a largura e altura são definidas lá em cima (playerHitbox.width, playerHitbox.height)
  defineHitboxX = playerX + 4;
  defineHitboxY = playerY + 2;
  playerHitbox.x = defineHitboxX; 
  playerHitbox.y = defineHitboxY; 
  context.fillStyle = "rgba(255, 0, 0, 0.5)";  
  context.fillRect(playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height);


  const enemyFrameX = currentFrameEnemy * frameWidthEnemy1;  // Calcula o frame X
  drawEnemy(enemy1, enemy1X - worldOffsetX, enemy1Y, frameWidthEnemy1, frameHeightEnemy1, enemyFrameX, 0);

  playerHitbox.x = playerX;
  playerHitbox.y = playerY;

  // Atualiza hitbox do inimigo
  hitBoxEnemy1.x = enemy1X;
  hitBoxEnemy1.y = enemy1Y;

  animateEnemy(); 
  updateEnemyPosition(); 
  checkEnemyCollision(playerHitbox, hitBoxEnemy1);


  drawMushrooms();
  checkMushroomCollision();

  animation();

  const frameX = currentFrame * frameWidth;
  const frameY = 5; 

  
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
  }else if (playerDamage){
    if (currentSprite == 0) {
      desenhaPlayer(playerDamageRight, playerX, playerY, frameWidth, frameHeight, frameX, frameY);
    }else {
      desenhaPlayer(playerDamageLeft, playerX, playerY, frameWidth, frameHeight, frameX, frameY);
    }
  }

  freezeParallax();

  context.fillStyle = "white";  // Cor do texto
  context.font = "9px Arial";  // Tamanho da fonte
  context.fillText("Vida Restante: " + VidaCount, 5, 15);  // Posição e texto

  context.fillStyle = "white";  // Cor do texto
  context.font = "9px Arial";  // Tamanho da fonte
  context.fillText("Cogumelos Coletados: " + mushroomCount, 5, 30);  // Posição e texto

  if(playerY > 250) {
    gameOver();
  }if(enemyColided) {
    gameOver();
    console.log("game over");
  }

  updateCharacterMovement();
  requestAnimationFrame(gameLoop); // Chama o loop novamente
}
