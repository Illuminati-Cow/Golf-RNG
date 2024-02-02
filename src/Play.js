class Play extends Phaser.Scene {
    Play() {

    }
    init () {
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_MIN_Y = 700
        this.SHOT_VELOCITY_MAX_Y = 1100
        this.SPAWN_POS = {x: width / 2, y: height - height / 10}
        this.WALL_VELOCITY = {x: 100, y:0}
    }
    preload(){
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }
    create() {
        this.grass = this.add.image(0, 0, 'grass',).setOrigin(0)
        this.cup = this.physics.add.sprite(width / 2, height / 10, 'cup')
        this.cup.body.setCircle(this.cup.width/4)
        this.cup.body.setOffset(this.cup.width/4)
        this.cup.body.setImmovable(true)

        this.ball = this.physics.add.sprite(this.SPAWN_POS.x, this.SPAWN_POS.y, 'ball')
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)

        this.input.on('pointerdown', (pointer) => {
            let shotDirection = pointer.y <= this.ball.y ? 1 : -1
            //this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X))
            this.ball.body.setVelocityX(this.ball.x - pointer.x )
            this.ball.body.setVelocityY(shotDirection * (Phaser.Math.Between(this.SHOT_VELOCITY_MIN_Y, this.SHOT_VELOCITY_MAX_Y)))
        })

        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            ball.x = this.SPAWN_POS.x
            ball.y = this.SPAWN_POS.y
        })
        // Walls
        this.wallA = this.physics.add.sprite(0, height / 4, 'wall').setOrigin(0)
        this.wallA.setX(Phaser.Math.Between(0 + this.wallA.width / 2, 0 + width - this.wallA.width/2))
        this.wallA.body.setImmovable(true)
        this.wallADir = 1
        
        let wallB = this.physics.add.sprite(0, height / 4, 'wall')
        wallB.setX(Phaser.Math.Between(0 + wallB.width / 2, 0 + width - wallB.width/2))
        wallB.body.setImmovable(true)
        this.walls = this.add.group([this.wallA, wallB])

        this.physics.add.collider(this.ball, this.walls)
        // Oneway Wall
        this.oneWay = this.physics.add.sprite(width / 2, height / 4*3, 'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width / 2, width - this.oneWay.width))
        this.oneWay.body.setImmovable(true)
        this.oneWay.body.checkCollision.down = false
        this.physics.add.collider(this.ball, this.oneWay)

        this.shots = 0
        this.holeins = 0
        this.add.text(0, 0, "Shots: ").setOrigin(0).setScale(2)
        this.shotCounter = this.add.text(width / 10, 0, "").setOrigin(0).setScale(2)
        this.add.text(0, width / 10, "HoleIns: ").setOrigin(0).setScale(2)
        this.holeInCounter = this.add.text(width / 10, width / 10, "").setOrigin(0).setScale(2)
    }
    update() {
        if (this.wallA.x >= width - this.wallA.width)
            this.wallADir = -1
        else if (this.wallA.x <= 0)
            this.wallADir = 1
        this.wallA.body.setVelocityX(this.WALL_VELOCITY.x * this.wallADir)
        this.wallA.body.setVelocityY(this.WALL_VELOCITY.y * this.wallADir)
    }
}