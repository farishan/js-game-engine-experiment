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

var $game = {};
var $engine = {};

const _scriptObject = {
    statics: [
        'config',
        'game'
    ],
    others: [
        'UI',
        'scene_manager'
    ],
    main: 'main'
}

$engine.scriptObject = _scriptObject;

const skrinjek = new ScriptInjector()

window.onload = function(){
    skrinjek.init($engine.scriptObject)
}

/*-------------------------------------
GLOBAL FUNCTIONS

Why global functions goes to index.js?
Because it was loaded first.
*/

function ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function ScriptInjector() {
    this.name = '[SKRINJEK]'

    this.container = document.createElement('div')

    this.logger = false

    this.init = (scriptObject) => {
        this.container.style.position = 'absolute';
        document.body.appendChild(this.container);

        this.inject(scriptObject);
    }

    this.inject = (scriptObject) => {
        // injecting static scripts.
        // TODO: scriptObject validator
        if(scriptObject.statics && scriptObject.others && scriptObject.main){
            this.injectScripts(scriptObject.statics, () => {
                if (this.logger) console.log(`${this.name} static scripts injected`)

                // injecting other scripts.
                this.injectScripts(scriptObject.others, () => {
                    if (this.logger) console.log(`${this.name} other scripts injected`)

                    // finally, injecting main script.
                	if(scriptObject.main){
	                    this.injectScript(scriptObject.main);
                	}
                });
            });
        }
    }

    this.injectScripts = (scripts, callback) => {
        var counter = 0;

        var injectLoop = () => {
            this.injectScript(scripts[counter]).then(function(){
                counter++;
                if(counter >= scripts.length){
                    // All scripts injected.
                    callback();
                }else{
                    injectLoop();
                }
            });
        }

        injectLoop();
    }

    this.injectScript = (name) => {
        return new Promise((resolve, reject) => {
            var script = document.createElement('script');
            script.src = './'+name+'.js';
            script.onload = () => {
                if (this.logger) console.log(`${this.name} * ${name} script injected.`)
                resolve();
            }
            script.onerror = function(e){
                console.log('tes', e)
            }
            this.container.appendChild(script);
        });
    }

    this.reset = () => {
        this.container.innerHTML = ''
    }

    return this;
}