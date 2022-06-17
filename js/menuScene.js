/* global Phaser */

// Copyright (c) 2022 Joseph Kwon No rights reserved
//
// Created by: Joseph Kwon
// Created on: June 2022
// This is the Menu Scene

// Expand this particular scene using the code of another user
class MenuScene extends Phaser.Scene {
  /**
  *This method is the construtor.
  */
  constructor () {
    // run phaser's constructor code first, (super's role)
    super({ key: "menuScene" })

    // variable that can hold the image for the background
    this.menuSceneBackgroundImage = null
    // Creating a button | similar to adding in an image
    this.startButton = null
    // Creating a button for tutorial 
    this.tutorialButton = null
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
    console.log('Menu Scene')
    // Load the image
    this.load.image('menuSceneBackground', 'assets/Mars.webp')
    // Load in the image that is going to be the button
    this.load.image('startButton', 'assets/start.png')

    // Load in the image that is going to be tutorial button
    this.load.image('tutorialButton', 'assets/tutorial.png')

    // Sound | Load in sound
    this.load.audio('backgroundMusic', 'audio/backgroundmusic.mp3')

    this.load.audio('click', 'audio/click.wav')
  }

  /**
  * Can be defined on your own scenes. 
  * Use it to create your game objects. 
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  create(data) {


    
    // grab the image from assets and center it on screen
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(3.0)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    // Background music | Audio
        // Background music
    this.sound.play('backgroundMusic')

    // Add the start button as a sprite, center slightly below 100 pixels
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    // Making the button interactive
    this.startButton.setInteractive({ useHandCursor: true })
    // When the person clicks button (pointerdown) ---> function call to happen
    this.startButton.on('pointerdown', () => this.clickButton())


  // Add in the tutorial button as a sprite, centering it however
  this.tutorialButton = this.add.sprite(1920 / 2, (1080 / 2) + 300, 'tutorialButton')
    // Making the button interactive
    this.tutorialButton.setInteractive({ useHandCursor: true })
    // When the person clicks button (pointerdown) ---> function call to happen
    this.tutorialButton.on('pointerdown', () => this.clickButton1())
    }

  /**
  * Should be overridden by your own scenes. 
  * This method is called once per game step while the scene is running.
  * @param {number} time - The current time. 
  * @param {number} delta - The delta time in ms since the last frame. 
  */
  update(time, delta) {
   // pass
  }

  // code for the clickButton function
  clickButton () {
    this.sound.play('click')
    // brings user to gameScene on click
    this.scene.start('gameScene')
  }
  // code for the tutorialButton function
  clickButton1 () {
    this.sound.play('click')
      
    //brings user to the tutorialScene on click
    this.scene.start('tutorialScene')
  }
}

// Variable name SplashScene 
export default MenuScene