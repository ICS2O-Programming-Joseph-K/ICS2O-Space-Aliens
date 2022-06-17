/* global Phaser */

// Copyright (c) 2022 Joseph Kwon No rights reserved
//
// Created by: Joseph Kwon
// Created on: June 2022
// This is the Tutorial Scene

// Expand this particular scene using the code of another user
class TutorialScene extends Phaser.Scene {

  /**
  *This method is the construtor.
  */
  constructor () {
    // run phaser's constructor code first, (super's role)
    super({ key: "tutorialScene" })

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

    // Variable for death | tutorial
    this.tutorialText = null
    this.tutorialText = { font: '65px Arial', fill: '#ff0000', align: 'center' }
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
    console.log('Tutorial Scene')

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
    this.load.audio('laser', 'assets/laser1.wav')
    this.load.audio('explosion', 'assets/barrelExploding.wav')
    this.load.audio('bomb', 'assets/bomb.wav')
    this.load.audio('Ambient', 'audio/Ambient.mp3')
    this.load.audio('click', 'audio.click.wav')

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
    
    // Stop any current audio and repkace with ambience 
    this.game.sound.stopAll()
    this.sound.play('Ambient')

    // Show score on screen
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    // Property/module called physics for the movement of spaceship (helps with collision detection)
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')

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

      followOffset: { y: this.ship.height * 0.5 }
    })

    // Tutorial text
    this.tutorialText = this.add.text(1920 / 2, 1080 / 4, 'Arrow keys are used for movement.\nSpace bar is used for projectiles.', this.tutorialText).setOrigin(0.5)

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
    this.scene.start('tutorialScene2')
    }
  
    // code for the clickButton1 function
  clickButton1 () {
    this.sound.play('click')
    // brings user to gameScene on click
    this.scene.start('menuScene')
  }
}

// Variable name TutorialScene 
export default TutorialScene 