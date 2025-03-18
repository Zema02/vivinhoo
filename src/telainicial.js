// Classe cenaInicio criada que é uma extensão da cena do Phaser

class cenaInicio extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaInicio' });
    }

    preload() {

        // Aqui onde carrega as imagens que serão utilizadas na TelaInicial

        this.load.image('background', 'assets/telaInicial.png'); // Carrega a imagem de fundo da tela inicial
        this.load.image('vivo', 'assets/botoes/botaovivo.png'); // Carrega o botão da vivo
        this.load.image('settings', 'assets/botoes/botaosettings.png'); // Carrega botão de configurações
        this.load.image('titulo', 'assets/titulo.png'); // Carrega a imagem de titulo do jogo
        this.load.image('sair', 'assets/botoes/botaosair.png'); // carrega o botão de sair
        this.load.image('iniciar', 'assets/botoes/botaoiniciar.png'); // Carrega o botão iniciar
        this.load.image('creditos', 'assets/botoes/botaocreditos.png'); // Carrega o botão de créditos
        this.load.image('cursor', 'assets/cursor.png'); // Carrega um novo cursor
        this.load.audio('backgroundMusic', 'assets/sons/background-inicial.mp3'); // Carrega o audio de fundo
    }

    create() {

        // Aqui é para musica começar a tocar de bakground

        let musica = this.sound.get('backgroundMusic'); // define variável musica

        this.sound.context.resume();

        // TimeOut para dar tempo do resume e verificar se a musica já está tocando, caso não que comece

        setTimeout(() => {
            if (!musica) {
                musica = this.sound.add('backgroundMusic', {
                    loop: true, // Coloca a música em loop
                    volume: 0.5 // Aumenta o volume
                });
                musica.play(); // Inicia a música
            }
        }, 500);

        // Aqui é para ser feito a transição de fade in

        this.cameras.main.fadeIn(1000);  // Adiciona a transição fadeIn e define seu tempo como 1000

        // Aqui é para mudar o estilo do cursor do mouse

        this.input.setDefaultCursor('none'); // Tira a imagem do cursor enquanto estiver na tela do jogo
        this.cursor = this.add.image(0, 0, 'cursor').setScale(0.5); // Adiciona uma nova imagem de cursor
        this.cursor.setDepth(1000); // Define que o mouse irá sobrepor todos os objetos que tiveram valor abaixo de 1000

        this.input.on('pointermove', (pointer) => { // Se o mouse estiver em movimento
            this.cursor.setPosition(pointer.x, pointer.y); // Define a posição do novo cursor como a posição do mouse
        });

        this.events.on('resume', () => {
            this.input.setDefaultCursor('none'); //tira a imagem do cursor enquanto estive na tela do jogo
        });

        // Adiciona tela de fundo

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')  // Adiciona a imagem de fundo como o tamanho da camera dividido por 2; 
            .setOrigin(0.5, 0.5) // Define o ponto de origem
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Define o tamanho da tela da imagem

        this.add.image(400, 150, 'titulo').setScale(0.5);

        // Botão de configuração

        const botaoConfig = this.add.image(this.cameras.main.width - 10, 10, 'settings') // Cria o botão de configurações e define como uma constante
            .setOrigin(1, 0) // define o ponto de origem do botaoConfg
            .setScale(0.5) // define a escala do botão
            .setInteractive(); // define o botão como clicável

        // Botão do site da VIVO

        const botaoVivo = this.add.image(70, 20, 'vivo') // cria o botão Vivo
            .setOrigin(1, 0) // define a origem do botão Vivo
            .setScale(0.5) // define a escala do botão Vivo
            .setInteractive(); // torna o botão como clicável

        // Botão de iniciar

        const botaoIniciar = this.add.image(525, 260, 'iniciar') // Cria o botão de iniciar e define como uma constante
            .setOrigin(1, 0) // define a origem do botão iniciar
            .setScale(0.5) // define a escala do botão iniciar
            .setInteractive(); // torna o botão iniciar como clicável

        // Botão de créditos

        const botaoCreditos = this.add.image(525, 340, 'creditos') // Cria o botão de créditos e define como uma constante
            .setOrigin(1, 0) // define a origem do botão créditos
            .setScale(0.5) // define a escala do botão créditos
            .setInteractive(); // torna o botão de créditos como clicável

        // Botão de sair

        const botaoSair = this.add.image(525, 420, 'sair') // Cria o botão de sair e define como uma constante. 
            .setOrigin(1, 0) // define a origem do botão de Sair
            .setScale(0.5) // define a escala do botão de sair
            .setInteractive(); // torna o botão de sair como clicável

        // Caso clicado o botão VIVO redireciona para o site da VIVO

        botaoVivo.on('pointerdown', () => {
            window.location.href = 'https://www.vivo.com.br/'; // Abre janela do navegador com site da Vivo
        });

        // Criar hover para o botão VIVO
        // Se o mouse estiver sobre o botão de botaoVivo, o escopo abaixo será executado
        botaoVivo.on('pointerover', () => {
            this.tweens.add({ // adiciona animação
                targets: botaoVivo, // Define que a animação é para o botaoVivo
                scale: 0.51, // Aumenta o tamanho do botão
                duration: 200, // Define a duração da animação como 0.2 segundos
                ease: 'Linear' // Define o movimento da animação como linear(constante)
            });
        });

        // Se o mouse não estiver sobre o botaoVivo, o escopo abaixo será executado
        botaoVivo.on('pointerout', () => {
            this.tweens.add({ // adiciona animação
                targets: botaoVivo, // Define que a animação é para o botaoVivo
                scale: 0.5, // Diminui o tamanho do botão para o normal
                duration: 200, // Define a duração da animação como 0.2 segundos
                ease: 'Linear' // Define o movimento da animação como linear(constante)
            });
        });

        // Caso clicado o botão de configuração redireciona para a tela de configuração

        botaoConfig.on('pointerdown', () => {
            this.scene.start('cenaConfig', { cenaAnterior: this.scene.key }); // Inicia a tela de configuração
        });

        // Criar hover para o botão de configuração
        // Se o mouse estiver sobre o botão de botaoConfig, o escopo abaixo será executado
        botaoConfig.on('pointerover', () => {
            this.tweens.add({ // Adiciona animação
                targets: botaoConfig, // Define que a animação é para o botaoConfig
                scale: 0.51, // Aumenta o tamanho do botão
                duration: 200, // Define a duração da animação como 0.2 segundos
                ease: 'Linear' // Define o movimento da animação como linear(constante)
            });
        });

        // Se o mouse não estiver sobre o botaoConfig, o escopo abaixo será executado

        botaoConfig.on('pointerout', () => {
            this.tweens.add({ // Adiciona animação
                targets: botaoConfig, // Define que a animação é para o botaoConfig
                scale: 0.5, // Diminui o tamanho do botão para o normal
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        // Caso clicado o botão de iniciar redireciona para a tela de jogo

        botaoIniciar.on('pointerdown', () => { // Ao clicar o botão botaoIniciar:
            this.scene.start('charSelecao');
        });

        // Criar hover para o botão de iniciar
        // Se o mouse estiver sobre o botão de botaoIniciar, o escopo abaixo será executado
        botaoIniciar.on('pointerover', () => {
            this.tweens.add({ // Adiciona animação
                targets: botaoIniciar, // Define que a animação é para o botaoIniciar
                scale: 0.51, // Aumenta o tamanho do botão
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        // Se o mouse não estiver sobre o botaoIniciar, o escopo abaixo será executado

        botaoIniciar.on('pointerout', () => {
            this.tweens.add({ // Adiciona animação
                targets: botaoIniciar, // Define que a animação é para o botaoIniciar
                scale: 0.5, // Diminui o tamanho do botão para o normal
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        // Caso clicado o botão de créditos redireciona para a tela de créditos

        botaoCreditos.on('pointerdown', () => { // Ao clicar o botão botaoCreditos:
            this.scene.start('cenaCreditos');  // Inicia a tela de crédiots (creditosscene.js)
        });

        // Criar hover para o botão de créditos
        // Se o mouse estiver sobre o botão de botaoCreditos, o escopo abaixo será executado

        botaoCreditos.on('pointerover', () => {
            this.tweens.add({ // Adiciona animação
                targets: botaoCreditos, // Define que a animação é para o botaoCreditos
                scale: 0.51, // Aumenta o tamanho do botão
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        // Se o mouse não estiver sobre o botaoCreditos, o escopo abaixo será executado
        botaoCreditos.on('pointerout', () => {
            this.tweens.add({ // Adiciona animação
                targets: botaoCreditos, // Define que a animação é para o botaoCreditos
                scale: 0.5, // Diminui o tamanho do botão para o inicial
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        // Caso clicado o botão de sair redireciona para o site da Gupy

        botaoSair.on('pointerdown', () => { // Ao clicar o botão botaoSair
            window.location.href = "https://vivo.gupy.io/"; // Abre a janela do site da Vivo Gupy
        });

        // Criar hover para o botão de sair
        // Se o mouse estiver sobre o botão de botaoSair, o escopo abaixo será executado
        botaoSair.on('pointerover', () => {
            this.tweens.add({ // Adiciona animação
                targets: botaoSair, // Define que a animação é para o botão de sair
                scale: 0.51,  // Aumenta o tamanho do botão
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        // Se o mouse não estiver sobre o botaoSair, o escopo abaixo será executado
        botaoSair.on('pointerout', () => {
            this.tweens.add({ // Adiciona animação
                targets: botaoSair, // Define que a animação é para o botaoSair
                scale: 0.5,  // Diminui o tamanho do botão para o inicial
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define o movumento da animação como linear(constante)
            });
        });
    }

    update() {
    }
}