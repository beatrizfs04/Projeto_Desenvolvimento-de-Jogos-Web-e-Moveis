let Win = false;

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

var playerDamageRight = new Image();
playerDamageRight.src = "img/damageright.png";

var playerDamageLeft = new Image();
playerDamageLeft.src = "img/damageleft.png";

let playerTookDamage = false;
var lifeBar = 10;

//frames and sprites
const frameWidth = 30;
const frameHeight = 48;
const numberOfFrames = 5;
const numberOfFramesIdle = 5;
const numberOfFramesDamage = 2;
let currentFrame = 0;
let currentSprite = 0; 
let currentSpriteIdle = 0;
let spriteRunning = false;
let spriteIdle = true;

//Inimigo
var enemy1 = new Image();
enemy1.src = "img/enemy1new.png";
let enemy1X = 1000;
let enemy1Y = 210;

var enemy2 = new Image();
enemy2.src = "img2/enemy2.png";

//inimigo death 
var enemy1Death = new Image();
enemy1Death.src = "img/enemy1death.png";

let frameWidthEnemy1 = 50;
let frameHeightEnemy1 = 20;
const numberOfFramesEnemy1 = 2;
let currentFrameEnemy = 0;
let enemyFrameX = 1;
let enemyFrameY = 1;

let hitBoxEnemy1 = {
	x: enemy1X,
	y: enemy1Y,
	width: frameWidthEnemy1 * 0.1, 
	height: frameHeightEnemy1 * 0.6, 
}

let hitboxFramesEnemy1 = [
  { width: 28, height: 20, offsetX: 11, offsetY: 0 },  
  { width: 30, height: 18, offsetX: 8, offsetY: 2},   
];

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

let velPlayer = 0;


// delay animação 
let frameDelayRunning = 18; 
let frameDelayIdle = 18; 
let frameDelayDamage = 12;
let frameCount = 0; 
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
  { x: 3000, y: 180, width: 160, height: 150, type: "earth" },
  {x: 2300, y: 229, width: 2200, height:40, type: "ground"},
];


//plataformas (blocos)
let platforms = [
  {x: 280, y: 189, width: 45, height: 20, type: "block" },
  {x: 395, y: 170, width: 45, height: 20, type: "block" },
  {x: 800, y: 150, width: 100, height: 150, type: "earth"},
  {x: 900, y: 200, width: 100, height:80, type: "earth"},
  {x: 1400, y: 200, width: 50, height:80, type: "earth"},
  {x: 1500, y: 150, width: 100, height:120, type: "earth"}, 
  {x: 1700, y: 150, width: 100, height:120, type: "earth"},
  {x: 1880, y: 130, width: 45, height:20, type: "block"},
  {x: 2000, y: 110, width: 45, height:20, type: "block"},
  {x: 2100, y: 150, width: 100, height:120, type: "earth"},
  {x: 2260, y: 95, width: 45, height:20, type: "block"},
  {x: 2200, y: 200, width: 100, height:120, type: "earth"},
  {x: 2500, y: 200, width: 100, height:120, type: "earth"},
  {x: 3700, y: 130, width: 100, height:120, type: "earth"},
  {x: 3530, y: 190, width: 45, height: 20, type: "block" },
  {x: 3620, y: 160, width: 45, height: 20, type: "block" },
];

let Ended = false;
let isOnPlatform = false;
let isCollidingRight = false;
let isCollidingLeft = false;
let isCollidingBottom = false;
let platformImage;

//heart 
const heartImage = new Image();
heartImage.src = "img/heart.png";

//mushroom
const mushroomYellow = new Image();
mushroomYellow.src = "img/mushroom1.png";

const mushroomPurple = new Image();
mushroomPurple.src = "img/mushroom2.png";

let mushrooms = [
  { x: 740,  y: 80, width: 10, height: 10, type:"yellow" },
  { x: 1645, y: 90, width: 10, height: 10, type:"yellow"  },
  { x: 1950, y: 80, width: 10, height: 10, type:"yellow"  },
  { x: 1050, y: 140, width: 10, height: 10, type:"yellow"  },
  { x: 2400, y: 80, width: 10, height: 10, type:"purple"  },
];

