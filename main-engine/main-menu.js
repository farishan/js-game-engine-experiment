var div = document.createElement('div');
div.innerHTML = '<h3>Main Menu</h3>';

var button = document.createElement('button');
button.innerHTML = 'New Game';
button.onclick = function(){
    console.log('new game')
}
div.appendChild(button);

var button1 = document.createElement('button');
button1.innerHTML = 'Load Game';
button1.onclick = function(){
    console.log('load game')
}
div.appendChild(button1);

var button2 = document.createElement('button');
button2.innerHTML = 'Credits';
button2.onclick = function(){
    console.log('credits')
}
div.appendChild(button2);

UI__scenes.appendChild(div);
