/* global Phaser */

// Copyright (c) 2022 Joseph Kwon No rights reserved
//
// Created by: Joseph Kwon
// Created on: June 2022
// This is the Tutorial2 Scene

// Expand this particular scene using the code of another user
class TutorialScene2 extends Phaser.Scene {

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

  
  /**
  *This method is the construtor.
  */
  constructor () {
    // run phaser's constructor code first, (super's role)
    super({ key: "tutorialScene2" })

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

    // Variable for death | Tutorial 
    this.tutorialText2 = null
    this.tutorialText2 = { font: '65px Arial', fill: '#ff0000', align: 'center' }
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
    console.log('tutorialScene2')

    // Load in the images
    this.load.image('starBackground', 'assets/starBackground.png')
    this.load.image('ship', 'assets/spaceShip.png')
    this.load.image("missile", 'assets/missile.png')
    // Key for this line of code is "alien"
    this.load.image('alien', 'assets/alien.png')
    this.load.image('meteor', 'assets/Meteor.png')

    // Smoke
    this.load.image('smoke', 'assets1/whitePuff00.png')

    // sounds (Load in sound)
    this.load.audio('laser', 'audio/Warp.wav')
    this.load.audio('explosion', 'audio/Explosion.wav')
    this.load.audio('Ambient', 'audio/Ambient.mp3')
    this.load.audio('click', 'audio.click.wav')
    this.load.audio('scream', 'audio/Zombie.wav')

    // Load in the image that is going to be next button
    this.load.image('nextButton', 'assets/Next.png')
    this.load.image('nextButton1', 'assets/BackButton.png')
  }

  /**
  * Can be defined on your own scenes. 
  * Use it to create your game objects. 
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  create(data) {

    // Show the image of the user, center it
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
    this.background.setOrigin(0.0)
    
    // Stop any current audio and replace with ambience 
    this.game.sound.stopAll()
    this.sound.play('Ambient')

    // Show score on screen
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

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
      // Create one more alien when one is destroyed
      this.createAlien()
    }.bind(this))

    // When Alien hits User's spaceship
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      // stop the music
      this.sound.play('explosion')
      alienCollide.destroy()
    }.bind(this))
    
    // Tutorial text
    this.tutorialText2 = this.add.text(1920 / 2, 1080 / 4, 'Hostile mobs will be present.\nDestroy as many possible to save Earth.', this.tutorialText2).setOrigin(0.5)

    // Add the start button as a sprite, center slightly below 100 pixels
    this.nextButton = this.add.sprite(1920 / 7, (1080 / 2) + 400, 'nextButton')
    // Making the button interactive
    this.nextButton.setInteractive({ useHandCursor: true })
    // When the person clicks button (pointerdown) ---> function call to happen
    this.nextButton.on('pointerdown', () => this.clickButton())

    // Add the start button as a sprite, center slightly below 100 pixels
    this.nextButton1 = this.add.sprite(1920 / 7, (1080 / 2) + 150, 'nextButton1')
    // Making the button interactive
    this.nextButton1.setInteractive({ useHandCursor: true })
    // When the person clicks button (pointerdown) ---> function call to happen
    this.nextButton1.on('pointerdown', () => this.clickButton1())
    
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

    // Code to make aliens that enter the bottom void to warp to the top || This code can apply to warp spaceship
    this.alienGroup.children.each(function (item) {
      if(item.y > 1080) {
        item.y = 0
        const alienXCoordinate = Math.floor(Math.random() * 1920) + 1
        item.x = alienXCoordinate
      }
    })

    
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
  }
  // code for the clickButton function
  clickButton () {
    this.sound.play('click')
    // brings user to gameScene on click
    this.scene.start('gameScene')
    }
  
    // code for the clickButton1 function
  clickButton1 () {
    this.sound.play('click')
    // brings user to gameScene on click
    this.scene.start('tutorialScene')
  }
}

// Variable name TutorialScene 
export default TutorialScene2