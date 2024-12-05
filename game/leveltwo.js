
let Win = false;

//player
var player = new Image();
player.src = "img2/boy_run_right.png";
diminuicaoX = 100;
diminuicaoY = 115;

var playerBack = new Image();
playerBack.src = "img2/boy_run_left.png";

var playerIdleRight = new Image();
playerIdleRight.src = "img2/boy_idle_right.png";

var playerIdleLeft = new Image();
playerIdleLeft.src = "img2/boy_idle_left.png";

let freezedParallax = false;
let fell = false;

var playerDamageRight = new Image();
playerDamageRight.src = "img2/boy_damage_right.png";

var playerDamageLeft = new Image();
playerDamageLeft.src = "img2/boy_damage_left.png";

let damageTimer = 0;// Temporizador para controlar a duração da sprite de dano
const damageDuration = 200;//

//frames and sprites
const frameWidth = 129;
const frameHeight = 150;

//number of frames tem a ver com a quantidade de imagens da boneca na image original.
const numberOfFrames = 8;
const numberOfFramesIdle = 4;

let currentFrame = 0;
let currentSprite = 0; // 0: right, 1: left
let currentSpriteIdle = 0; // 0: right, 1: left

let spriteRunning = false;
let spriteIdle = true;


//Inimigo
var enemy1 = new Image();
enemy1.src = "img/enemy1new.png";
let enemy1X = 1000;
let enemy1Y = 210;

let frameWidthEnemy1 = 50;
let frameHeightEnemy1 = 20;

const numberOfFramesEnemy1 = 2;
let currentFrameEnemy = 0;

let enemyFrameX = 1;
let enemyFrameY = 1;

let hitBoxEnemy1 = {
	x: enemy1X,
	y: enemy1Y,
	width: frameWidthEnemy1 * 0.1, //opcional
	height: frameHeightEnemy1 * 0.6, //opcional
}

let hitboxFramesEnemy1 = [
  { width: 28, height: 20, offsetX: 11, offsetY: 0 },  // Para o frame 0
  { width: 30, height: 18, offsetX: 8, offsetY: 2},   // Para o frame 1
];

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
let frameDelayRunning = 12; 
let frameDelayIdle = 12; 
let frameCount = 0; 

//deixa a animação do enemy mais devagar
let frameDelayEnemy = 30; 
let frameCountEnemy = 0;


//salto 
let isJumping = false; 
let jumpFrameCount = 0; 
const jumpDuration = 30; 
const jumpPower = 5.5;
const gravityAction = 1.8; 
let gravity = true;

//movimentação + teclado
let knownKey = true;

//blocks
var block = new Image();
block.src = "img/block2.png";

let blockX = 480;
let blockY = 180;

let worldOffsetX = 0; 


//ground
isOnGround = true;
let ground = [
  { x: 520, y: 150, width: 160, height: 150, type: "earth" },
  {x: 0, y: 229, width: 800, height:40, type: "ground"},
  {x: 1000, y: 229, width: 400, height:40, type: "ground"},
  {x: 2300, y: 229, width: 800, height:40, type: "ground"},
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

let Ended = false;
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
  {x: 1950, y: 80, width: 10, height: 10 },
]

//portal
const portal = new Image();
portal.src = "img2/portal_gruta.png";

let portalSegment = {
  x: 2800, 
  y: 140, 
  width: 90, 
  height: 102
}

let portalHitbox = {
  x: portalSegment.x+44, 
  y: portalSegment.y+40, 
  width: portalSegment.width/4, 
  height: portalSegment.height/2
}

const logo = new Image();
logo.src = 'img/logo_game.png';

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
let Finish = false;

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
gameOverSound.loop = false; // Define o volume entre 0 (mudo) e 1 (máximo)
gameOverSound.volume = 0.2; // Define o volume entre 0 (mudo) e 1 (máximo)

inicializar();

function inicializar() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  window.addEventListener('keydown', CharMovement);
  window.addEventListener('keyup', CharStopMovement);
  
  requestAnimationFrame(gameLoop);
}


let playerX = 200; // Centraliza o player
let playerY = 50;