//portal
const portal = new Image();
portal.src = "img/portal_floresta.png";

let portalSegment = {
  x: 4100, 
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

// logo
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

let isDamaged = false;

//dano 
let playerDamage = false;
let enemy1Damage = false;
let enemyColided = false;
let Finish = false;

// Som e Música de fundo
var backgroundMusic = new Audio("audio/main.mp3");
backgroundMusic.loop = true; 
backgroundMusic.volume = 0.2; 
var walkingSound = new Audio("audio/walk.mp3");
walkingSound.volume = 0.2; 

var jumpSound = new Audio("audio/jump.mp3"); 
jumpSound.volume = 0.2; 

var gameOverSound = new Audio("audio/gameover.mp3");
gameOverSound.volume = 0.2; 

var gameWinSound = new Audio("audio/gamewin.mp3");
gameWinSound.volume = 0.7; 

var damageSound = new Audio("audio/damage.mp3");
damageSound.volume = 0.2; 

var slimeDeath = new Audio("audio/slimedeath.mp3");
slimeDeath.volume = 0.2;

var howToPlay = new Image();
howToPlay.src = "img/howtoplay.png"

showHowToPlay = true;

inicializar();

function inicializar() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  window.addEventListener('keydown', CharMovement);
  window.addEventListener('keyup', CharStopMovement);
  
  requestAnimationFrame(gameLoop);
}

// centraliza
let playerX = 200; 
let playerY = 180;


// player hitbox
let playerHitbox = {
  x: playerX ,
  y: playerY ,
  width: frameWidth * 0.4,  
  height: frameHeight * 0.8 
};

let enemies = [
  {
    image: new Image(),
    id: "slime",
    x: 1000,
    y: 210,
    frameWidth: 50,
    frameHeight: 20,
    numberOfFrames: 2,
    currentFrame: 0,
    frameCount: 0,
    frameDelay: 20, 
    direction: 1,
    limits: { left: 998, right: 1360 }, 
    hitboxFrames: [
      { width: 28, height: 20, offsetX: 11, offsetY: 0 },
      { width: 30, height: 18, offsetX: 8, offsetY: 2 },
    ],
    alive: true,
    currentFrameDeath: 0, 
    deathFrameCount: 0, 
  }, 
  {
    image: new Image(),
    id: "slime",
    x: 498,
    y: 130,
    frameWidth: 50,
    frameHeight: 20,
    numberOfFrames: 2,
    currentFrame: 0,
    frameCount: 0,
    frameDelay: 20,
    direction: 1,
    limits: { left: 498, right: 648 },
    hitboxFrames: [
      { width: 28, height: 20, offsetX: 11, offsetY: 0 },
      { width: 30, height: 18, offsetX: 8, offsetY: 2 },
    ],
    alive: true, 
    currentFrameDeath: 0, 
    deathFrameCount: 0, 
  },
  {
    image: new Image(),
    id: "slime",
    x: 2600.5,
    y: 210,
    frameWidth: 50,
    frameHeight: 20,
    numberOfFrames: 2,
    currentFrame: 0,
    frameCount: 0,
    frameDelay: 20,
    direction: -1,
    limits: { left: 2600, right: 3450 },
    hitboxFrames: [
      { width: 28, height: 20, offsetX: 11, offsetY: 0 }, 
      { width: 30, height: 18, offsetX: 8, offsetY: 2 },
    ],
    alive: true,
    currentFrameDeath: 0, 
    deathFrameCount: 0, 
  },
  {
    image: new Image(),
    id: "slime",
    x: 3065,
    y: 210,
    frameWidth: 50,
    frameHeight: 20,
    numberOfFrames: 2,
    currentFrame: 0,
    frameCount: 0,
    frameDelay: 20,
    direction: -1,
    limits: { left: 2600, right: 3450 },
    hitboxFrames: [
      { width: 28, height: 20, offsetX: 11, offsetY: 0 }, 
      { width: 30, height: 18, offsetX: 8, offsetY: 2 },
    ],
    alive: true,
    currentFrameDeath: 0,
    deathFrameCount: 0,
  },
  {
    image: new Image(),
    id: "slime",
    x: 3297.5,
    y: 210,
    frameWidth: 50,
    frameHeight: 20,
    numberOfFrames: 2,
    currentFrame: 0,
    frameCount: 0,
    frameDelay: 20,
    direction: -1,
    limits: { left: 2600, right: 3450 },
    hitboxFrames: [
      { width: 28, height: 20, offsetX: 11, offsetY: 0 }, 
      { width: 30, height: 18, offsetX: 8, offsetY: 2 },
    ],
    alive: true, 
    currentFrameDeath: 0, 
    deathFrameCount: 0, 
  },
  {
    image: new Image(),
    id: "slime",
    x: 3530,
    y: 210,
    frameWidth: 50,
    frameHeight: 20,
    numberOfFrames: 2,
    currentFrame: 0,
    frameCount: 0,
    frameDelay: 20,
    direction: -1,
    limits: { left: 2600, right: 3450 },
    hitboxFrames: [
      { width: 28, height: 20, offsetX: 11, offsetY: 0 }, 
      { width: 30, height: 18, offsetX: 8, offsetY: 2 },
    ],
    alive: true,
    currentFrameDeath: 0, 
    deathFrameCount: 0, 
  },
];

