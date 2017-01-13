var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, 'loading...', { font: '30 px Courier', fill: "#00de45" });
        game.load.image('plane', 'assets/plane.png');
        game.load.image('pipe', 'assets/pipe.png');
        game.load.image('BG1', 'assets/sky1.jpg')
        game.load.image('BG2', 'assets/sky2.jpg')
        game.load.image('BG3', 'assets/sky3.gif')
        game.load.audio('jump', 'assets/foom_0.wav')
        game.load.audio('point', 'assets/sd_0.wav')
        game.load.audio('crash', 'assets/qubodup-crash.ogg')
    },

    create: function() {
        game.state.start('menu');
    }
}