"use strict";

function ScriptInjector() {
    this.name = '[SCRIPT-INJECTOR]';
    this.logger = true;

    this.staticContainer = document.createElement('div');
    this.dynamicContainer = document.createElement('div');

    this.init = (scriptObject) => {
        if (this.logger) {
            console.log(`${this.name} `, _scriptObject)
            var logWindow = document.createElement('div');
            logWindow.innerHTML = 'Script Object :'+JSON.stringify(scriptObject);
            logWindow.setAttribute('style', 'color:darkgray;font-size:0.8em')
            this.staticContainer.appendChild(logWindow);
        }

        this.setup();
        this.inject(scriptObject);
    }

    this.setup = () => {
        this.staticContainer.style.position = 'absolute';
        this.staticContainer.id = 'static-scripts-container';
        document.body.appendChild(this.staticContainer);
        this.dynamicContainer.style.position = 'absolute';
        this.dynamicContainer.id = 'dynamic-scripts-container';
        document.body.appendChild(this.dynamicContainer);
    }

    this.inject = (scriptObject) => {
        // injecting static scripts.
        // TODO: scriptObject validator
        if(scriptObject.statics){
            this.injectScripts(true, scriptObject.statics, () => {
                if (this.logger) console.log(`${this.name} static scripts injected`)

                if (scriptObject.main) {
                    // finally, injecting main script.
                    this.injectScript(true, scriptObject.main);
                }
            });
        }
    }

    this.injectScripts = (isStatic, scripts, callback) => {
        var counter = 0;

        var injectLoop = () => {
        	if (scripts[counter]) {
	            this.injectScript(isStatic, scripts[counter]).then(function(){
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

    this.injectScript = (isStatic, name) => {
        return new Promise((resolve, reject) => {
            var script = document.createElement('script');
            script.src = './'+name+'.js';
            script.onload = () => {
                if (this.logger) console.log(`${this.name} * ${name} script injected.`)
                resolve();
            }
            script.onerror = function(e){
                console.log('error:', e)
                reject();
            }

            if (isStatic) {
                this.staticContainer.appendChild(script);
            }else{
                this.dynamicContainer.appendChild(script);
            }
        });
    }

    this.reset = () => {
        this.dynamicContainer.innerHTML = ''
    }

    return this;
}
