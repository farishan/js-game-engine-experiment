var div = document.createElement('div');
div.innerHTML = '<h3>Forest</h3>';

var button = document.createElement('button');
button.innerHTML = 'Add a rock to inventory';
button.onclick = function(){
    game.player.characters[0].inventory.push('rock')
    button.innerHTML = 'rock added.';
    button.disabled = true;
    div.innerHTML += JSON.stringify(game.player.characters);
    console.log(game.player)
}

div.appendChild(button);
UI__scenes.appendChild(div);
