
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var obstacle, obstacleGroup;
var score,ground,invisibleG;
var survivalTime=0;
var score=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  score=0;
  
  monkey=createSprite(80,415,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.2;

  ground=createSprite(400,450,1400,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  invisibleG = createSprite(200,190,400,10);
  invisibleG.visible = false;
  
  BananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  
  background("green");
 
  if(keyDown("space") && monkey.y>=160){
    monkey.velocityY = -12;
  
  }
    monkey.velocityY = monkey.velocityY + 0.5;
  
    monkey.collide(ground);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   if(monkey.isTouching(BananaGroup)){
    score=score+1;
  }
  
  stroke("white");
  textSize=20;
  fill("white");
  text("score: "+ score, 500, 50);
  
  stroke("black");
  textSize=20;
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 50, 50);
  
   if(obstacleGroup.isTouching(monkey)){
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
      reset();
    }

  
  spawnObstacles();
  bananas();
  drawSprites();
}
function bananas() {
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(300,300,40,10);
    banana.y = Math.round(random(150,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 200;
    
    BananaGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,410,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.23;
    obstacle.velocityX = -6;
    obstacle.lifetime = 100;
    
    obstacleGroup.add(obstacle);
  }
}

function reset(){

  obstacleGroup.destroyEach();
  BananaGroup.destroyEach();
  
  monkey.addAnimation("moving", monkey_running);
  
  score = 0;
  survivalTime=0;
}
  
