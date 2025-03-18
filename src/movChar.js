
var init = true;

let player, npcUm, cursors, wasd;

// MOVIMENTOS
var andandoY = false, andandoX = false;
var movi = ['u'];

// CRIA VARIÁVEIS DO TUTORIAL
let capitulo, tutorial, tutorial2, tutorial3, cont = 0, comecarTutorial = false; // Cria variáveis playerm cursors, e wasd

var botaoA, botaoW, botaoD, botaoS, interagir, mobileOn = false, MobileSystemOn = false, personagemMovimento = true;

var botaoE, atualizacao, tutorialFinalizado = false;

var inicioTutorial = false, apagarTutorial = false;

atualizacao = false;

var ultimaPosicao = 400;
var ultimoY = 510;
var passeiPorAqui = false;
var fala1, fala2, fala3, fala4, fala5;
var falas = [fala1, fala2, fala3, fala4, fala5];
// Lista das falas
var indiceFalaAtual = 0; // Começa na primeira fala
var inicioFalas = false;

class movChar extends Phaser.Scene { // define movChar como extensão da cena do Phasser
    constructor() {
        super({ key: 'movChar' });
    }

    preload() {
        // Fundos
        this.load.image('primeiraCena', 'assets/maprecepao_one.png'); // Carrega o cenário

        // Capitulos
        this.load.image('cap1', 'assets/capitulo1.png') // Carrega o inicio do capitulo

        // Personagens

        this.load.spritesheet("npc_one", "assets/sprites/vincente.png", { frameWidth: 56, frameHeight: 84 });
        // Sons
        this.load.audio('musicaMovChar', 'assets/sons/musicaMovChar.WAV'); // Carrega o áudio de moviemntação do personagem

        // TextBox
        this.load.image('tutorial1', 'assets/textbox/tutorial.png');
        this.load.image('tutorial2', 'assets/textbox/tutorial2.png');
        this.load.image('tutorial3', 'assets/textbox/tutorial3.png');

        this.load.image('fala1', 'assets/textbox/Fala1.png');
        this.load.image('fala2', 'assets/textbox/Fala2.png');
        this.load.image('fala3', 'assets/textbox/Fala3.png');
        this.load.image('fala4', 'assets/textbox/Fala4.png');
        this.load.image('fala5', 'assets/textbox/Fala5.png');

        // Botões
        this.load.image('botaoSim', 'assets/botoes/Sim.png');
        this.load.image('botaoNao', 'assets/botoes/Nao.png');

        this.load.image('botaoW', 'assets/botoes/setaCima.png');
        this.load.image('botaoA', 'assets/botoes/setaEsquerda.png');
        this.load.image('botaoS', 'assets/botoes/setaBaixo.png');
        this.load.image('botaoD', 'assets/botoes/setaDireita.png');

        this.load.image('botaoE', 'assets/botoes/botao_e.png');
    }
    create() {

        if (init) {

            // Musicas

            let musicanterior = this.sound.get('motor'); // define a variavel musica anterior como a musica de background da tela inicial
            musicanterior.stop(); // Para de tocar a música anterior

            let musicanterior2 = this.sound.get('backgroundMusic');
            musicanterior2.stop();

            // Aqui é para musica começar a tocar de background

            let musica2 = this.sound.get('musicaMovChar'); // cria uma variavel chamada music, que guarda o som de movimento do personagem
            this.sound.context.resume();
            // TimeOut para dar tempo do resume e verificar se a musica já está tocando, caso não que comece

            setTimeout(() => {
                if (!musica2) {
                    musica2 = this.sound.add('musicaMovChar', {
                        loop: true, // ativa o loop do som
                        volume: 0.5 // define o nível do volume
                    });

                    let musicadaTelaInicial = this.sound.get('backgroundMusic'); // define a variavel musicadaTelaInicial
                    musica2.play(); // começa a tocar a música

                    if (musicadaTelaInicial && musicadaTelaInicial.mute) { // se a música da tela inicial estiver mutada:
                        musica2.mute = true; // a música de movimento do personagem também estará mutada
                    } else {
                        musica2.mute = false; // se não, a música de movimento do personagem não estará mutada
                    }
                }
            }, 500);

            this.cameras.main.fadeIn(1000); // Adiciona animação de fadeIn ao entrar no jogo com tempo de 1 segundo

        }

        // Código referente ao Cursor

        this.input.setDefaultCursor('none'); // desativa o cursor básico
        this.cursor = this.add.image(0, 0, 'cursor').setScale(0.5); // define o cursor como um novo cursor
        this.cursor.setDepth(1000); // define que o cursor irá sobrepor os objetos

        this.input.on('pointermove', (pointer) => { // se o cursor estiver em movimento:
            this.cursor.setPosition(pointer.x, pointer.y); // a posição do novo cursor é igual a posição do mouse
        });

        this.events.on('resume', () => {
            this.input.setDefaultCursor('none');
        });

        //Adciona as text box e botões

        tutorial = this.add.image(400, 470, 'tutorial1').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        tutorial2 = this.add.image(400, 470, 'tutorial2').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        tutorial3 = this.add.image(400, 470, 'tutorial3').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();

        fala1 = this.add.image(430, 380, 'fala1').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        fala2 = this.add.image(430, 380, 'fala2').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        fala3 = this.add.image(430, 380, 'fala3').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        fala4 = this.add.image(430, 380, 'fala4').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        fala5 = this.add.image(430, 380, 'fala5').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();

        let botaoSim = this.add.image(435, 500, 'botaoSim').setScale(0.55).setAlpha(0).setDepth(100).setInteractive();
        let botaoNao = this.add.image(545, 500, 'botaoNao').setScale(0.55).setAlpha(0).setDepth(100).setInteractive();

        // Botões para mobile

        botaoW = this.add.image(100, 440, 'botaoW').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        botaoA = this.add.image(40, 500, 'botaoA').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        botaoS = this.add.image(100, 560, 'botaoS').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        botaoD = this.add.image(160, 500, 'botaoD').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        interagir = this.add.image(720, 500, 'botaoE').setScale(0.8).setAlpha(0).setDepth(90).setInteractive();

        //Código refente ao Tutorial do jogo

        if (init) {

            this.time.addEvent({
                delay: 2000, // Tempo em milissegundos (2 segundos)
                callback: () => {
                    capitulo = this.add.image(400, 100, 'cap1').setScale(0.7).setAlpha(0); //Adiciona a logo de capitulo


                    this.tweens.add({
                        targets: capitulo,
                        alpha: 1, // Alvo: tornar totalmente visível
                        duration: 1000, // Tempo da animação (1 segundo)
                        ease: 'Power2'
                    });

                    this.time.addEvent({
                        delay: 2000, // Tempo em milissegundos (2 segundos)
                        callback: () => {

                            this.tweens.add({
                                targets: capitulo,
                                alpha: 0, // Alvo: tornar totalmente visível
                                duration: 1000, // Tempo da animação (1 segundo)
                                ease: 'Power2'
                            });

                            this.time.addEvent({
                                delay: 2000, // Tempo em milissegundos (2 segundos)
                                callback: () => {

                                    this.tweens.add({
                                        targets: botaoSim,
                                        alpha: 1, // Alvo: tornar totalmente visível
                                        duration: 1000, // Tempo da animação (1 segundo)
                                        ease: 'Power2'
                                    });
                                    this.tweens.add({
                                        targets: botaoNao,
                                        alpha: 1, // Alvo: tornar totalmente visível
                                        duration: 1000, // Tempo da animação (1 segundo)
                                        ease: 'Power2'
                                    });
                                    this.tweens.add({
                                        targets: tutorial,
                                        alpha: 1, // Alvo: tornar totalmente visível
                                        duration: 1000, // Tempo da animação (1 segundo)
                                        ease: 'Power2'
                                    });

                                },
                            });

                            botaoSim.on('pointerdown', () => { // se o botão de voltar for clidado:
                                this.tweens.add({
                                    targets: botaoSim,
                                    alpha: 0, // Alvo: tornar totalmente visível
                                    duration: 1000, // Tempo da animação (1 segundo)
                                    ease: 'Power2'
                                });
                                this.tweens.add({
                                    targets: botaoNao,
                                    alpha: 0, // Alvo: tornar totalmente visível
                                    duration: 1000, // Tempo da animação (1 segundo)
                                    ease: 'Power2'
                                });
                                this.tweens.add({
                                    targets: tutorial,
                                    alpha: 0, // Alvo: tornar totalmente visível
                                    duration: 1000, // Tempo da animação (1 segundo)
                                    ease: 'Power2'
                                });
                                this.tweens.add({
                                    targets: tutorial2,
                                    alpha: 1, // Alvo: tornar totalmente visível
                                    duration: 1000, // Tempo da animação (1 segundo)
                                    ease: 'Power2'
                                });
                                mobileOn = true;
                                comecarTutorial = true; // Variável que guarda status do Tutorial
                            });

                            // Efeito de hover no botão SIM

                            botaoSim.on('pointerover', () => { // se o mouse estiver sobre o botão de voltar
                                this.tweens.add({ // cria animação para o botão
                                    targets: botaoSim, // define o alvo da animação como o voltarBotao
                                    scale: 0.57,  //Aumenta o tamanho do botão
                                    duration: 200, //define a duração como 0.2 segundos
                                    ease: 'Linear' // Define o movimento da animação como linear(constante)
                                });
                            });

                            botaoSim.on('pointerout', () => {
                                this.tweens.add({
                                    targets: botaoSim, // define o alvo da animação como o voltarBotao
                                    scale: 0.55,  //Diminui o tamanho do botão
                                    duration: 200, //define a duração como 0.2 segundos
                                    ease: 'Linear' // Define o movimento da animação como linear(constante)
                                });
                            });

                            // Botão Não 

                            botaoNao.on('pointerover', () => { // se o mouse estiver sobre o botão de nao
                                this.tweens.add({ // cria animação para o botão
                                    targets: botaoNao, // define o alvo da animação como o botaoNao
                                    scale: 0.57,  //Aumenta o tamanho do botão
                                    duration: 200, //define a duração como 0.2 segundos
                                    ease: 'Linear' // Define o movimento da animação como linear(constante)
                                });
                            });

                            botaoNao.on('pointerout', () => {
                                this.tweens.add({
                                    targets: botaoNao, // define o alvo da animação como o botaoNao
                                    scale: 0.55,  //Diminui o tamanho do botão
                                    duration: 200, //define a duração como 0.2 segundos
                                    ease: 'Linear' // Define o movimento da animação como linear(constante)
                                });
                            });

                            botaoNao.on('pointerdown', () => { // se o botão de voltar for clidado:
                                this.tweens.add({
                                    targets: botaoSim,
                                    alpha: 0, // Alvo: tornar totalmente visível
                                    duration: 1000, // Tempo da animação (1 segundo)
                                    ease: 'Power2'
                                });
                                this.tweens.add({
                                    targets: botaoNao,
                                    alpha: 0, // Alvo: tornar totalmente visível
                                    duration: 1000, // Tempo da animação (1 segundo)
                                    ease: 'Power2'
                                });
                                this.tweens.add({
                                    targets: tutorial,
                                    alpha: 0, // Alvo: tornar totalmente visível
                                    duration: 1000, // Tempo da animação (1 segundo)
                                    ease: 'Power2'
                                });
                                mobileOn = true;
                                tutorialFinalizado = true;
                            });
                        },
                    });
                },
            });

            // Tela de Fundo

            this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'primeiraCena') // define que a tela de fundo é igual ao tamanho da câmera dividido por 2
                .setOrigin(0.5, 0.5) // define a origem da tela de fundo
                .setDisplaySize(this.cameras.main.width, this.cameras.main.height); // define o tamnho da tela como o da câmera

            npcUm = this.physics.add.sprite(415, 300, 'npc_one').setScale(0.8);
            botaoE = this.add.image(70, 60, 'botaoE').setScale(0.5).setVisible(false).setInteractive();

            this.anims.create({
                key: 'piscar', // Nome da animação
                frames: this.anims.generateFrameNumbers('npc_one', { frames: [0, 1, 0] }), // Alterna entre normal e piscando
                frameRate: 5,  // Velocidade da animação
                repeat: 0      // Não repete continuamente
            });

            this.time.addEvent({
                delay: 3000,  // Pisca a cada 3 segundos
                callback: () => {
                    npcUm.play('piscar'); // Ativa a animação de piscar
                },
                loop: true  // Repete para sempre
            });

            // Jogador

            if (init) {
                player = this.physics.add.sprite(ultimaPosicao, ultimoY, 'player'); // cria o jogador e define sua posição inicial
            } else {
                player = this.physics.add.sprite(ultimaPosicao, ultimoY, 'player'); // cria o jogador e define sua posição inicial
            }
            
            player.setCollideWorldBounds(true); // adiciona colisão ao player

            const colisao1 = this.physics.add.staticImage(45, 280, null).setSize(150, 245).setVisible(false);
            const colisao2 = this.physics.add.staticImage(410, 270, null).setSize(270, 180).setVisible(false);
            const colisao3 = this.physics.add.staticImage(10, 300, null).setSize(25, 600).setVisible(false);
            const colisao4 = this.physics.add.staticImage(400, 590, null).setSize(800, 25).setVisible(false);
            const colisao5 = this.physics.add.staticImage(790, 300, null).setSize(25, 600).setVisible(false);
            const colisao6 = this.physics.add.staticImage(755, 280, null).setSize(150, 245).setVisible(false);

            this.physics.add.collider(player, [colisao1, colisao2, colisao3, colisao4, colisao5, colisao6]);


            // Teclas
            cursors = this.input.keyboard.createCursorKeys(); // define que a variavel cursor como as setas do teclado
            wasd = this.input.keyboard.addKeys({ // define a variavel wasd como os botões do teclado
                up: Phaser.Input.Keyboard.KeyCodes.W, // define a chave up como a tecla W
                left: Phaser.Input.Keyboard.KeyCodes.A, // define a chave left como a tecla A
                down: Phaser.Input.Keyboard.KeyCodes.S, // define a chave down como a tecla S
                right: Phaser.Input.Keyboard.KeyCodes.D, // define a chave right como a tecla D
                interact: Phaser.Input.Keyboard.KeyCodes.E
            });

            // Identificando se está no Mobile

            if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
                MobileSystemOn = true;
                console.log("Usuário está em um dispositivo móvel.");
                this.cursor = null;

            } else {
                MobileSystemOn = false;
                console.log("Usuário está em um desktop.");
            }

