/* global Phaser */

// Copyright (c) 2022 Joseph Kwon No rights reserved
//
// Created by: Joseph Kwon
// Created on: June 2022
// This is the Game Scene

// Expand this particular scene using the code of another user
class GameScene extends Phaser.Scene {

  // ceate an alien
  createAlien () {
    // random x location generator
    const alienXLocation = Math.floor(Math.random() * 1920) + 1 // this will be a number between 1 and 1920
    let alienXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% cases
    
    // variable that refrences the alien
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien').setScale(5.5)
    // adding downward velocity to alien
    anAlien.body.velocity.y = 300
    anAlien.body.velocity.x = alienXVelocity

    this.alienGroup.add(anAlien)
  }

  // create an meteor 
  createMeteor () {
  // random x location generator
  const meteorXLocation = Math.floor(Math.random() * 1920) + 1 // this will be a number between 1 and 1920
  let meteorXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50
  meteorXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% cases
    
  // variable that refrences the meteor
  const anMeteor = this.physics.add.sprite(meteorXLocation, -100, 'meteor').setScale(0.5)
  // adding downward velocity to meteor
  anMeteor.body.velocity.y = 600
  anMeteor.body.velocity.x = meteorXVelocity

  this.meteorGroup.add(anMeteor)
  }
  
  /**
  *This method is the construtor.
  */
  constructor () {
    // run phaser's constructor code first, (super's role)
    super({ key: "gameScene" })

    // Variable for the background
    this.background = null

    // Variable for sprite (spaceship)
    this.ship = null

    // Variable to let user only fire a missile one at a time
    this.fireMissile = false

    // Variable to keep track of score
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center '}

    // Variable of lives counter
    this.lives = 1
    this.livesText = null
    this.livesTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center '}

    // Variable for death | Game Over
    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
  }

