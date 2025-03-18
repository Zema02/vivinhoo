// Configura parametros como as cenas que terão no jogo, tamanho da tela e física que o jogo segue.
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade', // define fisica padrão como arcade
        arcade: {
            gravity: { y: 0 }, // define a gravidade
            debug: false
        }
    },
    scene: [cenaPre, cenaInicio, charSelecao, cenaConfig, cenaCreditos, movChar, cenaHist, movCharTwo, faseUm, finalUm], // define as cenas do jogo 
    scale: {
        mode: Phaser.Scale.FIT,  // Mantém a proporção e ajusta o jogo à tela sem cortar
        width: 800, // Mantém a largura fixa
        height: 600, // Mantém a altura fixa
        parent: 'game-container'  // Define um contêiner HTML específico
    }
};

// Cria um novo jogo com as configurações definidas

const game = new Phaser.Game(config);
