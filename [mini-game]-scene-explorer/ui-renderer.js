function UIRenderer(){
    this.logger = false;

    this.scriptsInjector = null;

    this.scenePrefix = 'scene_';

    this.UI__game = document.createElement('main');

    this.UI__scenes = document.createElement('div');

    this.init = (game, scriptsInjector) => {
        this.scriptsInjector = scriptsInjector;
        this.UI__game.classList.add('UI');
        this.UI__scenes.classList.add('scenes');
        this.UI__game.appendChild(this.UI__scenes);

        document.title = game.title;
        document.body.appendChild(this.UI__game);
    }

    this.render = (game) => {
        this.scriptsInjector.resetSceneScripts();
        var id = game.currentScene;
        var scenes = game.scenes;
        // 1. Reset UI__scenes
        this.UI__scenes.innerHTML = '';

        // 2. Convert scene id to scene object
        var sceneObject = this.getSceneObject(id, scenes);

        if(sceneObject !== null){
            console.log('scene object:', sceneObject)

            // 3. Create scene
            var scene = this.createScene(sceneObject, (scene) => {
                console.log(scene)

                // 4. Render scene's navigation
                if(sceneObject.navs){
                    this.renderNavs(sceneObject, scene, game);
                }else{
                    console.error('Something wrong with the element navs.');
                }

                // 5. Add scene's scripts
                // Inject all scene scripts dependencies
                if(sceneObject.scripts && sceneObject.scripts.length > 0){
                    this.scriptsInjector.injectScripts('scene',sceneObject.scripts, function(){
                    });
                }

                this.UI__scenes.appendChild(scene);
            });
        }
    }

    this.getSceneObject = (id, scenes) => {
        var object = null;

        for (let index = 0; index < scenes.length; index++) {
            const scene = scenes[index];
            if(scene.id === id){
                object = scene;
            }
        }

        return object;
    }

    this.createScene = (scene, callback) => {
        if(this.logger) console.log('[creating scene... 0%]')
        const steps = [
            '1. Create div element for scene, add class',
            '2. Attach scene id and name',
            '3. Inject all scene scripts',
            '4. Render scene navigation'
        ];
        var counter = 0;
        var div = null;

        function check(){
            counter++;
            if (counter === steps.length) {
                return div;
            }
        }

        // Start creating scene
        div = document.createElement('div');
        div.classList.add('scene');
        if(this.logger) console.log('[creating scene... 40%]')

        // Attach scene id and name
        if(scene.id) div.id = this.scenePrefix + scene.id;
        if(scene.name) div.dataset.name = scene.name;
        if(this.logger) div.innerHTML += '[current scene:]' + scene.name + '<br/>';
        if(this.logger) console.log('[creating scene... 60%]')

        // return div;
        callback(div);
    }

    this.renderNavs = (scene, target, game) => {
        var navs = scene.navs

        for (let index = 0; index < navs.length; index++) {
            const nav = navs[index];

            // There is some nav that require a character,
            // So we will check first if the player have one

            var navIsRenderable = false;
            if(game.player.characters.length > 0){
                navIsRenderable = true;
            }else{
                // The player have no character. So,
                // Filter nav that is forbidden to render
                navIsRenderable = game.forbiddenScenes.indexOf(nav) === -1
            }

            if(navIsRenderable){
                let self = this;
                var button = document.createElement('button');
                button.innerHTML = game.scenes.find(x => x.id == nav).name;
                if(this.logger){
                    button.innerHTML = 'goto: [' + nav + ']' + game.scenes.find(x => x.id == nav).name;
                }
                button.dataset.href = nav;

                button.addEventListener('click', function(e){
                    let target = e.target.dataset.href;
                    let current = scene.id;

                    // Preventing idiot change the scene into current scene. (?)
                    if(target != current){
                        game.currentScene = parseInt(target);

                        self.scriptsInjector.resetSceneScripts();
                        self.render(game)
                    }
                })

                target.appendChild(button);
            }
        }
    }

    return this;
}

const winderer = new UIRenderer();
