// Character factory
function Character(data){
    this.ID = ID();
    this.name = data.name;
    this.inventory = [];

    return this;
}

var div = document.createElement('div');

if(game.player.characters.length > 0){
    // Player already have character(s). Render.
    renderCharacter(game.player.characters[0], div);
    // div.innerHTML = JSON.stringify(game.player);

    // Find character scene id
    var characterScene = findCharacterScene();
    characterScene.appendChild(div);
}else{
    // Display character creator
    div.innerHTML = '<h3>Create Your Character</h3>';

    var input_name = document.createElement('input');
    input_name.placeholder = 'Character\'s Name';

    var submit = document.createElement('button');
    submit.innerHTML = 'Create';
    submit.onclick = function(){

        // Create new character
        // TODO: validator
        if(input_name.value && input_name.value !== ''){
            var character = new Character({
                name: input_name.value
            });

            game.player.characters.push(character);
            game.save();

            // Change the scene
            game.currentScene = game.scenes.find(x => x.id == 1.1);
            sceneManager.changeScene(game.currentScene);
        }
    }

    // Render character creator
    div.appendChild(input_name);
    div.appendChild(submit);
    UI__scenes.appendChild(div);
}

function renderCharacter(characterObject, container){
    var char__div = document.createElement('div');
    char__div.setAttribute('style', 'padding:1rem')

    var char__ID = document.createElement('p');
    char__ID.innerHTML = characterObject.ID;
    char__div.appendChild(char__ID);

    var char__name = document.createElement('h1');
    char__name.innerHTML = 'Name:' + characterObject.name;
    char__div.appendChild(char__name);

    var char__inv = document.createElement('ul');
    char__inv.setAttribute('style', 'display:flex;margin:0;padding:0')
    characterObject.inventory.forEach(item => {
        var char__item = document.createElement('li');
        char__item.setAttribute('style', 'list-style-type:none;border:1px solid;padding:0.5rem;')
        char__item.innerHTML = item
        char__inv.appendChild(char__item);
    });
    char__div.appendChild(char__inv);

    container.appendChild(char__div);
}

function findCharacterScene(){
    var id = '';
    for (let index = 0; index < game.scenes.length; index++) {
        const scene = game.scenes[index];
        if(scene.name.toLowerCase() === 'characters'){
            id = scene.id;
        }
    }
    return document.getElementById('scene_'+id);
}