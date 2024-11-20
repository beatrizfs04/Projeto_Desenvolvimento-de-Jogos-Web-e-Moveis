
//player
var player = new Image();
player.src = "img/run_right.png";

var playerBack = new Image();
playerBack.src = "img/run_left.png";

var playerIdleRight = new Image();
playerIdleRight.src = "img/idle_right.png";

var playerIdleLeft = new Image();
playerIdleLeft.src = "img/idle_left.png";

let playerX = 200;
let playerY = 190;


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
  width: frameWidth * 0.42,  //opcional
  height: frameHeight * 0.70 //opcional
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


//não me parece que esteja sendo usada. é definida no keydown
let velPlayer = 0;


//deixar a animção mais devagar
let frameDelayRunning = 5; 
let frameDelayIdle = 10; 
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
block.src = "img/block.png";

let blockX = 480;
let blockY = 180;


//ground
isOnGround = true;
let ground = [{x: 0, y: 229, width: 1000, height:40}];

//plataformas (blocos)

let platforms = [
  { x: 100, y: 150, width: 100, height: 10 },
  { x: 250, y: 100, width: 120, height: 10 },
  { x: 400, y: 200, width: 150, height: 10 },
];

let worldOffsetX = 0; // Deslocamento horizontal do mundo
let isOnPlatform = false;

inicializar();

function inicializar() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  document.addEventListener("keydown", KeyDownMovement);
  document.addEventListener("keyup", KeyUpMovement);

  requestAnimationFrame(gameLoop); // Usar apenas requestAnimationFrame
}

function KeyDownMovement(e) {
  switch (e.which) {
    case 37: //trás
      currentSprite = 1;
      currentSpriteIdle = 1;
      spriteRunning = true;
      velPlayer = -3;
      playerX = Math.max(0, playerX + velPlayer);
      worldOffsetX = Math.max(0, worldOffsetX + velPlayer);
      //------
      moveParallaxRight();
      break;

    case 39: //frente
      currentSprite = 0;
      currentSpriteIdle = 0;
      spriteRunning = true;
      velPlayer = 3;

      if (playerX < canvas.width - frameWidth)
        playerX += velPlayer;
      moveParallaxLeft();
      worldOffsetX += velPlayer;
      break;

    case 38:
      if (!isJumping && (isOnGround || isOnPlatform)) { 
        // Inicia o salto somente se não estiver no ar
        isJumping = true;
        jumpFrameCount = 0; 
        spriteIdle = true;
        isOnGround = false; // Não está mais no chão
        isOnPlatform = false; // Não está mais em uma plataforma
      }
      break;

    default:
      knownKey = false;
      break;
  }
  if(!knownKey){
    spriteRunning = false;
    spriteIdle = true;
  }else{
    spriteIdle = true;
  }
}

function KeyUpMovement(e) {
  spriteIdle = true; // quando solto a tecla animcao volta a ser idle
  spriteRunning = false;
  velPlayer = 0; // parar movimento horizontal
}


function desenhaImagem(imagem, x, y, width, height) {
  context.drawImage(imagem, x, y, width, height);
}

function desenhaPlayer(imagem, x, y, width, height, frameX, frameY) {
  context.drawImage(imagem, frameX, frameY, frameWidth, frameHeight, x, y, width, height);
}

function drawGround(){
  context.fillStyle = "brown";
  ground.forEach(ground => {
    context.fillRect(ground.x, ground.y, ground.width, ground.height);
  });}

function drawPlatforms() {
  context.fillStyle = "brown";
  platforms.forEach(platform => {
    const screenX = platform.x - worldOffsetX; 
    context.fillRect(screenX, platform.y, platform.width, platform.height);
  });
}

// function checkCollision(objeto) {
//   if (
//     playerHitbox.x + playerHitbox.width > objeto.x &&
//     playerHitbox.x < objeto.x + objeto.width &&
//     playerHitbox.y + playerHitbox.height >= objeto.y &&
//     playerHitbox.y + playerHitbox.height <= objeto.y + gravityAction
//   ) {
//     return true; 
//   }
//   return false; 
// }