enemies[0].image.src = "img/enemy1new.png";
enemies[1].image.src = "img/enemy1new.png";
enemies[2].image.src = "img/enemy1new.png";
enemies[3].image.src = "img/enemy1new.png";
enemies[4].image.src = "img/enemy1new.png";
enemies[5].image.src = "img/enemy1new.png";


//animação de morte
const deathAnimationConfig = {
  image: new Image(), 
  frameWidth: 50, 
  frameHeight: 17,
  numberOfFrames: 4,
  frameDelay: 10,
};

deathAnimationConfig.image.src = "img/enemy1death.png"; 


  
let worldMovementSpeed = 2;

let updateCharacterMovement = function() {
  // Esquerda
  if (keysPressed[37]) { 
    currentSprite = 1;
    currentSpriteIdle = 1;
    spriteRunning = true;
    velPlayer = -1;
    backgroundMusic.play(); 
    if (canMoveLeft){
      if (playerX > 200) playerX += velPlayer; 
      
      if (worldOffsetX > 0) {
        worldOffsetX = Math.max(0, worldOffsetX + velPlayer * worldMovementSpeed);
        moveParallaxRight();
      }
      
      if (isOnGround || isOnPlatform) {
        walkingSound.play(); 
      }
    }
  }
  // Direita
  if (keysPressed[39]) { 
    currentSprite = 0;
    currentSpriteIdle = 0;
    spriteRunning = true;
    velPlayer = 1;
    backgroundMusic.play(); 
    if (canMoveRight){
      if (playerX < canvas.width - 200) playerX += velPlayer;
      moveParallaxLeft();
      worldOffsetX += velPlayer * worldMovementSpeed;
      if (isOnGround || isOnPlatform){
        walkingSound.play(); 
      }
    }
  }
  //salto
  if (keysPressed[38]) { 
    if (!isJumping && (isOnGround || isOnPlatform)) { 
      isJumping = true;
      jumpFrameCount = 0; 
      spriteIdle = true;
      isOnGround = false; 
      isOnPlatform = false;
      jumpSound.play(); 

    }
  }
  if (keysPressed[37] && keysPressed[39]) { 
    velPlayer = 0; 
  }
  if(keysPressed[81]){
    if(isPower){
      throwPower();
    }
  }
};


function freezeParallax(){
  if(playerX < 6){
    freezedParallax = true;
  }
}


function drawHowToPlay() {
  if (showHowToPlay) {
      context.drawImage(howToPlay, 0, 0, canvas.width, canvas.height); 
  }
}

document.addEventListener('keydown', function () {
  if (showHowToPlay) {
      showHowToPlay = false; 
  }
});


function desenhaImagem(imagem, x, y, width, height) {
  context.drawImage(imagem, x, y, width, height);
}

