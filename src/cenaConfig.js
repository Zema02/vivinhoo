// Esse .js é referente a tela de configurações do jogo

class cenaConfig extends Phaser.Scene {

    constructor() {
        super({ key: 'cenaConfig' });
    }

    preload() {

        // Aqui onde carrega as imagens que serão utilizadas na cenaConfig

        this.load.image('TelaConfig', 'assets/Settings.png');
        this.load.image('ReturnBotao', 'assets/botoes/ReturnBotao.png');
        this.load.image('MenuConfig', 'assets/menu/MenuConfig.png');
        this.load.image('toggleOn', 'assets/botoes/toggleOn.png');
        this.load.image('toggleOff', 'assets/botoes/toggleOff.png');
    }

    create() {

        // Aqui é para ser feito a transição de fade in

        this.cameras.main.fadeIn(1000);  // Adiciona a trasição em FadeIn durante a mudança de tela

        // Aqui é para mudar o estilo do cursor do mouse

        this.input.setDefaultCursor('none'); // Tira a imagem do cursor enquanto estiver na tela do jogo
        this.cursor = this.add.image(0, 0, 'cursor').setScale(0.5); // Adiciona uma nova imagem de cursor
        this.cursor.setDepth(1000); // Define que o mouse irá sobrepor todos os objetos que tiveram valor abaixo de 1000

        this.input.on('pointermove', (pointer) => { // Se o mouse estiver em movimento
            this.cursor.setPosition(pointer.x, pointer.y); // Define a posição do novo cursor como a posição do mouse
        });

        this.events.on('resume', () => {
            this.input.setDefaultCursor('none');
        });

        // Adiciona tela de fundo

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'TelaConfig') // Adiciona a imagem de fundo como o tamanho da camera dividido por 2;
            .setOrigin(0.5, 0.5) // Define o ponto de origem
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Define o tamanho da tela como da imagem

        this.add.image(400, 100, 'titulo').setScale(0.5);

        // Botão de Retorno

        const voltarBotao = this.add.image(70, 20, 'ReturnBotao') // Cria o botão de voltar para tela inicial
            .setOrigin(1, 0) // Define a origem do botão de voltar
            .setScale(0.4) // define a escala do botão de voltar
            .setInteractive(); // torna o botão clicável

        // Menu de Configurações

        const abaMenu = this.add.image(400, 300, 'MenuConfig')
            .setScale(0.5) // define a escala da aba de menu

        // Caso o botão de retorno seja clicado, a cena muda para cenaInicio

        voltarBotao.on('pointerdown', () => { // se o botão de voltar for clidado:
            const cenaAnterior = this.scene.settings.data?.cenaAnterior; // Pega a cena anterior salva

            if (cenaAnterior) {
                this.scene.start(cenaAnterior); // Retorna para a cena anterior

            } else {
                console.warn("Nenhuma cena anterior registrada.");
            }
        });

        // Efeito de hover no botão de retorno

        voltarBotao.on('pointerover', () => { // se o mouse estiver sobre o botão de voltar
            this.tweens.add({ // cria animação para o botão
                targets: voltarBotao, // define o alvo da animação como o voltarBotao
                scale: 0.41,  //Aumenta o tamanho do botão
                duration: 200, //define a duração como 0.2 segundos
                ease: 'Linear' // Define o movimento da animação como linear(constante)
            });
        });

        voltarBotao.on('pointerout', () => {
            this.tweens.add({
                targets: voltarBotao, // define o alvo da animação como o voltarBotao
                scale: 0.4,  //Diminui o tamanho do botão
                duration: 200, //define a duração como 0.2 segundos
                ease: 'Linear' // Define o movimento da animação como linear(constante)
            });
        });

        // Botão de Controle da Música

        let mudarEstado = this.sound.get('backgroundMusic'); // Variável de estado da música;

        if (passeiPorAqui) {
            mudarEstado = this.sound.get('musicaMovChar');
        }

        const botaoMusica = this.add.image(510, 259, mudarEstado && mudarEstado.mute ? 'toggleOff' : 'toggleOn') // cria o botão de mudar música
            .setOrigin(0.5, 0.5) // Define a origem do botão de musica
            .setScale(0.5) // define a escala do botao de musica
            .setInteractive(); // torna o botão de musica clicável

        // Caso o botão de controle da música esteja ativado e seja clicado, a música é mutada e vice versa.

        botaoMusica.on('pointerdown', () => {

            mudarEstado.mute = !mudarEstado.mute;  // A variável mudarEstado será diferente do valor anterior (se for true, se tornará false)

            if (!mudarEstado.mute) {
                botaoMusica.setTexture('toggleOff');  // Muda a imagem do botão para "desligado"
                mudarEstado.mute = true; // Muta a música
            } else {
                botaoMusica.setTexture('toggleOn'); // Muda a imagem do botão para "ligado"
                mudarEstado.mute = false; // Desmuta a música
            }
        });

        // Botão de Controle do Áudio

        let mudarEstado2 = this.sound; // Variável de estado de áudio

        const botaoAudio = this.add.image(510, 344, mudarEstado2 && mudarEstado2.mute ? 'toggleOff' : 'toggleOn') // Cria a imagem de ligar/desligar audio
            .setOrigin(0.5, 0.5) // define a origem
            .setScale(0.5) // define a escala
            .setInteractive(); // torna a imagem clicável

        // Caso o botão de controle do áudio esteja ativado e seja clicado, o áudio é mutado e vice versa.

        botaoAudio.on('pointerdown', () => {
            mudarEstado2.mute = !mudarEstado2.mute;   // A variável toggleState2 será diferente do valor anterior (se for true, se tornará false)

            if (!mudarEstado2.mute) {
                botaoAudio.setTexture('toggleOff');  // Muda a imagem do botão para "desligado"
                mudarEstado2.mute = true; // Muta o audio
            } else {
                botaoAudio.setTexture('toggleOn'); // Muda imagem do botão para "ligado"
                mudarEstado2.mute = false; // Desmuta o audio
            }
        });
    }
}
