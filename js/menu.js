var menuState = {
    create: function() {
        game.stage.backgroundColor = '#71c5cf';

        var nameLabel = game.add.text(80, 200, 'Flappy Plane', { font: '50px Arial', fill: '#00AA99' });
        var nameLabel = game.add.text(80, game.world.height - 80, 'Press "W" to Start', { font: '25px Arial', fill: '#AA9900' });

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);
    },

    start: function() {
        game.state.start('play');
    }
}