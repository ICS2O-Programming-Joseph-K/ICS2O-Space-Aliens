/* global Phaser */

// Copyright (c) 2022 Joseph Kwon No rights reserved
//
// Created by: Joseph Kwon
// Created on: June 2022
// This is the Game Scene

// Expand this particular scene using the code of another user
class GameScene extends Phaser.Scene {
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

    // Property/module called physics for the movement of spaceship (helps with collision detection)
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')

    // create a group for the missiles
    this.missileGroup = this.physics.add.group()
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
      }
    }
    // an if statement for when the sapce bar is up
    if (keySpaceObj.isUp === true ) {
      this.fireMissile = false 
    }
  }
}

// Variable name SplashScene 
export default GameScene