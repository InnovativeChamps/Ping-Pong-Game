var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

createEdgeSprites();
var userPaddle = createSprite(390, 200, 10, 70);
fill("Red");
textSize(20);
var computerPaddle = createSprite(10, 200, 10, 70);
var ball = createSprite(200, 200, 10, 10);
var playerScore = 0;
var computerScore = 0;
var gameState = "serve";
function draw() {
  background("LightGreen");
  text(computerScore, 170, 20);
  text(playerScore, 230, 20);
  line(200, 0, 200, 20);
  line(200, 25, 200, 45);
  line(200, 50, 200, 70);
  line(200, 75, 200, 95);
  line(200, 100, 200, 120);
  line(200, 125, 200, 145);
  line(200, 150, 200, 170);
  line(200, 175, 200, 195);
  line(200, 200, 200, 220);
  line(200, 225, 200, 245);
  line(200, 250, 200, 270);
  line(200, 275, 200, 295);
  line(200, 300, 200, 320);
  line(200, 325, 200, 345);
  line(200, 350, 200, 370);
  line(200, 375, 200, 400);
  if (gameState === "serve") {
    text("Press Enter to Serve", 150, 170);
  }
  if (gameState === "over") {
    text("Game Over!!!", 150, 160);
    text("Press R to restart", 150, 180);
  }
  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }
  if (keyDown("Enter") && gameState==="serve") {
    ball.velocityX = 5;
    ball.velocityY = 5;
    gameState = "play";
  }
  userPaddle.y = World.mouseY;
  if(ball.isTouching(userPaddle)){
      ball.x = ball.x - 5;
      ball.velocityX = -ball.velocityX;
    }
  if(ball.isTouching(computerPaddle)){
      ball.x = ball.x + 5;
      ball.velocityX = -ball.velocityX;
    }
  if (ball.x>400 || ball.x<0) {
    if (ball.x<0) {
      playerScore = playerScore+1;
    } else {
      computerScore = computerScore+1;
    }
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";
    if (computerScore===5 || playerScore===5) {
      gameState = "over";
    }
  }
  if (ball.isTouching(topEdge) || ball.isTouching(bottomEdge)) {
    ball.bounceOff(topEdge);
    ball.bounceOff(bottomEdge);
  }
  computerPaddle.y = ball.y;
  drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
