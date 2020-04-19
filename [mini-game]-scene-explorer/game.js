// Game Global Variables
var _gameConfig = {
    title: 'Game Title',
    currentScene: 0,
    scenes: [
        {
            id: 0,
            name: 'Main Menu',
            navs: [1]
        },
        {
            id: 1,
            name: 'Main Area',
            scripts: ['main-area'],
            navs: [0, 2]
        },
        {
            id: 2,
            name: 'Forest',
            scripts: ['forest'],
            navs: [1]
        }
    ],
    forbiddenScenes: [],
    player: {
        characters: []
    }
}

function Game(config){
    this.logger = false;
    this.title = config.title
    this.currentScene = config.currentScene
    this.scenes = config.scenes
    this.forbiddenScenes = config.forbiddenScenes
    this.player = config.player
}

Game.prototype.save = function(){
    if(this.logger) console.log('[Saving...]',this);
    let data = JSON.stringify(this);
    if(this.logger) console.log('[Stringified:]', data)
	localStorage.setItem(this.title.split(' ').join('_') + '_data', data);
};

Game.prototype.getSavedGame = function(){
    var item = false;
    const itemName = this.title.split(' ').join('_') + '_data';

    if(localStorage.getItem(itemName)){
        item = localStorage.getItem(itemName);
    }

    return item;
};

Game.prototype.load = function(){
    if(this.getSavedGame()){
        let config = new Game(JSON.parse(this.getSavedGame()));
        this.title = config.title
        this.currentScene = config.currentScene
        this.scenes = config.scenes
        this.forbiddenScenes = config.forbiddenScenes
        this.player = config.player
        if(this.logger) console.table(this);
    }else{
        console.error('game data not found.');
    }
}

var game = new Game(_gameConfig)