function desenhaPlayer(imagem, x, y, width, height, frameX, frameY) {
  context.drawImage(imagem, frameX, frameY, frameWidth, frameHeight, x, y, width, height);
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

function drawEnemies() {
  for (let enemy of enemies) {
    let currentHitbox = enemy.hitboxFrames[enemy.currentFrame]; 

    if (enemy.alive == true){
      var hitBoxEnemy = {
        x: enemy.x + currentHitbox.offsetX,
        y: enemy.y + currentHitbox.offsetY,
        width: currentHitbox.width,
        height: currentHitbox.height,
      };
      context.fillStyle = "transparent";
      context.fillRect(hitBoxEnemy.x - worldOffsetX, hitBoxEnemy.y, hitBoxEnemy.width, hitBoxEnemy.height);

    }
    
    if (enemy.id === "spider") {
      const lineX = (enemy.x + enemy.frameWidth / 3.5) - worldOffsetX;
      context.fillStyle = "black"; 
      context.fillRect(lineX, 0, 2, enemy.limits.right + 12); 
    }

    if (enemy.alive) {
      let frameX = enemy.currentFrame * enemy.frameWidth;
      context.drawImage(
        enemy.image,
        frameX,
        0,
        enemy.frameWidth,
        enemy.frameHeight,
        enemy.x - worldOffsetX,
        enemy.y,
        enemy.frameWidth,
        enemy.frameHeight
      );
    } else if (enemy.id === "slime") { 
      let frameX = enemy.currentFrameDeath * deathAnimationConfig.frameWidth;
      context.drawImage(
        deathAnimationConfig.image,
        frameX,
        -4, 
        deathAnimationConfig.frameWidth,
        deathAnimationConfig.frameHeight,
        enemy.x - worldOffsetX,
        enemy.y,
        deathAnimationConfig.frameWidth,
        deathAnimationConfig.frameHeight
      );

      enemy.deathFrameCount++;
      if (enemy.deathFrameCount >= deathAnimationConfig.frameDelay) {
        enemy.currentFrameDeath++;
        enemy.deathFrameCount = 0;

        if (enemy.currentFrameDeath >= deathAnimationConfig.numberOfFrames) {
          enemies.splice(enemies.indexOf(enemy), 1);
        }
      }
    }
  }
}

function drawGround() {
  for (let i = 0; i < ground.length; i++) {
    const groundSegment = ground[i];
    const screenX = groundSegment.x - worldOffsetX; 
    const screenY = groundSegment.y * 0.97; 
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
    const mushroomObj = mushrooms[i];  
    const screenX = mushroomObj.x - worldOffsetX;
    if(mushroomObj.type == "yellow"){
      desenhaImagem(mushroomYellow, screenX, mushroomObj.y, mushroomObj.width, mushroomObj.height);
    }else{
      desenhaImagem(mushroomPurple, screenX, mushroomObj.y, mushroomObj.width, mushroomObj.height);
    }
  }
}

let isPower = false;

function checkMushroomCollision() {
  for (let i = 0; i < mushrooms.length; i++) {
    const mushroomObj = mushrooms[i];
    const screenX = mushroomObj.x - worldOffsetX; 
    
    if (
      playerHitbox.x + playerHitbox.width > screenX && 
      playerHitbox.x < screenX + mushroomObj.width && 
      playerHitbox.y + playerHitbox.height > mushroomObj.y && 
      playerHitbox.y < mushroomObj.y + mushroomObj.height 
    ) {
      if(mushroomObj.type == "yellow"){
      mushrooms.splice(i, 1); 
      i--; 
      mushroomCount += 1; 
      }else{
        isPower = true;
        managePower();
        mushrooms.splice(i, 1); 
        i--;
      }
    }
  }
}

function checkGroundCollision() {
  let onGround = false; 

  for (let i = 0; i < ground.length; i++) { 
    let groundElement = ground[i];   
    const groundScreenX = groundElement.x - worldOffsetX;

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
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];


    if (!enemy.alive) {
      continue; 
    }

    const enemyScreenX = enemy.x - worldOffsetX;

    const currentHitbox = enemy.hitboxFrames[enemy.currentFrame];
    const enemyHitbox = {
      x: enemyScreenX + currentHitbox.offsetX,
      y: enemy.y + currentHitbox.offsetY,
      width: currentHitbox.width,
      height: currentHitbox.height,
    };

    const xCollision =
      playerHitbox.x + playerHitbox.width > enemyHitbox.x &&
      playerHitbox.x < enemyHitbox.x + enemyHitbox.width;

    const yCollision =
      playerHitbox.y + playerHitbox.height > enemyHitbox.y &&
      playerHitbox.y < enemyHitbox.y + enemyHitbox.height;

    if (xCollision && yCollision && !playerTookDamage) {
      const isKillingEnemy =
        playerHitbox.y + playerHitbox.height <=
        enemyHitbox.y + enemyHitbox.height / 2;
      if (isKillingEnemy && !isDamaged) {
          if(enemy.id == "slime"){
            slimeDeath.play();
          }
          enemy.alive = false;
        return "killed";
      } else {
        enemyColided = true;
        playerTookDamage = true;
        return "damage"; 
      }
    }
  }
  return null; 
}

