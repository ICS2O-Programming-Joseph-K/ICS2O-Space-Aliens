/* global Phaser */

// Copyright (c) 2022 Joseph Kwon No rights reserved
//
// Created by: Joseph Kwon
// Created on: June 2022
// This is the Phaser3 configuration file


// import in the js file using the import statement "SplashScene"
import SplashScene from './splashScene.js'

// import in the js file using the import statement "TitleScene"
import TitleScene from './titleScene.js'

// import in the js file using the import statement "MenuScene"
import MenuScene from './menuScene.js'

// import in the js file using the import statement "MenuScene"
import GameScene from './gameScene.js'

// Our game scenes
// Any files added into slpashScene.js will exist inside "splashScene" variable
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()


/* Game scene */
const config = {
  type: Phaser.AUTO,
  // Dimensions of the game
  width: 1920, 
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      // creates bounding boxes (collision boxes that sends messages to physics module/property | false = invisible)
      debug: false,
    },
  },
  // set background color (kept at this color to fit logo)
  backgroundColor: 0x5f6e7a,
  scale: {
    // Makes game scene always fit to the full screen, if screen shrunk, it auto shrinks 
    mode: Phaser.Scale.FIT,
    // we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
}

/* game instance */
const game = new Phaser.Game(config)

// load scenes
// NOTE: remember any "key" os a global and CAN NOT BE reused
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)
game.scene.add("menuScene", menuScene)
game.scene.add("gameScene", gameScene)


// start title - game starts at splashScene
game.scene.start("gameScene")