function checkGroundCollision() {
  ground.forEach(groundElement => {
    if (
      playerHitbox.x + playerHitbox.width > groundElement.x &&
      playerHitbox.x < groundElement.x + groundElement.width &&
      playerHitbox.y + playerHitbox.height >= groundElement.y &&
      playerHitbox.y + playerHitbox.height <= groundElement.y + gravityAction
    ) {
      if (!isJumping) {
        isOnGround = true;
        playerY = groundElement.y - playerHitbox.height; // Ajusta a posição do jogador no chão
        console.log("está no chão");
      }
    }
  });
}


function checkPlatformCollision() {
  let isOnPlatform = false; //faz com que a variável on platform volte a ser falsa 
  //assim, a boneca cai quando sai andando da plataforma
  //entratanto está a entrar em conflito com a gravidade e não permite que ela pule na plataforma,

  platforms.forEach(platform => {
    const screenX = platform.x - worldOffsetX; 

    if (
      playerHitbox.x + playerHitbox.width > screenX &&
      playerHitbox.x < screenX + platform.width &&
      playerHitbox.y + playerHitbox.height >= platform.y &&
      playerHitbox.y + playerHitbox.height <= platform.y + gravityAction 
    ) {
      if (!isJumping) {
        isOnPlatform = true; 
        playerY = platform.y - playerHitbox.height; 
        console.log("está na plataforma");
      }
    }
  });
}

function drawParallax(imagem, x, y, width, height){
  context.drawImage(imagem, x, y, width, height);
  context.drawImage(imagem, x-canvas.width, y, width, height);
  context.drawImage(imagem, x+canvas.width, y, width, height);
}


//função para mover o parallax quando aperto as teclas
function moveParallaxRight() {
  background5X += 0.5;
  background4X += 1;
  background3X += 1.5;
  background2X += 2.5;
  ground1X += 2;

  if (background5X > 424) background5X = 0;
  if (background4X > 424) background4X = 0;
  if (background3X > 424) background3X = 0;
  if (background2X > 424) background2X = 0;
  if (ground1X > 424) ground1X = 0;
}

function moveParallaxLeft() {
  background5X -= 0.5;
  background4X -= 1;
  background3X -= 1.5;
  background2X -= 2.5;
  ground1X -= 2;

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

  if (isJumping) {
    if (jumpFrameCount < jumpDuration) {
      playerY -= jumpPower - (jumpFrameCount * 0.1); 
      jumpFrameCount++;
    } else {
      isJumping = false;
    }
  }
}


function gameLoop() {
  
  context.clearRect(0, 0, canvas.width, canvas.height); 

  frameCount++; 

  //desenha o parallax
  drawParallax(background5, background5X, backgroundY,524, 246);
  drawParallax(background4, background4X, backgroundY,524, 246);
  drawParallax(background3, background3X, backgroundY,524, 246);
  drawParallax(background2, background2X, backgroundY,524, 246);
  drawParallax(ground1, ground1X, 225,424, 30);

  applyGravity();

  drawGround();
  drawPlatforms();


  checkPlatformCollision();
  checkGroundCollision()


  //definindo a hitbox para ficar na posição certa da boneca
  //!problema de quando acerto o y da hitbox, da problema com a colisão da plataforma!
  //a largura e altura são definidas lá em cima (playerHitbox.width, playerHitbox.height)
  let defineHitboxX = playerX + 4;
  let defineHitboxY = playerY + 1; //aqui

  playerHitbox.x = defineHitboxX; 
  playerHitbox.y = defineHitboxY; 

  context.fillStyle = "rgba(255, 0, 0, 0.5)";  
  context.fillRect(playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height);

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

  //define o frame da imagem da animação (divide a imagem)
  const frameX = 5; 
  const frameY = currentFrame * frameHeight; 

  //move os quadrados que detectam a colisão junto com a boneca

  //desenha a bruxinha
  if (spriteRunning) {
    if (currentSprite === 0) {
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

  
  requestAnimationFrame(gameLoop); // Chama o loop novamente
}