function checkPlatformCollision() {
  isOnPlatform = false; 
  let isCollidingLeft = false; 
  let isCollidingRight = false;

  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    const platformScreenX = platform.x - worldOffsetX; 

    if (
      playerHitbox.x + playerHitbox.width > platformScreenX && 
      playerHitbox.x < platformScreenX + platform.width &&
      playerHitbox.y + playerHitbox.height >= platform.y && 
      playerHitbox.y + playerHitbox.height <= platform.y + gravityAction 
    ) {
      isOnPlatform = true; 
    }

    if (
      playerHitbox.x <= platformScreenX + platform.width && 
      playerHitbox.x + playerHitbox.width > platformScreenX + platform.width && // Dentro do limite direito da plataforma
      playerHitbox.y + playerHitbox.height > platform.y && 
      playerHitbox.y < platform.y + platform.height && !isOnPlatform 
    ) {
      isCollidingLeft = true;
    }

     if (
      playerHitbox.x + playerHitbox.width >= platformScreenX && 
      playerHitbox.x <= platformScreenX && 
      playerHitbox.y + playerHitbox.height > platform.y && 
      playerHitbox.y < platform.y + platform.height && !isOnPlatform
    ) {
      isCollidingRight = true;
    }

  }

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

function animateEnemies() {
  for (let enemy of enemies) {
    enemy.frameCount++;

    if (enemy.frameCount >= enemy.frameDelay) {
      enemy.currentFrame = (enemy.currentFrame + 1) % enemy.numberOfFrames;
      enemy.frameCount = 0;
    }
  }
}

function updateEnemiesPosition() {
  for (let enemy of enemies) {
    if(enemy.id == "slime"){
      if(enemy.alive == true){
        enemy.x += 1 * enemy.direction; 

        if (enemy.x >= enemy.limits.right) {
          enemy.direction = -1; 
        }
        if (enemy.x <= enemy.limits.left) {
          enemy.direction = 1; 
        }
      }
  }else { 
    enemy.y += 1 * enemy.direction; 

    if (enemy.y >= enemy.limits.right) { 
      enemy.direction = -1; 
    }
    if (enemy.y <= enemy.limits.left) { 
      enemy.direction = 1; 
    }
  } 
  }
}

