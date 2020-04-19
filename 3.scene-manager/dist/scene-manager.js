function SceneManager(){
    this.name = "[SCENE-MANAGER]"
    this.logger = true;

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

    return this;
}
