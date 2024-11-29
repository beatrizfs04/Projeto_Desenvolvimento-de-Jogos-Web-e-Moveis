
//player
var player = new Image();
player.src = "img/run_right.png";

var playerBack = new Image();
playerBack.src = "img/run_left.png";

var playerIdleRight = new Image();
playerIdleRight.src = "img/idle_right.png";

var playerIdleLeft = new Image();
playerIdleLeft.src = "img/idle_left.png";

let playerX = 28;
let playerY = 190;

let freezedParallax = false;
let fell = false;


//frames and sprites
const frameWidth = 30;
const frameHeight = 48;
    //number of frames tem a ver com a quantidade de imagens da boneca na image original.
const numberOfFrames = 8;
const numberOfFramesIdle = 6;

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

const highGround = new Image();
highGround.src = "img/ground.png";

//não me parece que esteja sendo usada. é definida no keydown
let velPlayer = 0;


//deixar a animção mais devagar
let frameDelayRunning = 15; 
let frameDelayIdle = 15; 
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
block.src = "img/block2.png";

let blockX = 480;
let blockY = 180;


//ground
isOnGround = true;

let ground = [
  {x: 0, y: 229, width: 250, height:40, size: 0},
  {x: 270, y: 229, width: 300, height:40, size: 0},
  {x: 500, y: 200, width: 50, height:70, size: 0},
  {x: 700, y: 200, width: 100, height:80, size: 0},
];

//plataformas (blocos)

let platforms = [
  { x: 250, y: 189, width: 45, height: 20 },
  { x: 100, y: 170, width: 45, height: 20 }
];
let isOnPlatform = false;
let isCollidingRight = false;
let isCollidingLeft = false;
let isCollidingBottom = false;0


// deslocamento horizontal do mundo
let worldOffsetX = 0; 

//
const mushroom = new Image();
mushroom.src = "img/mushroom.png";

//pontuação
mushroomCount = 0;

let mushrooms = [
  { x: 300, y: 215, width: 10, height: 10 },
  { x: 350, y: 215, width: 10, height: 10 }
]

let keysPressed = {};

let CharMovement = function(e) {
  keysPressed[e.keyCode] = true;
};

let CharStopMovement = function(e) {
  keysPressed[e.keyCode] = false;
};

let collidePlatformX = false;
inicializar();

function inicializar() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  //document.addEventListener("keydown", KeyDownMovement);
  //document.addEventListener("keyup", KeyUpMovement);
  window.addEventListener('keydown', CharMovement);
  window.addEventListener('keyup', CharStopMovement);

  requestAnimationFrame(gameLoop); // Usar apenas requestAnimationFrame
}

