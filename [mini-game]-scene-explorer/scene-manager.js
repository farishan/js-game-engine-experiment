/*
    This file is for managing scene.

    Dependencies
    import game from game.js
*/

function SceneManager(){
    this.logger = false;

    this.setScene = (sceneId, game) => {
        if (this.logger) console.log('Prev scene id: ', game.currentScene)
        /* this function need global game object */
        if(game.scenes && sceneId !== game.currentScene){
            for (let index = 0; index < game.scenes.length; index++) {
                const scene = game.scenes[index];
                if(scene.id === sceneId){
                    game.currentScene = sceneId;
                    if (this.logger) console.log('Current scene id: ', game.currentScene)
                }
            }
        }
    }

    return this;
}

const sinner = new SceneManager()
