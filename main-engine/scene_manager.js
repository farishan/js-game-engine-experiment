/*
    This file is for managing scene.

    Dependencies
    import game from game.js
    import UI__scenes from UI.js
*/

const sceneManager = {
    init: function(){
        // Inject all scenes
        // this.injectScenes(game.scenes);

        // Find current scene from the game
        var currentScene = game.scenes.find(x => x.id == game.currentScene);

        // Inject the scene
        this.injectScene(currentScene);
    },
    addNavListener(){
        var self = this;
        var buttons = document.querySelectorAll('button');
        for (let index = 0; index < buttons.length; index++) {
            const button = buttons[index];
            button.addEventListener('click', function(e){
                let target = e.target.dataset.href;
                let current = game.currentScene;

                // Preventing idiot change the scene into current scene. (?)
                if(target != current){
                    game.currentScene = game.scenes.find(x => x.id == target);

                    // Append a scene
                    // self.injectScene(game.currentScene);

                    // Change the scene
                    self.changeScene(game.currentScene);
                }
            })
        }
    },
    setScene: function(sceneId){
        if(sceneId !== game.currentScene){
            for (let index = 0; index < game.scenes.length; index++) {
                const scene = game.scenes[index];
                if(scene.id === sceneId){
                    game.currentScene = sceneId;
                }
            }
        }
    },
    changeScene(scene){
        // Change a scene mean:
        // 1. Reset scenes container first
        UI__scenes.innerHTML = '';
        // 2. Then inject new scene
        this.injectScene(scene);
    },
    injectScene(scene){
        UI__scenes.appendChild(UI.createScene(scene));
        this.addNavListener();
    },
    injectScenes: function(scenes){
        UI__scenes.innerHTML = '';
        for (let index = 0; index < scenes.length; index++) {
            const scene = scenes[index];
            this.injectScene(scene);
        }
    }
}
