/*##########################################################
 ***                 Global Variables                    ***
 ###########################################################*/
let game;
let player;
let platform;
let playerWon = false;
let playerLost = false;
let score = 0;
let scoreForVictory = 50;
let badges;
let coin;
let navigationKeys;
let jumpButton;
let text;
let message;
let textCounter;
let poison;
let lives = 3;
let textLife;
let back;
let lava;
let lavaa;
let mus;
let beginPlat;
let specialPlatAlpha = false;
let started = false;
let star;
let counter = 0;
let god = false;
let coins = [];
let coinCoordinates = [{
    X: 25,
    Y: 145
  }, //simple
  {
    X: 765,
    Y: 100
  }, //simple
  {
    X: 270,
    Y: 400
  }, //simple
  {
    X: 500,
    Y: 305
  }, //special
  {
    X: 535,
    Y: 180
  }, //special
];
let plat = [];
let platCoordinates = [{
    X: 250,
    Y: 450
  }, //simple
  {
    X: 100,
    Y: 250
  }, //simple
  {
    X: 1125,
    Y: 100
  }, //simple
  {
    X: 860,
    Y: 200
  }, //simple
  {
    X: 350,
    Y: 350
  }, //special
  {
    X: 500,
    Y: 235
  }, //special
];
let littleStar;
let badge;
let poisons = [];
let poisonCoordinates = [{
    X: 400,
    Y: 400
  }, //simple
  {
    X: 190,
    Y: 205
  }, //simple
  {
    X: 725,
    Y: 228
  }, //simple
  {
    X: 478,
    Y: 355
  }, //simple
  {
    X: 225,
    Y: 450
  } //special
];


/*##########################################################
 ***                       Functions                     ***
 ###########################################################*/

/*************************
 * Add coins on the screen
 *************************/

function addCoins(coinCoordinates) {
  coin = game.add.physicsGroup();

  for (let i = 0; i < coinCoordinates.length; ++i) {
    coins.push(coin.create(coinCoordinates[i].X, coinCoordinates[i].Y, 'coin'));
    coins[i].animations.add('spin');
    coins[i].animations.play('spin', 10, true);
    if (i === 3) {
      coins[3].body.gravity.x = 0;
      coins[3].body.velocity.x = 300;
    }
  }
}

/****************************
 * Add platforms on the screen
 *****************************/
function addPlatforms() {
  platform = game.add.physicsGroup();

  for (let i = 0; i < platCoordinates.length; ++i) {
    plat.push(platform.create(platCoordinates[i].X, platCoordinates[i].Y, 'platform'));
    if (i === 4) {
      plat[4].body.gravity.x = 0;
      plat[4].body.velocity.x = 300;
    }
  }

  beginPlat = platform.create(0, 500, 'begPlatform');

  platform.setAll('body.immovable', true);
}

/**********************************
 * Add the little star on the screen
 ***********************************/
function addLittleStar() {
  star = game.add.physicsGroup();
  littleStar = star.create(1150, 530, 'star');
  littleStar.animations.add('spin');
  littleStar.animations.play('spin', 8, true);
}

/*****************************
 * Add the badge on the screen
 *****************************/
function addTheBadge() {
  badges = game.add.physicsGroup();
  badge = badges.create(1150, 25, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 8, true);
}

/*************************
 * Add poison on the screen
 **************************/
function addPoison() {
  poison = game.add.physicsGroup();

  for (let i = 0; i < poisonCoordinates.length; ++i) {
    poisons.push(poison.create(poisonCoordinates[i].X, poisonCoordinates[i].Y, 'poison'));
    poisons[i].animations.add('bubbles');
    poisons[i].animations.play('bubbles', 8, true);
  }
}

/**********************
 * Add lava on the screen
 ***********************/

function addLava() {
  lava = game.add.physicsGroup();
  lavaa = lava.create(-50, 550, 'lava');

  lavaa.body.gravity.x = 10;
}

/******************
 * The coin manager
 ******************/
function managerCoin(player, coinss) {
  coinss.kill();
  score = score + 10;
  if (score >= scoreForVictory) {
    addTheBadge();
  }
}

/*******************
 * The badge manager
 *******************/
function managerBadge(player, badge) {
  badge.kill();
  playerWon = true;
}

/********************
 * The poison manager
 ********************/
function managerPoison(player, poison) {
  poison.kill();
  lives--;
  if (lives == 0)
    playerLost = 1;
}

/******************
 * The lava manager
 ******************/
function managerLava(player) {
  lives = 0;
  playerLost = true;
}

/******************
 * The star manager
 ******************/
function managerStar(player, littleStar) {
  littleStar.kill();
  god = true;
}


/*******************
 * The game function
 *******************/
