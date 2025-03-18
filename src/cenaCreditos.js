// Classe cenaCreditos criada que é uma extensão da cena do Phaser

class cenaCreditos extends Phaser.Scene {

    constructor() {
        super({ key: 'cenaCreditos' });
    }

    preload() {

        // Aqui onde carrega as imagens que serão utilizadas na cenaCreditos

        this.load.image('fundoCreditos', 'assets/Creditos.png');
        this.load.image('botaoVoltar', 'assets/botoes/ReturnBotao.png');
        this.load.image('Nomes', 'assets/Nomes.png');
    }

    create() {

        // Aqui é para ser feito a transição de fade in

        this.cameras.main.fadeIn(1000);

        // Aqui é para mudar o estilo do cursor do mouse

        this.input.setDefaultCursor('none'); // Tira a imagem do cursor enquanto estiver na tela do jogo
        this.cursor = this.add.image(0, 0, 'cursor').setScale(0.5); // Adiciona uma nova imagem de cursor
        this.cursor.setDepth(1000); // Define que o mouse irá sobrepor todos os objetos que tiveram valor abaixo de 1000

        this.input.on('pointermove', (pointer) => { // Se o mouse estiver em movimento
            this.cursor.setPosition(pointer.x, pointer.y);  // Define a posição do novo cursor como a posição do mouse
        });

        this.events.on('resume', () => {
            this.input.setDefaultCursor('none');
        });

        // Adiciona tela de fundo

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoCreditos') // Define que a tela de fundo é igual ao tamanho da câmera dividido por 2
            .setOrigin(0.5, 0.5) // Define a origem da tela de fundo
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Define o tamanho da tela de fundo como da câmera

        this.add.image(400, 100, 'titulo').setScale(0.5);

        // Botão de Retorno

        const botaoRetornar = this.add.image(70, 20, 'botaoVoltar') // Cria o botão de retornar para tela inicial
            .setOrigin(1, 0) // Define a origem do botão de retornar
            .setScale(0.4) // Define a escala do botão de retornar
            .setInteractive(); // Torna o botão clicável

        // Nomes dos integrantes

        const nomes = this.add.image(400, 300, 'Nomes') // Cria a imagem com os nomes dos créditos
            .setScale(0.5) // Define a escala dos nomes

        // Caso o botão de retorno seja clicado, a cena muda para cenaInicio

        botaoRetornar.on('pointerdown', () => { // Se o botão de Retornar for clicado:
            this.scene.start('cenaInicio'); // Volta para a tela de início
        });

        // Efeito de hover no botão de retorno

        botaoRetornar.on('pointerover', () => { // Se o mouse estiver sobre o botão de retornar
            this.tweens.add({ // Cria uma animação
                targets: botaoRetornar, // Define como alvo o botão de retornar
                scale: 0.41,  // Aumenta o tamanho do botão
                duration: 200, // Define a duração como 0.2 segundos
                ease: 'Linear' // Define o movimento da animação como linear(constante)
            });
        });

        botaoRetornar.on('pointerout', () => {
            this.tweens.add({  // Cria uma animação
                targets: botaoRetornar, // Define como alvo o botão de retornar
                scale: 0.4,  // Diminui o tamanho do botão
                duration: 200, // Define a duração como 0.2 segundos
                ease: 'Linear' // Define o movimento da animação como linear(constante)
            });
        });
    }

    update() {

    }
}
