function SceneManager(){
    this.name = "[SCENE-MANAGER]"
    this.logger = false;

    /* this function need global game object */
    this.setScene = (sceneId, game) => {
        if (this.logger) console.log(`${this.name} Prev scene id: `, game.currentScene)
        if(game.scenes && sceneId !== game.currentScene){
            for (let index = 0; index < game.scenes.length; index++) {
                const scene = game.scenes[index];
                if(scene.id === sceneId){
                    game.currentScene = sceneId;
                    if (this.logger) console.log(`${this.name} Current scene id: `, game.currentScene)
                }
            }
        }
    }

    this.setListeners = (game, renderer) => {
        let self = this;
        var buttons = document.querySelectorAll('.nav');

        for (let index = 0; index < buttons.length; index++) {
            const button = buttons[index];

            if(button.dataset.href){
                button.addEventListener('click', function(e){
                    let current = game.currentScene;
                    let target = e.target.dataset.href;

                    // Preventing idiot change the scene into current scene. (?)
                    if(target != current){
                        self.setScene(parseFloat(target), game);
                        renderer.render(game);
                        self.setListeners(game, renderer);
                    }
                });
            }
        }
    }

    return this;
}