//player hitbox
let playerHitbox = {
  x: playerX ,
  y: playerY ,
  width: (frameWidth - diminuicaoX)*0.75,  //opcional
  height: (frameHeight - diminuicaoY)*0.8 //opcional
};

let worldMovementSpeed = 2;

let updateCharacterMovement = function() {
  if (keysPressed[37]) { // Esquerda
    currentSprite = 1;
    currentSpriteIdle = 1;
    spriteRunning = true;
    velPlayer = -1;
    
    if (canMoveLeft){
      playerX = Math.max(0, playerX + velPlayer);
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

    if (canMoveRight){
      if (playerX < canvas.width - 200) playerX += velPlayer;
      moveParallaxLeft();
      worldOffsetX += velPlayer * worldMovementSpeed;
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
  context.drawImage(imagem, frameX, frameY, frameWidth, frameHeight, x, y, width-diminuicaoX, height-diminuicaoY);
}

function drawPortal(){
  const portalscreenX = portalSegment.x - worldOffsetX; 
  const portalscreenY = portalSegment.y * 0.97; 
  context.fillStyle = "transparent";  
  context.fillRect(portalscreenX, portalSegment.y, portalSegment.width, portalSegment.height);
  let portalImage = portal;
  desenhaImagem(portalImage, portalscreenX, portalscreenY, portalSegment.width, portalSegment.height);
}

function drawHitboxPortal(){
  const portalscreenX = portalHitbox.x - worldOffsetX; 
  context.fillStyle = "transparent";  
  context.fillRect(portalscreenX, portalHitbox.y, portalHitbox.width, portalHitbox.height);
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
  }
  // Atualiza estados de colisão
  isOnGround = onGround; 

}

function checkPortalCollision(){
  const screenX = portalHitbox.x - worldOffsetX; 
  if (
     playerHitbox.x + playerHitbox.width >= screenX
  ) {
    Win = true; 
  }
}

function checkEnemyCollision() {
  const screenX = hitBoxEnemy1.x - worldOffsetX; 

  //colisao horizontal
  const xCollision =
    playerHitbox.x + playerHitbox.width > screenX &&
    playerHitbox.x < screenX + hitBoxEnemy1.width;

  //colisao vertical
  const yCollision =
    playerHitbox.y + playerHitbox.height > hitBoxEnemy1.y &&
    playerHitbox.y < hitBoxEnemy1.y + hitBoxEnemy1.height;

  if (xCollision && yCollision) {
    //verifica se a base do inimigo (player.y + player height)
    //colide (<=) com o meio vertical do inimigo 
    const isKillingEnemy =
      playerHitbox.y + playerHitbox.height <= hitBoxEnemy1.y + hitBoxEnemy1.height / 2;

    if (isKillingEnemy) {
      enemy1Y = enemy1Y + 25; //adicionar aqui uma logística para que o enemy caia pra fora da tela
      return "killed"; 
    } else {
      damageTimer = Date.now(); // Define o início do temporizador
      enemyColided = true;
      //playerDamage = true;
      //return "damage";
    }
  }
  return null;
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
    }

     // Colisão lateral à direita
     if (
      playerHitbox.x + playerHitbox.width >= platformScreenX && // Lado direito do jogador encosta
      playerHitbox.x <= platformScreenX && // Dentro do limite esquerdo da plataforma
      playerHitbox.y + playerHitbox.height > platform.y && // Dentro da altura da plataforma
      playerHitbox.y < platform.y + platform.height && !isOnPlatform// Garante que a colisão lateral não interfira na vertical
    ) {
      isCollidingRight = true;
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

function drawRoundedImage(context, image, x, y, width, height, radius) {
  // Criar o caminho do retângulo arredondado
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.arcTo(x + width, y, x + width, y + radius, radius);
  context.lineTo(x + width, y + height - radius);
  context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  context.lineTo(x + radius, y + height);
  context.arcTo(x, y + height, x, y + height - radius, radius);
  context.lineTo(x, y + radius);
  context.arcTo(x, y, x + radius, y, radius);
  context.closePath();

  // Aplicar o recorte
  context.clip();

  // Desenhar a imagem dentro do recorte
  context.drawImage(image, x, y, width, height);
}

function gameLoop() {
  checkGroundCollision();
  checkPlatformCollision();  

  frameCount++; 
  //desenha o parallax
  drawParallax(background5, background5X, backgroundY,424, 246);
  drawParallax(background4, background4X, backgroundY,424, 246);
  drawParallax(background3, background3X, backgroundY,424, 246);
  drawParallax(background2, background2X, backgroundY,424, 246);

  applyGravity();
  applyGravityJump();
  
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
  checkEnemyCollision();


  drawMushrooms();
  checkMushroomCollision();

  drawPortal();
  checkPortalCollision();

  drawHitboxPortal();
  animation();

  const frameX = currentFrame * frameWidth; 
  const frameY = 4; 

  //desenha a bruxinha
  if (playerDamage) {
    // Verifica se o tempo do dano acabou
    if (Date.now() - damageTimer > damageDuration) {
      playerDamage = false; // Sai do estado de dano
    }
  
    // Renderiza a sprite de dano
    if (currentSprite == 0) {
      desenhaPlayer(playerDamageRight, playerX, playerY, frameWidth, frameHeight, frameX, frameY);
    } else {
      desenhaPlayer(playerDamageLeft, playerX, playerY, frameWidth, frameHeight, frameX, frameY);
    }
  } else {
    // Renderiza os outros estados do jogador
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
  }
  

  freezeParallax();

  context.fillStyle = "white";  
  drawRoundedRect(context, 5, 5, 120, 23, 10);

  context.fillStyle = "black";  // Cor do texto
  context.font = "9px Arial";  // Tamanho da fonte
  context.fillText("Cogumelos Coletados: " + mushroomCount, 15, 20);  // Posição e texto

  if(playerY > 250 || enemyColided){
    context.fillStyle = "white";
    drawRoundedRect(context, 130, 45, 175, 180, 15);
    
    context.fillStyle = "red";  
    context.font = "20px Arial";  
    context.fillText("Game Over!", 160, (canvas.height / 2) + 55); 

    // Desenhar botão
    const buttonX = canvas.width / 2 - 70; // Posição X
    const buttonY = (canvas.height / 2) + 70;  // Posição Y
    const buttonWidth = 150;
    const buttonHeight = 20;
    const borderRadius = 10; // Raio das bordas

    // Configura cor do botão
    context.fillStyle = "green";
    drawRoundedRect(context, buttonX, buttonY, buttonWidth, buttonHeight, borderRadius);

    // Adiciona texto no botão
    context.fillStyle = "white";
    context.font = "10px Arial";
    context.fillText("Tentar Novamente!", buttonX + 35, buttonY + 13);

    drawRoundedImage(context, logo, 135, 50, 165, 100, 15);

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

    if(Ended){
      return;
    } else {
      backgroundMusic.pause();
      gameOverSound.play();
      Ended = true;
    }
  }

  if(Win){
    context.fillStyle = "white";
    drawRoundedRect(context, 130, 45, 175, 180, 15);
    
    context.fillStyle = "green";  
    context.font = "20px Arial";  
    context.fillText("Game Win!", 170, (canvas.height / 2) + 55); 

    // Desenhar botão
    const buttonX = canvas.width / 2 - 70; // Posição X
    const buttonY = (canvas.height / 2) + 70;  // Posição Y
    const buttonWidth = 150;
    const buttonHeight = 20;
    const borderRadius = 10; // Raio das bordas

    // Configura cor do botão
    context.fillStyle = "green";
    drawRoundedRect(context, buttonX, buttonY, buttonWidth, buttonHeight, borderRadius);

    // Adiciona texto no botão
    context.fillStyle = "white";
    context.font = "10px Arial";
    context.fillText("Next Level!", buttonX + 50, buttonY + 13);

    drawRoundedImage(context, logo, 135, 50, 165, 100, 15);

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
        window.location.href = "home.html";
      }
    }

    if(Finish){
      return;
    } else {
      backgroundMusic.pause();
      gameOverSound.play(); //Mudar para gameWinSound.play();
      Finish = true;
    }
  }

  updateCharacterMovement();
  requestAnimationFrame(gameLoop); // Chama o loop novamente
}