            const botaoConfig = this.add.image(this.cameras.main.width - 30, 10, 'settings') // Cria o botão de configurações e define como uma constante
                .setOrigin(1, 0) // define o ponto de origem do botaoConfg
                .setScale(0.5) // define a escala do botão
                .setInteractive(); // define o botão como clicável

            botaoConfig.on('pointerdown', () => {
                ultimaPosicao = player.x;
                ultimoY = player.y;
                passeiPorAqui = true;
                this.scene.start('cenaConfig', { cenaAnterior: this.scene.key });  // Inicia a tela de configuração
            });

            this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

            interagir.on('pointerdown', () => {
                this.acionarTeclaE();
            });
        }
    }
    update() {
        if (player.x > 385 && player.x < 450 && player.y < 420 && player.y > 380 && !atualizacao) {
            botaoE.setVisible(true);
            atualizacao = true;
        } else if (atualizacao && !(player.x > 385 && player.x < 450 && player.y < 420 && player.y > 380)) {
            botaoE.setVisible(false);
            atualizacao = false;
        }

        personagemMovimento = !inicioFalas;

        if (player.y <= 40 && tutorialFinalizado) {
            this.scene.start('movCharTwo');
            ultimaPosicao = player.x;
        }

        let velocidade = 150; // define a variável velocidade como 150



        if (personagemMovimento) {
            if (!andandoX) {
                if (cursors.up.isDown || wasd.up.isDown) {
                    player.setVelocity(0, -velocidade);
                    player.anims.play('up', true);
                    andandoY = true;
                } else if (cursors.down.isDown || wasd.down.isDown) {
                    player.setVelocity(0, velocidade);
                    player.anims.play('down', true);
                    andandoY = true;
                } else {
                    andandoY = false;
                }
            }

            if (!andandoY) {
                if (cursors.left.isDown || wasd.left.isDown) {
                    player.setVelocity(-velocidade, 0);
                    player.anims.play('left', true);
                    andandoX = true;
                } else if (cursors.right.isDown || wasd.right.isDown) {
                    player.setVelocity(velocidade, 0);
                    player.anims.play('right', true);
                    andandoX = true;
                } else {
                    andandoX = false;
                }
            }
        }


        if (!cursors.left.isDown && !cursors.right.isDown &&
            !cursors.up.isDown && !cursors.down.isDown &&
            !wasd.left.isDown && !wasd.right.isDown &&
            !wasd.up.isDown && !wasd.down.isDown) {
            player.setVelocity(0, 0);
            player.anims.restart();
            player.anims.stop();
        }



        let clicandoX = false, clicandoY = false;

        if (!clicandoX) {
            botaoW.on('pointerdown', () => {
                wasd.up.isDown = true;
                clicandoY = true;
            });
            botaoS.on('pointerdown', () => {
                wasd.down.isDown = true;
                clicandoY = true;
            });
            botaoW.on('pointerout', () => {
                wasd.up.isDown = false;
                clicandoY = false;
            });
            botaoS.on('pointerout', () => {
                wasd.down.isDown = false;
                clicandoY = false;
            });
            botaoW.on('pointerup', () => {
                wasd.up.isDown = false;
                clicandoY = false;
            });
            botaoS.on('pointerup', () => {
                wasd.down.isDown = false;
                clicandoY = false;
            });
        }

        if (!clicandoY) {
            botaoA.on('pointerdown', () => {
                wasd.left.isDown = true;
                clicandoX = true;
            });
            botaoD.on('pointerdown', () => {
                wasd.right.isDown = true;
                clicandoX = true;
            });
            botaoA.on('pointerout', () => {
                wasd.left.isDown = false;
                clicandoX = false;
            });
            botaoD.on('pointerout', () => {
                wasd.right.isDown = false;
                clicandoX = false;
            });
            botaoA.on('pointerup', () => {
                wasd.left.isDown = false;
                clicandoX = false;
            });
            botaoD.on('pointerup', () => {
                wasd.right.isDown = false;
                clicandoX = false;
            });
        }


        if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            this.acionarTeclaE();
        }

        var botoes = [botaoA, botaoD, botaoS, botaoW, interagir];

        if (MobileSystemOn === true) {
            for (var i of botoes) {
                if (mobileOn === false) {
                    i.setAlpha(0);
                    i.disableInteractive();
                } else {
                    console.log("teste")
                    i.setAlpha(1);
                    i.setInteractive();
                }
            }
        }
    }

    trocaFalas() {
        var falas = [fala1, fala2, fala3, fala4, fala5];

        if (indiceFalaAtual < falas.length + 1) {
            this.tweens.add({ targets: falas[indiceFalaAtual - 1], alpha: 0, duration: 1000, ease: 'Power2' });
            this.tweens.add({ targets: falas[indiceFalaAtual], alpha: 1, duration: 1000, ease: 'Power2' });
            indiceFalaAtual++;
        }

        if (indiceFalaAtual === 6) {
            this.tweens.add({ targets: falas[indiceFalaAtual - 1], alpha: 0, duration: 1000, ease: 'Power2' });
            inicioFalas = false;
            indiceFalaAtual = 0;
        }
    };
    acionarTeclaE() {
        this.teclaE.enabled = false;

        if (atualizacao && tutorialFinalizado) {
            inicioFalas = true;
            this.trocaFalas();
        }

        this.time.addEvent({
            delay: 100,
            callback: () => {
                this.teclaE.enabled = true;
            },
        });

        if (comecarTutorial === true) {
            cont++;
            if (cont === 1) {

                this.tweens.add({ targets: tutorial2, alpha: 0, duration: 1000, ease: 'Power2' });
                this.tweens.add({ targets: tutorial3, alpha: 1, duration: 1000, ease: 'Power2' });
            }
            if (cont >= 2) {
                this.tweens.add({ targets: tutorial3, alpha: 0, duration: 1000, ease: 'Power2' });
                tutorialFinalizado = true;
            }
        }
    }
}