function animation(){
   if (isDamaged) {
    if (frameCount >= frameDelayDamage) {
      currentFrame = (currentFrame + 1) % numberOfFramesDamage; 
      frameCount = 0; 
    }
  }
   else if (spriteRunning) {
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

const damageAmount = 5;       
let damageFlag = false;

function checkPlayerDamage() {
  if (playerTookDamage && !damageFlag) {
    lifeBar -= damageAmount; 
    isDamaged = true; 
    damageFlag = true; 
    resetDamageFlag();
  }
}

function resetDamageFlag(){
  setTimeout(() => {
    damageFlag = false;
    isDamaged = false;
  }, 1000); 
}

setInterval(() => {
  if (playerTookDamage === true) { 
    playerTookDamage = false;
    checkPlayerDamage();
  }
}, 500); 

function damageSoundTime(){
  while(isDamaged){
    damageSound.play(); 
    damageSound.loop = true; 
    damageSound.loop = true; 
  }
}

function drawRoundedRect(context, x, y, width, height, radius) {
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
  context.fill(); 
}

function drawRoundedImage(context, image, x, y, width, height, radius) {
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

  context.clip();

  context.drawImage(image, x, y, width, height);
}

let powers = []; 
let powerFlag = true;
let direction; 


function throwPower() {
  if (powerFlag){
    if (currentSprite == 0){
      direction = 1;
    }else{
      direction = -1;
    }

    powers.push({
      x: (playerX + frameWidth/2), 
      y: (playerY + frameHeight/2), 
      width: 10, 
      height: 10, 
      speed: 5, 
      direction: 1, 
    });

    powerFlag = false;

    setTimeout(() => {
      powerFlag = true;
    }, 500);
  }
 
}

function updatePowers() {
  for (let i = powers.length - 1; i >= 0; i--) {
    let power = powers[i];

    power.x += power.speed * direction; 
    if (power.x > canvas.width || power.x < 0) {
      powers.splice(i, 1);
      continue;
    }

    for (let j = enemies.length - 1; j >= 0; j--) {
      let enemy = enemies[j];
      const currentHitbox = enemy.hitboxFrames[enemy.currentFrame];
      const enemyScreenX = enemy.x - worldOffsetX;

      const enemyHitbox = {
        x: enemyScreenX + currentHitbox.offsetX,
        y: enemy.y + currentHitbox.offsetY,
        width: currentHitbox.width,
        height: currentHitbox.height,
      };

      const xCollision =
        power.x + power.width > enemyHitbox.x &&
        power.x < enemyHitbox.x + enemyHitbox.width;

      const yCollision =
        power.y + power.height > enemyHitbox.y &&
        power.y < enemyHitbox.y + enemyHitbox.height;

      if (xCollision && yCollision) {
          console.log("poder matou o inimigo");
          enemies.splice(j, 1);
          enemy.alive = false;
          powers.splice(i, 1);
          if(enemy.id == "slime"){
            slimeDeath.play();
          }
        break;
      }
    }
  }
}

function drawPowers() {
  context.fillStyle = "pink";  
  for (let power of powers) {
    context.beginPath();
    context.arc(power.x, power.y, power.width / 2, 0, Math.PI * 2); 
    context.fill();  
    context.closePath();
  }
}

function managePower() {
  isPower = true; 
  powerTimer = 10; 
  console.log("Power activated!");
}

let powerTimer = 10;

function timerPower(){
  if (isPower && powerTimer > 0) {
    powerTimer -= 1 / 60; 
    if (powerTimer <= 0) {
      powerTimer = 0;
      isPower = false; 
      console.log("Power deactivated!");
    }
  }
}




function drawGameInfo() {
  let numHearts = 0;
  if (lifeBar === 10) {
    numHearts = 2;
  } else if (lifeBar === 5) {
    numHearts = 1; 
  }

  for (let i = 0; i < numHearts; i++) {
    context.drawImage(heartImage, ((canvas.width/2)-10) + (i * (20)), 10, 15, 15);
  }

  timerPower();

  context.fillStyle = "white"; 
  context.font = "13px Arial"; 
  context.fillText("= " + mushroomCount, 30, 21); 
  context.drawImage(mushroomYellow, 10, 10, 15, 15); 

  context.drawImage(mushroomPurple, canvas.width - 60, 10, 15, 15); 

  if (isPower) {
    context.fillStyle = "pink";
    context.font = "13px Arial"; 
    context.fillText( + powerTimer.toFixed(1) + "s", canvas.width - 40, 22); 
  }
}


function gameLoop() {
  if (showHowToPlay) {
    drawParallax(background5, background5X, backgroundY,424, 246);
    drawParallax(background4, background4X, backgroundY,424, 246);
    drawParallax(background3, background3X, backgroundY,424, 246);
    drawParallax(background2, background2X, backgroundY,424, 246);
    drawGround();
    drawHowToPlay(); 

    requestAnimationFrame(gameLoop); 
    return; 
  }

  checkGroundCollision();
  checkPlatformCollision();  

  frameCount++; 
  drawParallax(background5, background5X, backgroundY,424, 246);
  drawParallax(background4, background4X, backgroundY,424, 246);
  drawParallax(background3, background3X, backgroundY,424, 246);
  drawParallax(background2, background2X, backgroundY,424, 246);

  applyGravity();
  applyGravityJump();
  
  drawGround();
  drawPlatforms();
  
  defineHitboxX = playerX + 4;
  defineHitboxY = playerY + 2;
  playerHitbox.x = defineHitboxX; 
  playerHitbox.y = defineHitboxY; 

  if (isPower) {
    context.save();
    
    context.filter = "blur(4px)";
    
    context.fillStyle = "rgba(255, 105, 180, 0.5)"; 
    context.fillRect(playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height);
    
    context.restore();
  } else {
    context.fillStyle = "transparent";  
    context.fillRect(playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height);
  }
  

  playerHitbox.x = playerX;
  playerHitbox.y = playerY;

  updatePowers();

  updateEnemiesPosition();
  animateEnemies();
  drawEnemies();
  checkEnemyCollision();

  drawMushrooms();
  checkMushroomCollision();

  drawPortal();
  checkPortalCollision();
  
  drawHitboxPortal();
  animation();

  drawPowers();


  checkPlayerDamage();

  const frameX = 5; 
  const frameY = currentFrame * frameHeight; 

  if (isDamaged) {
    if(currentSprite == 0){
      desenhaPlayer(playerDamageRight, playerX, playerY, frameWidth, frameHeight, frameX, frameY);
    }
    else{
      desenhaPlayer(playerDamageLeft, playerX, playerY, frameWidth, frameHeight, frameX, frameY);
    }
  } else {
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
  drawGameInfo();

  if(playerY > 250 || lifeBar <= 0 ){ 
    context.fillStyle = "white";
    drawRoundedRect(context, 130, 45, 175, 180, 15);
    
    context.fillStyle = "red";  
    context.font = "20px Arial";  
    context.fillText("Game Over!", 160, (canvas.height / 2) + 55); 

    backgroundMusic.pause();

    const buttonX = canvas.width / 2 - 70;
    const buttonY = (canvas.height / 2) + 70;  
    const buttonWidth = 150;
    const buttonHeight = 20;
    const borderRadius = 10; 

    context.fillStyle = "green";
    drawRoundedRect(context, buttonX, buttonY, buttonWidth, buttonHeight, borderRadius);

    context.fillStyle = "white";
    context.font = "10px Arial";
    context.fillText("Tentar Novamente!", buttonX + 35, buttonY + 13);

    drawRoundedImage(context, logo, 135, 50, 165, 100, 15);

    canvas.addEventListener("click", handleCanvasClick);

    function handleCanvasClick(event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight
      ) {
        window.location.reload();
      }
    }

    if(Ended){
      return;
    } else {
      gameOverSound.play();
      Ended = true;
    }
  }

  if(Win){
    context.fillStyle = "white";
    drawRoundedRect(context, 130, 45, 175, 190, 15);
    
    context.fillStyle = "green";  
    context.font = "20px Arial";  
    context.fillText("Level Win!", 170, (canvas.height / 2) + 50); 
    context.font = "10px Arial";  
    context.fillText("You collected:         " + mushroomCount + " out of 4", 155, (canvas.height / 2 + 10) + 60); 
    context.drawImage(mushroomYellow, 222, (canvas.height / 2 + 61), 12, 12); 

    backgroundMusic.pause();

    const buttonX = canvas.width / 2 - 70;
    const buttonY = (canvas.height / 2) + 85;  
    const buttonWidth = 150;
    const buttonHeight = 20;
    const borderRadius = 10; 

    context.fillStyle = "green";
    drawRoundedRect(context, buttonX, buttonY, buttonWidth, buttonHeight, borderRadius);

    context.fillStyle = "white";
    context.font = "10px Arial";
    context.fillText("Next Level!", buttonX + 50, buttonY + 13);

    drawRoundedImage(context, logo, 135, 50, 165, 100, 15);

    canvas.addEventListener("click", handleCanvasClick);

    function handleCanvasClick(event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight
      ) {
        window.location.href = "home2.html";
      }
    }

    if(Finish){
      return;
    } else {
      gameWinSound.play(); 
      Finish = true;
    }
  }

  updateCharacterMovement();
  requestAnimationFrame(gameLoop); 
}
