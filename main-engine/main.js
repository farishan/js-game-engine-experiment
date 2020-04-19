/*
    This file is for controlling all scripts together.
*/

/*
    Dependencies

    import UI from UI.js
    import game from game.js
    import sceneManager from scene_manager.js
    import _config from config.js

    injectScript from index.js
*/

console.log('* All sets. Here we go!')

UI.init();
sceneManager.setScene(game.currentScene);
sceneManager.init();
game.load();

if(_config.mode == 'development'){
    skrinjek.injectScript('todo')
}