var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

var playerScore = 0;
var highScore = 0;
var BGcycle = 1;
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('restart', restartState);
game.state.add('gameover', gameoverState)


game.state.start('boot');