var game = new Game(_gameConfig);

const sinner = new SceneManager();
const winderer = new UIRenderer();

sinner.setScene(0, game);
winderer.init(game, skrinjek);
winderer.render(game);
sinner.setListeners(game, winderer);