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
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
    // adding downward velocity to alien
    anAlien.body.velocity.y = 200
    anAlien.body.velocity.x = alienXVelocity

    this.alienGroup.add(anAlien)
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
    this.load.image('starBackground', 'assets/starBackground.png')
    this.load.image('ship', 'assets/spaceShip.png')
    this.load.image("missile", 'assets/missile.png')
    // Key for this line of code is "alien"
    this.load.image('alien', 'assets/alien.png')

    // sounds (Load in sound)
    this.load.audio('laser', 'assets/laser1.wav')
    this.load.audio('explosion', 'assets/barrelExploding.wav')
  }

  /**
  * Can be defined on your own scenes. 
  * Use it to create your game objects. 
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  create(data) {

    // Show the image ot the user, center it
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
    this.background.setOrigin(0.0)

    // Show score on screen
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    // Property/module called physics for the movement of spaceship (helps with collision detection)
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')

    // create a group for the missiles
    this.missileGroup = this.physics.add.group()

    // create a group for the aliens
    this.alienGroup = this.add.group()
    // create function called "createAlien"
    this.createAlien()

    // Collisions between missiles and aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
      // function written here | whenever the code b4 function happens, function will happen
      alienCollide.destroy()
      missileCollide.destroy()
      // Sound when alien gets hit
      this.sound.play('explosion')
      // Update score when alien gets hit by missile
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      // Create two more alien when one id destroyed
      this.createAlien()
      this.createAlien()
    }.bind(this))

    // Game over Scene, when Alien hits User's spaceship
    this.physics.add.collider(this.ship, thisalienGroup, function (shipCollide, alienCollide) {
      this.sound.play('bomb')
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game over!/nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
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
  }
}

// Variable name SplashScene 
export default GameScene