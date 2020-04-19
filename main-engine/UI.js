/*
    Dependencies:
        import skrinjek from 'index.js'
        import game from 'game.js'

--- User Interface Hierarchy ---

    - UI__game
        - UI__scenes
            - scene
            - scene
            - scene
                - other UI
*/

var _UI_config = {
    logger: false
}

// UI Local Config
const scenePrefix = 'scene_';

// 1. Create UI elements
var UI__game = document.createElement('main');
UI__game.classList.add('UI');
var UI__scenes = document.createElement('div');
UI__scenes.classList.add('scenes');

// Combine UIs
UI__game.appendChild(UI__scenes);

const UI = {
    init: function(){
        document.title = game.title;

        // Show the elements
        // *without this line, nothing will show.
        document.body.appendChild(UI__game);
    },
    createScene: function(scene){
        if(_UI_config.logger) console.log('[creating scene... 0%]')
        const steps = [
            '1. Reset scene scripts',
            '2. Create div element for scene, add class',
            '3. Attach scene id and name',
            '4. Inject all scene scripts',
            '5. Render scene navigation'
        ];
        var counter = 0;
        var div = null;

        function check(){
            counter++;
            if (counter === steps.length) {
                return div;
            }
        }

        // 1.
        skrinjek.reset();
        if(_UI_config.logger) console.log('[creating scene... 20%]')

        // Start creating scene
        div = document.createElement('div');
        div.classList.add('scene');
        if(_UI_config.logger) console.log('[creating scene... 40%]')

        // Attach scene id and name
        if(scene.id) div.id = scenePrefix + scene.id;
        if(scene.name) div.dataset.name = scene.name;
        if(isDev()){
            div.innerHTML += '[current scene:]' + scene.name + '<br/>';
        }
        if(_UI_config.logger) console.log('[creating scene... 60%]')

        // Inject all scene scripts dependencies
        if(scene.scripts && scene.scripts.length > 0){
            console.log(scene)
            skrinjek.injectScripts(scene.scripts, function(){
                console.log(scene.name, 'scripts injected')
            });
        }
        if(_UI_config.logger) console.log('[creating scene... 80%]')

        // Render scene's navigation
        if(scene.navs){
            this.renderNavs(scene.navs, div);
        }else{
            if(isDev()){
                console.error('Something wrong with the element navs.');
            }
        }
        if(_UI_config.logger) console.log('[creating scene... 100%]')

        return div;
    },
    renderNavs: function(navs, target){
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
                var button = document.createElement('button');
                button.innerHTML = game.scenes.find(x => x.id == nav).name;
                if(isDev()){
                    button.innerHTML = 'goto: [' + nav + ']' + game.scenes.find(x => x.id == nav).name;
                }
                button.dataset.href = nav;
                target.appendChild(button);
            }
        }
    }
}
