// ================================================
console.log("* Finish something, bitch. FUCK YOU.")
// ================================================

/*
    !!! WARNING

    1. This script is for INJECTING scripts ONLY.
    2. DO NOT EDIT, except want to mess with injecting script into a scene.

    How to inject scripts:
    - Pure and static scripts first. script with no dependencies. (ex: config)
    - Explain dependencies on the first line of not-pure scripts.
*/

var $engine = {};

const _index_config = {
    name: '[INJECTOR]',
    logger: false
};

const scriptContainer = {
    statics: [
        'config',
        'game'
    ],
    others: [
        'UI',
        'scene_manager',
        'player'
    ],
    main: 'main'
}
const _scriptObject = {
    statics: [
        'config',
        'game'
    ],
    others: [
        'UI',
        'scene_manager',
        'player'
    ],
    main: 'main'
}
$engine.scripts = scriptContainer;

var _scriptsContainer = document.createElement('div');
_scriptsContainer.style.position = 'absolute';

window.onload = function(){
    // injecting the almighty scripts container.
    injectToDocument(_scriptsContainer);

    // injecting static scripts.
    injectScripts(scriptContainer.statics, function(){
        if (_index_config.logger) console.log(`${_index_config.name} static scripts injected`)

        // injecting other scripts.
        injectScripts(scriptContainer.others, function(){
            if (_index_config.logger) console.log(`${_index_config.name} other scripts injected`)

            // finally, injecting main script.
            injectScript(scriptContainer.main);
        });
    });
}

function injectScript(name) {
    return new Promise(function(resolve, reject){
        var script = document.createElement('script');
        script.src = './'+name+'.js';
        script.onload = function(){
            if (_index_config.logger) console.log(`${_index_config.name} * ${name} script injected.`)
            resolve();
        }
        _scriptsContainer.appendChild(script);
    });
}

function injectScripts(scripts, callback) {
    var counter = 0;

    injectLoop();

    function injectLoop(){
        injectScript(scripts[counter]).then(function(){
            counter++;
            if(counter >= scripts.length){
                // All scripts injected.
                callback();
            }else{
                injectLoop();
            }
        });
    }
}

function injectToDocument(element){
    document.body.appendChild(element);
}

function resetScripts(){
    _scriptsContainer.innerHTML = '';
}

/*-------------------------------------
GLOBAL FUNCTIONS

Why global functions goes to index.js?
Because it was loaded first.
*/

function ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};
