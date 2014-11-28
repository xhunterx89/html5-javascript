var canvas = document.getElementById('game-canvas'),
    context = canvas.getContext('2d'),

// Constants............................................................

   LEFT = 1,
   RIGHT = 2,

   // Constants are listed in alphabetical order from here on out
   
   BACKGROUND_VELOCITY = 42,

   PAUSED_CHECK_INTERVAL = 200,

   PLATFORM_HEIGHT = 8,  
   PLATFORM_STROKE_WIDTH = 2,
   PLATFORM_STROKE_STYLE = 'rgb(0,0,0)',

   // Platform scrolling offset (and therefore speed) is
   // PLATFORM_VELOCITY_MULTIPLIER * backgroundOffset: The
   // platforms move PLATFORM_VELOCITY_MULTIPLIER times as
   // fast as the background.

   PLATFORM_VELOCITY_MULTIPLIER = 4.35,

   RUNNER_HEIGHT = 43,
   
   STARTING_BACKGROUND_VELOCITY = 0,

   STARTING_PLATFORM_OFFSET = 0,
   STARTING_BACKGROUND_OFFSET = 0,

   STARTING_RUNNER_LEFT = 50,
   STARTING_RUNNER_TRACK = 2,

   // Track baselines...................................................

   TRACK_1_BASELINE = 323,
   TRACK_2_BASELINE = 223,
   TRACK_3_BASELINE = 123,

   // Fps indicator.....................................................
   
   fpsElement = document.getElementById('fps'),

   // Images............................................................
   
   background  = new Image(),
   runnerImage = new Image(),

   // Time..............................................................
   
   lastAnimationFrameTime = 0,
   lastFpsUpdateTime = 0,
   fps = 60,

   // Runner track......................................................

   runnerTrack = STARTING_RUNNER_TRACK,
   
   // Translation offsets...............................................
   
   backgroundOffset = STARTING_BACKGROUND_OFFSET,
   platformOffset = STARTING_PLATFORM_OFFSET,

   // Velocities........................................................

   bgVelocity = STARTING_BACKGROUND_VELOCITY,
   platformVelocity,

   // Platforms.........................................................

   alienData = [
      // Screen 1.......................................................
      {
         left:      10,
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      {  left:      250,
         opacity:   1.0,
         track:     2,
         pulsate:   false,
      },

      {  left:      400,
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      {  left:      633,
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      // Screen 2.......................................................
               
      {  left:      810,
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1025,
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1200,
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      {  left:      1400,
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      // Screen 3.......................................................
               
      {  left:      1625,
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1800,
         opacity:   1.0,
         track:     1,
         pulsate:   false
      },

      {  left:      2000,
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      2100,
         opacity:   1.0,
         track:     3,
      },


      // Screen 4.......................................................

      {  left:      2269,
         opacity:   1.0,
         track:     1,
      },

      {  left:      2500,
         opacity:   1.0,
         track:     2,
         snail:     true
      },
   ];

// ---------------------------- FUNCTIONS ------------------------------ 

// Drawing..............................................................

function drawRunner() {
   context.drawImage(runnerImage,
                     STARTING_RUNNER_LEFT,
                     calculatePlatformTop(runnerTrack) - RUNNER_HEIGHT);
}

function drawPlatforms() {
   var pd, top;

   context.save();
   context.translate(-platformOffset, 0);
   alien = new Image();
   alien.src = 'images/alien1.png';
   for (var i=0; i < alienData.length; ++i) {
      pd = alienData[i];
      top = calculatePlatformTop(pd.track);
      context.drawImage(alien, pd.left, top);
   }
   context.restore();
}

function draw() {
   setPlatformVelocity();
   setOffsets();

   drawBackground();

   drawRunner();
   drawPlatforms();
}

function setPlatformVelocity() {
   platformVelocity = bgVelocity * PLATFORM_VELOCITY_MULTIPLIER; 
}

function setOffsets() {
   setBackgroundOffset();
   setPlatformOffset();
}

function setBackgroundOffset() {
   var offset = backgroundOffset + bgVelocity/fps;

   if (offset > 0 && offset < background.width) {
      backgroundOffset = offset;
   }
   else {
      backgroundOffset = 0;
   }
}

function setPlatformOffset() {
   platformOffset += platformVelocity/fps;

   if (platformOffset < 0) {
      turnRight();
   }
}

function drawBackground() {
   context.translate(-backgroundOffset, 0);

   // Initially onscreen:
   context.drawImage(background, 0, 0);

   // Initially offscreen:
   context.drawImage(background, background.width, 0);

   context.translate(backgroundOffset, 0);
}

function calculateFps(now) {
   var fps = 1000 / (now - lastAnimationFrameTime);
   lastAnimationFrameTime = now;

   if (now - lastFpsUpdateTime > 1000) {
      lastFpsUpdateTime = now;
      fpsElement.innerHTML = fps.toFixed(0) + ' fps';
   }
   return fps; 
}

function calculatePlatformTop(track) {
   var top;

   if      (track === 1) { top = TRACK_1_BASELINE; }
   else if (track === 2) { top = TRACK_2_BASELINE; }
   else if (track === 3) { top = TRACK_3_BASELINE; }

   return top;
}

function turnLeft() {
   bgVelocity = -BACKGROUND_VELOCITY;
}

function turnRight() {
   bgVelocity = BACKGROUND_VELOCITY;
}
   
// Animation............................................................

function animate(now) { 
   fps = calculateFps(now); 
   draw();
   requestNextAnimationFrame(animate);
}

// ------------------------- INITIALIZATION ----------------------------

function initializeImages() {
   background.src = 'images/background_sky.jpg';
   runnerImage.src = 'images/space.png';

   background.onload = function (e) {
      startGame();
   };
}

function startGame() {
   window.requestNextAnimationFrame(animate);
}

// Launch game.........................................................

initializeImages();

setTimeout( function (e) {
   turnRight();
}, 1000);
