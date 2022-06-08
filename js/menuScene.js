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
    this.load.image('menuSceneBackground', 'assets/aliens_screen_image2.jpg')
    // Load in the image that is going to be the button
    this.load.image('startButton', 'assets/start.png')
  }

  /**
  * Can be defined on your own scenes. 
  * Use it to create your game objects. 
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  create(data) {
    // grab the image from assets and center it on screen
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    // Add the start button as a sprite, center slightly below 100 pixels
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    // Making the button interactive
    this.startButton.setInteractive({ useHandCursor: true })
    // When the person clicks button (pointerdown) ---> function call to happen
    this.startButton.on('pointerdown', () => this.clickButton())
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
    // brings user to gameScene on click
    this.scene.start('gameScene')
  }
}

// Variable name SplashScene 
export default MenuScene