let updateCharacterMovement = function() {
  if (keysPressed[37]) { //pra trás
    currentSprite = 1;
    currentSpriteIdle = 1;
    spriteRunning = true;
    velPlayer = -2;
    if (canMoveLeft){
      playerX = Math.max(0, playerX + velPlayer);
      worldOffsetX = Math.max(0, worldOffsetX + velPlayer);
      moveParallaxRight();
    }
    //------
  }
  if (keysPressed[39]) { //pra frente
    currentSprite = 0;
    currentSpriteIdle = 0;
    spriteRunning = true;
    velPlayer = 2;
    if (canMoveRight){
      if (playerX < canvas.width - frameWidth) playerX += velPlayer;
      moveParallaxLeft();
      worldOffsetX += velPlayer;
    }
    
  }
  if (keysPressed[38]) {
    if (!isJumping && (isOnGround || isOnPlatform)) { 
      // Inicia o salto somente se não estiver no ar
      isJumping = true;
      jumpFrameCount = 0; 
      spriteIdle = true;
      isOnGround = false; 
      isOnPlatform = false;
    }
  }
  if(!keysPressed[37] && !keysPressed[39]){
    spriteIdle = true; // quando solto a tecla animcao volta a ser idle
    spriteRunning = false;
    velPlayer = 0; // parar movimento horizontal
  }
  if(keysPressed[37] && keysPressed[39]){
    //adicionar tratamento para que o parallax não se mexa.
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

function drawGround() {
  for (let i = 0; i < ground.length; i++) {
    const groundSegment = ground[i];
    const screenX = groundSegment.x - worldOffsetX; // Ajusta a posição no eixo X
    if (groundSegment.size === 0) {
      context.fillStyle = "blue";  
    } 
    else if (groundSegment.size === 1) {
      context.fillStyle = "red";  
    }

    context.fillRect(screenX, groundSegment.y, groundSegment.width, groundSegment.height);

  }
}


function drawPlatforms() {
  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    const screenX = platform.x - worldOffsetX; 
    desenhaImagem(block, screenX, platform.y, platform.width, platform.height); 
  }
}

//  function drawHighGrounds() {
//    for (let i = 0; i < highGrounds.length; i++) {
//      const highGround = highGrounds[i];
//      const screenX = highGround.x - worldOffsetX; 
//      desenhaImagem(ground, screenX, highGround.y, highGround.width, highGround.height); 
//    }
//  }

function drawMushrooms() {
  for (let i = 0; i < mushrooms.length; i++) {
    const mushroomObj = mushrooms[i];  // nome da variável na lista de cogumelos
    const screenX = mushroomObj.x - worldOffsetX;
    desenhaImagem(mushroom, screenX, mushroomObj.y, mushroomObj.width, mushroomObj.height);
  }
}

//nao funciona se pressiona primeiro na plataforma(falta ajustar)
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

  for (let i = 0; i < ground.length; i++) { 
    let groundElement = ground[i];   
    const screenX = groundElement.x - worldOffsetX;

    if (
      playerHitbox.x + playerHitbox.width > screenX &&
      playerHitbox.x < screenX + groundElement.width &&
      playerHitbox.y + playerHitbox.height >= groundElement.y &&
      playerHitbox.y + playerHitbox.height <= groundElement.y + gravityAction
    ) {
      if (!isJumping) {
        onGround = true; 
        break; 
      }
    }
  }

  isOnGround = onGround; 

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

function checkFall(){
  if(playerY > 250){
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
  if (freezeParallax) return; 

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
  checkFall();
  if (fell) {
    context.fillStyle = "red";  
    context.font = "30px Arial";  
    context.fillText("You Lost!", canvas.width / 2 - 60, canvas.height / 1.8); 
    return;
  }
  
  context.clearRect(0, 0, canvas.width, canvas.height); 

  frameCount++; 

  //desenha o parallax
  drawParallax(background5, background5X, backgroundY,524, 246);
  drawParallax(background4, background4X, backgroundY,524, 246);
  drawParallax(background3, background3X, backgroundY,524, 246);
  drawParallax(background2, background2X, backgroundY,524, 246);
  drawParallax(ground1, ground1X, 225,424, 30);

  applyGravity();
  applyGravityJump();
  
  drawGround();
  drawPlatforms();
  //drawHighGrounds();
  
  //desenhaImagem(mushroom, 250, 200, 10,10);

  //console.log("Chão: " + isOnGround); 
  //console.log("Plataforma: " + isOnPlatform); 

  
  //definindo a hitbox para ficar na posição certa da boneca
  //a largura e altura são definidas lá em cima (playerHitbox.width, playerHitbox.height)
  let defineHitboxX = playerX + 4;
  let defineHitboxY = playerY + 2; //aqui

  playerHitbox.x = defineHitboxX; 
  playerHitbox.y = defineHitboxY; 
  //console.log(playerX);
  console.log(playerY);

  // console.log(`Player X: ${playerX}, Player Y: ${playerY}`);
  // console.log(`Hitbox X: ${defineHitboxX}, Hitbox Y: ${defineHitboxY}`);


  context.fillStyle = "rgba(255, 0, 0, 0.5)";  
  context.fillRect(playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height);

  
  checkGroundCollision();
  checkPlatformCollision();

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
  console.log(freezedParallax);


  context.fillStyle = "white";  // Cor do texto
  context.font = "9px Arial";  // Tamanho da fonte
  context.fillText("Cogumelos Coletados: " + mushroomCount, 5, 30);  // Posição e texto

  
  updateCharacterMovement();
  requestAnimationFrame(gameLoop); // Chama o loop novamente
}

