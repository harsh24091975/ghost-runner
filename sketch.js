var gameState="play";
var towerImg,tower;
var doorImg,door;
var doorsGroup;
var climberImg,climberGroup,climber;
var ghostImg,ghost;
var insBlock,insBlocksGroup;
var spSound;

function preload(){
  doorImg=loadImage("door.png");
  towerImg=loadImage("tower.png");
  doorsGroup=new Group();
  climberImg=loadImage("climber.png");
  climbersGroup=new Group();
  ghostImg=loadImage("ghost-standing.png");
  insBlocksGroup=new Group();
  spSound=loadSound("spooky.wav");
}

function setup(){
 createCanvas (600,600);
 spSound.loop();
 tower=createSprite(300,300)
 tower.addImage("tower",towerImg);
 tower.velocityY=1 ; 
 ghost=createSprite(300,300,50,50);
 ghost.addImage("ghost",ghostImg);
 ghost.scale=0.3;
  
}

function draw(){
  background("black");
  if(gameState==="play"){
 if (tower.y>400) {
   tower.y=300;
 }
   if (keyWentDown("space")){
     ghost.velocityY=-5;
    
   }
 // ghost.velocityY=ghost.velocityY+0.5;
    
   ghost.debug=true
    
  if(keyWentDown("right")){
    ghost.x=ghost.x+3;
  }
  
   if(keyWentDown("left")){
    ghost.x=ghost.x-3;
  }
  
 if (climbersGroup.isTouching(ghost)){
   ghost.velocityY=0;
   
 }
 
  
  if(insBlocksGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
     
     
  spawnDoors();
  drawSprites();
 }
  if (gameState==="end"){
     text("Game Over",230,250);
    fill("yellow");
    stroke("yellow");
   }
}



function spawnDoors(){
  if (frameCount%200===0){
   var door=createSprite(200,-50);
   door.addImage(doorImg);
    
   var climber=createSprite(200,10);
   climber.addImage(climberImg);
    
    var insBlock=createSprite(200,15) ;
    insBlock.width=climber.width;
    insBlock.height=2;
    
   door.x=Math.round(random(120,400)); 
   door.velocityY=1;
   climber.x=door.x;
   climber.velocityY=1;
   insBlock.x=door.x
   insBlock.velocityY=climber.velocityY
   climber.lifetime=800;
   door.lifetime=800;
   ghost.depth=door.depth+1;
    insBlock.debug=true
    insBlocksGroup.add(insBlock);
   climbersGroup.add(climber);
    doorsGroup.add(door);
  }
}