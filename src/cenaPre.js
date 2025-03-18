// Classe cenaPre criada que é uma cena do Phaser

class cenaPre extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaPre' });
    }

    preload() {

        // Aqui onde carrega as imagens que serão utilizadas no cenaPre

        this.load.image('prestart', 'assets/Pre_Start.png');
        this.load.image('cursor', 'assets/cursor.png');
    }

    create() {
        // Aqui é para ser feito a transição de fade in

        this.cameras.main.fadeIn(1000); // Adiciona a transição FadeIn com duração de 1 segundo.

        // Aqui é para mudar o estilo do cursor do mouse

        this.input.setDefaultCursor('none'); // Define o cursor padrão como vazio
        this.cursor = this.add.image(0, 0, 'cursor').setScale(0.5); // define o cursor como um novo cursor
        this.cursor.setDepth(1000); // Define que o mouse irá sobrepor todos os objetos que tiveram valor abaixo de 1000

        this.input.on('pointermove', (pointer) => { // Se o mouse estiver em movimento
            this.cursor.setPosition(pointer.x, pointer.y); // Define a posição do novo cursor como a posição do mouse
        });

        this.events.on('resume', () => {
            this.input.setDefaultCursor('none');
        });

        // Adiciona tela de fundo

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'prestart') // define que a tela de fundo é igual ao tamanho da câmera dividido por 2 
            .setOrigin(0.5, 0.5) // define a origem da tela de fundo
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height); // define o tamanho da tela de fundo como da câmera

        // Cria um evento para quando o botão for clicado, a cena mude para cenaInicio

        this.input.on('pointerdown', () => {
            this.scene.start('cenaInicio'); // Inicia a tela inicial
        });
    }

    update() {
    }
}