function initializeazaJoc() {
  game = new Phaser.Game(1200, 600, Phaser.AUTO, '', {
    preload: loadTextures,
    create: init,
    update: update,
    render: render
  });

  /**********************
   * The load function
   **********************/
  function loadTextures() {
    game.load.image('begPlatform', 'src/img/platformType1.png');
    game.load.image('platform', 'src/img/platformType2.png');
    game.load.image('bg', 'src/img/back.jpg');
    game.load.spritesheet('player', 'src/img/player.png', 48, 62);
    game.load.spritesheet('coin', 'src/img/coin.png', 36, 44);
    game.load.spritesheet('badge', 'src/img/badge.png', 42, 54);
    game.load.spritesheet('poison', 'src/img/poison.png', 32, 32);
    game.load.spritesheet('lava', 'src/img/lava.png');
    game.load.spritesheet('star', 'src/img/star.png', 32, 32);
    game.load.audio('song', 'src/misc/8bit-song.mp3');
  }

  /*******************
   * The init function
   *******************/
  function init() {
    // bg
    back = game.add.tileSprite(0, 0, 1210, 600, 'bg');

    // music
    mus = game.add.audio('song');
    mus.play();

    // player
    player = game.add.sprite(115, 500, 'player');
    player.animations.add('mers');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 750;

    // coin
    addCoins(coinCoordinates);
    addPlatforms();
    addPoison();
    addLava();
    addLittleStar();

    // interactions
    navigationKeys = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(580, 16, 'SCORE: ' + score, {
      font: '24px Courier New',
      fill: 'white'
    });
    textLife = game.add.text(535, 42, 'LIVES: ', {
      font: '24px Courier New',
      fill: 'white'
    });
    textCounter = game.add.text(575, 42 + 28, 'time: ' + counter + ' sec', {
      font: '24px Courier New',
      fill: 'white'
    });

    message = game.add.text(game.world.centerX, 275, '', {
      font: '48px Courier New',
      fill: 'white'
    });
    message.anchor.setTo(0.5, 1);
   
    game.time.events.loop(Phaser.Timer.SECOND, time, this);
  }

  function time() {
    counter++;
  }

  /*********************
   * The update function
   *********************/
  function update() {
    back.tilePosition.x += 1;

    text.text = 'SCORE: ' + score;
    if (lives == 0)
      textLife.text = 'LIVES:';
    else if (lives == 1)
      textLife.text = 'LIVES: ♥';
    else if (lives == 2)
      textLife.text = 'LIVES: ♥ ♥';
    else
      textLife.text = 'LIVES: ♥ ♥ ♥';
    textCounter.text = 'TIME: ' + counter;

    game.physics.arcade.collide(player, platform);
    game.physics.arcade.collide(player, beginPlat);
    game.physics.arcade.overlap(player, coin, managerCoin);
    game.physics.arcade.overlap(player, badges, managerBadge);
    game.physics.arcade.overlap(player, poison, managerPoison);
    game.physics.arcade.overlap(player, lava, managerLava);
    game.physics.arcade.overlap(player, star, managerStar);
    player.body.velocity.x = 0;

    if (!specialPlatAlpha) {
      if (plat[5].alpha > 0) {
        plat[5].alpha -= 0.005;
        coins[4].alpha -= 0.005;
      } else {
        specialPlatAlpha = true;
      }
    } else {
      if (plat[5].alpha < 1) {
        plat[5].alpha += 0.005;
        coins[4].alpha += 0.005;
      } else
        specialPlatAlpha = false;
    }

    if (started) {
      if (beginPlat.alpha <= 0) {
        beginPlat.kill();
        poisons[4].kill();
      } else {
        beginPlat.alpha -= 0.025;
        poisons[4].alpha -= 0.025;
      }
    }

    if (lavaa.x > 0) {
      lavaa.body.velocity.x = -50;
    } else if (lavaa.x < -50) {
      lavaa.body.velocity.x = 50;
    }

    if (plat[4].x < 350) {
      plat[4].body.velocity.x = 100;
      coins[3].body.velocity.x = 100;
    } else if (plat[4].x > 1300) {
      plat[4].body.velocity.x = -100;
      coins[3].body.velocity.x = -100;
    }

    if (navigationKeys.left.isDown) {
      player.animations.play('mers', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = -1;
      started = true;
    } else if (navigationKeys.right.isDown) {
      player.animations.play('mers', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
      started = true;
    } else {
      player.animations.stop();
    }
    if ((jumpButton.isDown || navigationKeys.up.isDown) && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
      started = true;
    }

    if (god) {
      lavaa.kill();
      player.body.gravity.x = 0;
      player.body.gravity.y = 0;
      if (jumpButton.isDown || navigationKeys.up.isDown)
        player.body.y -= 5;

      if (navigationKeys.down.isDown)
        player.body.y += 5;

      for (let i = 0; i < poisons.length; ++i) {
        poisons[i].kill();
      }
    }

    if (playerWon) {
      player.kill();
      message.text = "YOU WIN!";
      document.location.reload();
    }

    if (playerLost) {
      player.kill();
      message.text = "YOU LOST!";
      document.location.reload();

    }
  }

  function render() {}
}
