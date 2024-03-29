/* global Phaser */

// Copyright (c) 2022 Joseph Kwon No rights reserved
//
// Created by: Joseph Kwon
// Created on: June 2022
// This is the Splash scene

// Expand this particular scene using the code of another user
class SplashScene extends Phaser.Scene {
  /**
  *This method is the construtor.
  */
  constructor () {
    // run phaser's constructor code first, (super's role)
    super({ key: "splashScene" })
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
    console.log('Splash Scene')
    this.load.image('splashSceneBackground', './assets/splashSceneImage.png')
  }

  /**
  * Can be defined on your own scenes. 
  * Use it to create your game objects. 
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  create(data) {
    // adding a sprite, aka 2 dimensional image, AT coordinates... 0,0
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground')
    //center it
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  /**
  * Should be overridden by your own scenes. 
  * This method is called once per game step while the scene is running.
  * @param {number} time - The current time. 
  * @param {number} delta - The delta time in ms since the last frame. 
  */
  update(time, delta) {
    // making it last longer than a frame
    if (time > 3000) {
      this.scene.switch('titleScene')
    }
  }
}

// Variable name SplashScene 
export default SplashScene