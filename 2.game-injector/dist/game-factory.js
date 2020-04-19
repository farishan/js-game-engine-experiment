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
