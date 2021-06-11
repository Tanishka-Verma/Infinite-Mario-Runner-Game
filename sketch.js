var backgroundImage;
var mario;
var marioImage;
var ground;
var groundImage;
var flytrap;
var flytrapImage;
var coin;
var coinImage;
var gameState="play";
var score=0;
var invisibleGround;
var deadMario;
var flytrapGroup;
var coinGroup;
var gameOver;
var gameOverImage;
var reload;
var reloadImage;
var jumpSound;
var deadSound;
var checkpointSound;
function preload(){
   backgroundImage = loadImage("bg.png");
  marioImage = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  groundImage=loadImage("ground2.png");
  flytrapImage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  coinImage=loadImage("coin.png");
  deadMario = loadAnimation("collided.png");
  gameOverImage = loadImage("gameOver.png");
  reloadImage = loadImage("restart.png");
 jumpSound=loadSound("jump.mp3");
  deadSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
}
function setup() {
  createCanvas(600, 500);
 mario = createSprite(50,390,40,40);
  mario.addAnimation("running",marioImage);
  mario.scale=1.8;
  mario.addAnimation("dead",deadMario);
   // mario.debug=true;
  mario.setCollider("rectangle",0,5,30,20,90);
  ground=createSprite(300,460,600,90);
  ground.addImage("land",groundImage);
  ground.velocityX=-5;
  invisibleGround=createSprite(300,430,600,10);
  invisibleGround.visible=false;
  mario.collide(invisibleGround);
  flytrapGroup=createGroup();
  coinGroup=createGroup();
   gameOver=createSprite(300,200,100,10);
     gameOver.addImage("over",gameOverImage);
  gameOver.scale=0.8;
 
     reload=createSprite(300,250,20,20);
     reload.addImage("loadAgain",reloadImage);
     reload.scale=0.5;
   
}


function draw() {
 background(backgroundImage);
 if (gameState=="play"){
    if (ground.x<0){
    ground.x=300;
  }
    gameOver.visible=false;
    reload.visible=false;
   if (keyDown("space")&& mario.collide(invisibleGround)){
    mario.velocityY=-15;
    jumpSound.play();
 
  }
   
  //gravityCode;
  mario.velocityY=mario.velocityY+1;
 
   if(mario.isTouching(flytrapGroup)){
    deadSound.play();
     gameState="end";
         
   }
   if (mario.isTouching(coinGroup)){
    score=score+5;
   coin.destroy();
  }
   if (score%50==0 && score>0 ){
  checkpointSound.play();
     score=score+5;
    }

    creatingFlytraps();
  creatingCoins();
 }
  if (gameState=="end"){
    ground.velocityX=0;
    flytrapGroup.setVelocityXEach(0);
    mario.changeAnimation("dead",deadMario);
    coinGroup.setVelocityXEach(0);
    flytrapGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    mario.velocityY=0;
    gameOver.visible=true;
     reload.visible=true;
    if (mousePressedOver(reload)){
     gameState="play";
      flytrapGroup.destroyEach();
      coinGroup.destroyEach();
      score=0;
      mario.changeAnimation("running",marioImage);
    ground.velocityX=-5;
  }

  } 
  
    
          
  
 
  mario.collide(invisibleGround);

 
  textSize(30);
  fill("red");
  text(score,550,35);



 
  drawSprites()
}
function keyPressed(){
//  console.log("Tanishka");
  //console.log(checkpointSound.isPlaying());
  //checkpointSound.pause();
  if (checkpointSound.isPlaying()){
      checkpointSound.stop();
    }
}
function creatingFlytraps (){
  if (World.frameCount%60==0){
    flytrap=createSprite(360,400,20,20);
    flytrap.addAnimation("obs",flytrapImage);
    flytrap.velocityX=-5;
    flytrap.lifetime=120;
      //flytrap.debug=true;
    flytrap.setCollider("rectangle",0,2,30,30,90);
    flytrapGroup.add(flytrap);
  }
}
function creatingCoins(){
   if (World.frameCount%120==0){
    coin=createSprite(600,310,20,20);
    coin.addImage("cn",coinImage);
    coin.scale=0.02;
    coin.velocityX=-5;
     coin.lifetime=120;
    // coin.debug=true;
     coinGroup.add(coin);
  }
}