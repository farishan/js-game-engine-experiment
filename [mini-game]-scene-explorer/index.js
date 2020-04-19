// scripts dibagi jadi 3 jenis,
// statics: yang selalu ada dimanapun
// sceneScripts: yang dipasang pada scene tertentu
// main: penghubung semuanya, dipasang terakhir

const _scriptObject = {
    statics: [
        'game',
        'scene-manager',
        'ui-renderer'
    ],
    main: 'main'
}

const skrinjek = new ScriptInjector()

window.onload = () => {
    skrinjek.init(_scriptObject)
}

// --------------------------------------
function ScriptInjector() {
    this.name = '[SKRINJEK]'

    this.container = document.createElement('div')
    this.sceneContainer = document.createElement('div')

    this.logger = false

    this.init = (scriptObject) => {
        this.container.style.position = 'absolute';
        this.sceneContainer.style.position = 'absolute';
        this.container.id = 'statics';
        this.sceneContainer.id = 'sceneScripts';
        document.body.appendChild(this.container);
        document.body.appendChild(this.sceneContainer);

        this.inject(scriptObject);
    }

    this.inject = (scriptObject) => {
        // injecting static scripts.
        // TODO: scriptObject validator
        if(scriptObject.statics){
            this.injectScripts('statics',scriptObject.statics, () => {
                if (this.logger) console.log(`${this.name} static scripts injected`)

                if (scriptObject.main) {
                    // finally, injecting main script.
                    this.injectScript('statics',scriptObject.main);
                }
            });
        }
    }

    this.injectScripts = (type, scripts, callback) => {
        var counter = 0;

        var injectLoop = () => {
            if (scripts[counter]) {
                this.injectScript(type, scripts[counter]).then(function(){
                    counter++;
                    if(counter >= scripts.length){
                        // All scripts injected.
                        callback();
                    }else{
                        injectLoop();
                    }
                });
            }else{
                callback();
            }
        }

        injectLoop();
    }

    this.injectScript = (type, name) => {
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

            if (type === 'scene') {
                this.sceneContainer.appendChild(script);
            }else{
                this.container.appendChild(script);
            }
        });
    }

    this.reset = () => {
        this.container.innerHTML = ''
    }

    this.resetSceneScripts = () => {
        this.sceneContainer.innerHTML = ''
    }

    return this;
}
