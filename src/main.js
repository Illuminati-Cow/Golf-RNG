// Code Practice: Making a Scene
// Name: Cole Falxa-Sturken
// Date: 

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:0},
            debug: true,
        }
    },
    scene: [Play]
}

let game = new Phaser.Game(config)

let { width, height } = game.config