  // Initialize, gets the scene up and running
  init(data) {
    // Main camera set background color to... black
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  /** 
  * Can be defined in your own scenes. 
  * Use it to load assets. 
  */
  preload() {
    console.log('Game Scene')

    // Load in the images
    this.load.image('starBackground', 'assets/background.webp')
    this.load.image('ship', 'assets/spaceShip.png')
    this.load.image("missile", 'assets/missile.png')
    // Key for this line of code is "alien"
    this.load.image('alien', 'assets/alien.png')
    this.load.image('meteor', 'assets/Meteor.png')

    // Smoke
    this.load.image('smoke', 'assets1/whitePuff00.png')

    // sounds (Load in sound)
    this.load.audio('laser', 'audio/Warp.wav')
    this.load.audio('scream', 'audio/Zombie.wav')
    this.load.audio('bomb', 'assets/bomb.wav')
    this.load.audio('backgroundMUSIC', 'audio/backgroundmusic.mp3')
    this.load.audio('explosion', 'audio/Explosion.wav')
  }

  /**
  * Can be defined on your own scenes. 
  * Use it to create your game objects. 
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  create(data) {

    // Show the image to the user, center it
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
    this.background.setOrigin(0.0)

    // Background music
    this.sound.play('backgroundMUSIC')

    // Show score on screen
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    // Show lives on screen
    this.livesText = this.add.text(10, 100, 'Lives: ' + this.lives.toString(), this.livesTextStyle)

    // Property/module called physics for the movement of spaceship (helps with collision detection)
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.3)

    // create a group for the missiles
    this.missileGroup = this.physics.add.group()

    // creating engine smoke behind spaceship | variable
    const particles = this.add.particles('smoke')

    particles.createEmitter({
      quantity: 10,
      speedY: { min: 20, max: 50},
      speedX: { min: 20, max: 50},

      scale: { start: 0.065, end: 0.002 },
      
      // Lock onto the ship - destroy smoke later in code
      follow: this.ship,

      followOffset: { y: this.ship.height * 0.1 }
    })
      
          

    // create a group for the aliens
    this.alienGroup = this.add.group()
    // create function called "createAlien"
    this.createAlien()

    // ceate a group for the meteors
    this.meteorGroup = this.add.group()
    // create function called "createMeteor"
    this.createMeteor()

    // Collisions between missiles and aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
      // function written here | whenever the code b4 function happens, function will happen
      alienCollide.destroy()
      missileCollide.destroy()
      // Sound when alien gets hit
      this.sound.play('scream')
      // Update score when alien gets hit by missile
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      // Create two more alien when one is destroyed
      this.createAlien()
      this.createAlien()
    }.bind(this))

    // Collisions between missiles and meteors
    this.physics.add.collider(this.missileGroup, this.meteorGroup, function (missileCollide, meteorCollide) {
      // function written here | whenever the code b4 function happens, function will happen
      meteorCollide.destroy()
      missileCollide.destroy()
      // Sound when meteor gets hit
      this.sound.play('explosion')
      // Update score when meteor gets hit by missile
      this.score = this.score + 5
      this.scoreText.setText('Score: ' + this.score.toString())
      // Create two more alien when one is destroyed
      this.createMeteor()
    }.bind(this))

    // Game over Scene, when Alien hits User's spaceship
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      // stop the music
      this.game.sound.stopAll()
      this.sound.play('scream')
      // Update score when alien gets hit by missile
      this.score = 0
      // Update lives when alien gets hit by missile
      this.lives = this.lives - 1
      this.livesText.setText('Lives: ' + this.lives.toString())
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()
      particles.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
      this.lives = this.lives + 1
    }.bind(this))

    // Game over scene, when Meteor hits user's spaceship
    this.physics.add.collider(this.ship, this.meteorGroup, function (shipCollide, meteorCollide) {
      // stop the music
      this.game.sound.stopAll()
      this.sound.play('explosion')
      // Update score when alien gets hit by missile
      this.score = 0
      // Update lives when alien gets hit by missile
      this.lives = this.lives - 1
      this.livesText.setText('Lives: ' + this.lives.toString())
      this.physics.pause()
      meteorCollide.destroy()
      shipCollide.destroy()
      particles.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
      this.lives = this.lives + 1
    }.bind(this))  
  }

  /**
  * Should be overridden by your own scenes. 
  * This method is called once per game step while the scene is running.
  * @param {number} time - The current time. 
  * @param {number} delta - The delta time in ms since the last frame. 
  */
  update(time, delta) {
    // called 60 times a second, hopefully!
    // create a variable in this local function | Left hand key
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    // create a variable in this local function | Right hand key
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    // create a variable in this local function | Up hand key
    const keyUpObj = this.input.keyboard.addKey('UP')
    // create a variable in this local function | Down hand key
    const keyDownObj = this.input.keyboard.addKey('DOWN')
    // create a variable in this local function | Space bar
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    
    // If statement for movement | LEFT KEY
    if (keyLeftObj.isDown === true) {
      // if true, take away -15 (pixels) from the space ship's x position (making it move) | Might add y)
      this.ship.x -= 15
      // prevent the ship from going off the map | might change it to a WARP later
      if (this.ship.x < 0) {
        // if the spaceship ever does go out of the map just make it go back
        this.ship.x = 0
      }
    }

    // If statement for movement | RIGHT KEY
    if (keyRightObj.isDown === true) {
      // if true, moves +15 (pixels) to right from the space ship's x position (making it move)
      this.ship.x += 15
      // prevent te ship from going off the map | dimensions of the scree nare in game.js
      if (this.ship.x > 1920) {
        this.ship.x = 1920
      }
    }

    // If statement for movement | UP KEY
    if (keyUpObj.isDown === true) {
      // if true, moves +15 (pixels) to up from the space ship's x position (making it move)
      this.ship.y -= 15
      // prevent te ship from going off the map | dimensions of the screen are in game.js
      if (this.ship.y < 0) {
        this.ship.y = 0
      }
    }

    // If statement for movement | DOWN KEY
    if (keyDownObj.isDown === true) {
      // if true, moves +15 (pixels) to down from the space ship's x position (making it move)
      this.ship.y += 15
      // prevent te ship from going off the map | dimensions of the screen are in game.js
      if (this.ship.y > 1080) {
        this.ship.y = 1080
      }
    }

    // if statement for space bar object | missiles
    if (keySpaceObj.isDown === true) {
      // Only create the new one of fileMissile is false
      if (this.fireMissile === false) {
        // create a variable for missile 
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
        // add it to the group 
        this.missileGroup.add(aNewMissile)
        this.sound.play('laser')
      }
    }
    // an if statement for when the sapce bar is up
    if (keySpaceObj.isUp === true ) {
      this.fireMissile = false 
    }

    // function for each item, missile movement
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      // Destroy the missiles when they go out of screen to preserve memory
      if (item.y < 0) {
        // Method destroyed is provided to us from phaser 3
        item.destroy()
      }
    })

    // Code to make aliens that enter the bottom void to warp to the top || This code can apply to warp spaceship
    this.alienGroup.children.each(function (item) {
      if(item.y > 1080) {
        item.y = 0
        const alienXCoordinate = Math.floor(Math.random() * 1920) + 1
        item.x = alienXCoordinate
      }
    })

    // Code to make meteors that enter the bottom void to warp to the top
    this.meteorGroup.children.each(function (item2){
      if(item2.y > 1080) {
        item2.y = 0
        const meteorXCoordinate = Math.floor(Math.random() * 1920 + 1)

        item2.x = meteorXCoordinate
      }
    })
  }
}

// Variable name SplashScene 
export default GameScene