var bg, bgImg, bg2
var bird
var bottomGround
var topGround
var balloon, balloonImg
var birdGroup
var END = 0;

function preload(){
  bgImg = loadImage("assets/bg.png");
 bg2 = loadImage("assets/game_over.jpg")
  jumpSound = loadSound("assets/jump.mp3");
  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");
birdImg = loadImage("assets/bird.png");
collidedSound = loadSound("assets/collided.wav");
}

function setup(){
createCanvas(400,400);
//imagem de fundo
  bg = createSprite(200,200);
  bg.addImage("bg", bgImg);
  bg.scale = 0.7;

  bg.addImage("game_over", bg2);

  //criar o solo superior e inferior
  bottomGround = createSprite(200,390,800,20);
  bottomGround.visible = true;

  topGround = createSprite(200,10,800,20);
  topGround.visible = false;
        
  //criar o balão     
  balloon = createSprite(30,200,20,50);
  balloon.addAnimation("balloon1",balloonImg);
  balloon.scale = 0.2;



  


  birdGroup = new Group();

}

function draw() {
  
  background("black");
        
          //faça o balão de ar quente pular
          if(keyDown("space")) {
            balloon.velocityY= -6 ;
            jumpSound.play();
          }

          //adicione gravidade
           balloon.velocityY = balloon.velocityY+2;
           
           spawnbirds();

           if(birdGroup.isTouching(balloon)){
            collidedSound.play();
       
            gameOver();
           }
        drawSprites();


        }
        function spawnbirds() {
          if (frameCount % 60 === 0) {
             bird = createSprite(width+20,height-300,40,10);
             bird.y = Math.round(random(100,220));
             bird.addImage(birdImg);
             bird.scale = 0.1;
             bird.velocityX = -3; 

             birdGroup.add(bird);
          }
        
        
        }
        function gameOver(){
          bg.changeImage("game_over");
          bg.scale = 2.5;
          birdGroup.destroyEach();
          balloon.destroy();
         }
