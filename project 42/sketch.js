var backImage,backgr;
var player, player_running;
var ground,obstacles,obstacleimg,food,foodimg,foodGroup,obstacleGroup;
var gameOver, gameOverimg;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacleimg = loadImage("stone.png")
  foodimg = loadImage("banana.png")
  gameOverimg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(900,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
    textSize(30)
    fill("white")
   
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
 
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacles();

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score+2;
      player.scale += +0.1;
    }

    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
}else if(gameState===END){
  backgr.velocityX = 0;
  player.visible = false;

  foodGroup.destroyEach();
  obstacleGroup.destroyEach();

  gameOver = createSprite(300,200)
  gameOver.addImage(gameOverimg)
  
  
}


  drawSprites();
  text("Score"+score,200,200)

}

function spawnFood(){
 if(frameCount%80===0) {
  food = createSprite(600,250,40,10);
  food.y = random(120,200);
  food.addImage(foodimg);
  food.scale = 0.05;
  food.velocityX = -4;
  
  food.lifetime = 300;
  player.depth = food.depth+1;
  foodGroup.add(food);
 }
}

function spawnObstacles(){
  if (frameCount % 300 === 0) {
     obstacles = createSprite(400,340,40,10);
     obstacles.addImage(obstacleimg);
     obstacles.scale = 0.1;
     obstacles.velocityX = -3; 
     obstacleGroup.add(obstacles); 
 }
 }
