var playState = {
    create: function() {

        this.BGcycle = BGcycle

        if(this.BGcycle %2 === 0) {
        this.BG2 = game.add.sprite(0, 0, 'BG2')
        this.BG2.scale.setTo(0.8, 0.7)
        } else if(this.BGcycle %3 === 0) {
        this.BG3 = game.add.sprite(0, 0, 'BG3')
        this.BG3.scale.setTo(3, 3.5)
        } else {
        this.BG1 = game.add.sprite(0, 0, 'BG1')
        this.BG1.scale.setTo(0.8, 0.7) 
        }

        this.score = -1
        this.labelScore = game.add.text(20, 20, '0', {font: '30px Arial', fill: '#ffffff'});

        if (localStorage.getItem("highScore") === null) {
            this.highscore = 0
        } else {
            this.highscore = localStorage.getItem("highScore")
        }


        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.plane = game.add.sprite(50, 0, 'plane');
        this.plane.scale.setTo(0.08, 0.08);

        this.pipes = game.add.group();

        game.physics.arcade.enable(this.plane);

        this.plane.body.gravity.y = 1000;

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.jump, this);

        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

        this.plane.anchor.setTo(-0.2, 0.5)

        this.jumpsound = game.add.audio('jump')

        this.pointsound = game.add.audio('point')

        this.crashsound = game.add.audio('crash')


    },

    update: function() {
        if (this.plane.y < 0 || this.plane.y > 550) {
            game.state.start('gameover')
        }

        game.physics.arcade.collide(this.plane, this.pipes, this.hitPipe, null, this)

        if (this.plane.angle < 20) {
            this.plane.angle += 1;
        }



        console.log(this.plane.angle)
    },

    jump: function() {
        this.plane.body.velocity.y = -350;

        var animation = game.add.tween(this.plane)
        animation.to({ angle: -20 }, 100)
        animation.start();

        this.jumpsound.play()
    },

    addOnePipe: function(x, y) {
        this.pipe = game.add.sprite(x, y, 'pipe');
        this.pipes.add(this.pipe);

        game.physics.arcade.enable(this.pipe);
        this.pipe.body.immovable = true

        this.pipe.body.velocity.x = -200;

        this.pipe.checkWorldBounds = true;
        this.pipe.outOfBoundsKill = true;

    },

    addRowOfPipes: function() {

        this.hole = Math.floor(Math.random() * 5) + 1;

        for (var i = 0; i < 8; i++) {
            if (i != this.hole && i != this.hole + 1) {
                this.addOnePipe(400, i * 60 + 10);
            }
        }

        this.score++
        this.labelScore.text = this.score

        this.pointsound.play()

    },
    hitPipe: function() {

        if (this.plane.alive == false) {
            return
        }

        this.plane.alive ==false
        game.time.events.remove(this.timer);

        this.pipes.forEach(function(p) {

            p.body.velocity.x = 0;
            p.body.enable = false
        }, this);

        this.crashsound.play()

        if(this.score > this.highscore) {
            this.highscore = this.score
        }

        localStorage.setItem("highScore", this.highscore);

        highScore = this.highscore

        playerScore = this.score

        BGcycle++
    },


    restartGame: function() {
        game.state.start('restart');
    }
}

/*
    addRowOfPipes: function() {
        this.hole = Math.floor(Math.random() * 5) + 1;

        for (var i = 0; i < 8; i++) {
            if (i != this.hole && i != this.hole + 1) {
                this.addOnePipe(400, i * 60 + 10);
            }
        }

    },
    */