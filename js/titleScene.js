/* global Phaser */

// Copyright (c) 2022 Joseph Kwon No rights reserved
//
// Created by: Joseph Kwon
// Created on: June 2022
// This is the Title Scene

// Expand this particular scene using the code of another user
class TitleScene extends Phaser.Scene {
  /**
  *This method is the construtor.
  */
  constructor () {
    // run phaser's constructor code first, (super's role)
    super({ key: "titleScene" })

    this.titleSceneBackgroundImage = null
    // This variable will hold text
    this.titleSceneText= null
    // For text styling - goes down to "ceate"
    this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' }
    
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
    console.log('Title Scene')
    // image we are using from assets
    this.load.image('titleSceneBackground', 'assets/menuBackground.gif')
  }

  /**
  * Can be defined on your own scenes. 
  * Use it to create your game objects. 
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  create(data) {
    // since loaded in preload we can load it and show it up on the screen, middle of the scene - scale increases image size by the magnification number 
    this.titleSceneBackgroundImage = this.add.sprite(0,0, 'titleSceneBackground').setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2
    // adding in text to this particular scene - where you want this scene) 
    this.titleSceneText = this.add.text(1920 / 2, 1080 / 2 + 350, 'Extraterrestrial Invasion', this.titleSceneTextStyle).setOrigin(0.5)
  }

  /**
  * Should be overridden by your own scenes. 
  * This method is called once per game step while the scene is running.
  * @param {number} time - The current time. 
  * @param {number} delta - The delta time in ms since the last frame. 
  */
  update(time, delta) {
    // pass
    // making it last longer than a frame
    if (time > 6000) {
      this.scene.switch('menuScene')
    }
  }
}

// Variable name SplashScene 
export default TitleScene
