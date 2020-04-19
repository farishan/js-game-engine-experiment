function Game(config){
    this.title = config.title
    this.currentScene = config.currentScene
    this.scenes = config.scenes
    this.forbiddenScenes = config.forbiddenScenes
    this.player = config.player
}

Game.prototype.save = function(){
    console.log('[Saving...]',this);
    let data = JSON.stringify(this);
    console.log('[Stringified:]', data)
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
        player = this.player;
        console.table(this);
    }else{
        console.error('game data not found.');
    }
}

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
            navs: [2, 3, 4, 0]
        },
        {
            id: 2,
            name: 'Area 1',
            navs: [1]
        },
        {
            id: 3,
            name: 'Area 2',
            navs: [1]
        },
        {
            id: 4,
            name: 'Area 3',
            navs: [1]
        }
    ],
    forbiddenScenes: [],
    player: {
        characters: []
    }
}