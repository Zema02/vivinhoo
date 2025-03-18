
var fundo, carro, velocidade = -400, motor; // Define variaveis fundo, carro e velocidade
var pular, hist1, hist2; // Variavel para Alpha

class cenaHist extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaHist' });
    }
    preload() {
        this.load.image('fundo', 'assets/Untitled.png');
        this.load.audio('motor', 'assets/sons/motor.mp3')
        this.load.spritesheet('carro', 'assets/sprites/carrovivo.png', { frameWidth: 222, frameHeight: 90 });

        // Personagens
        if (personagem == 0) {
            this.load.spritesheet("player", "assets/sprites/spritesheet.png", { frameWidth: 47.975, frameHeight: 69 }); // Carrega o spritesheet do personagem e define seu tamanho
        }  else if (personagem == 1){
            this.load.spritesheet("player", "assets/sprites/spritesheet_vini.png", { frameWidth: 47.999, frameHeight: 69})
        } else if (personagem == 2){
            this.load.spritesheet("player", "assets/sprites/spritesheet_dois.png", { frameWidth: 47.999, frameHeight: 69 }); // Carrega o spritesheet do personagem e define seu tamanho
        }

        this.load.image('pularCut', 'assets/pularCutscene.png');
        this.load.image('pularMob', 'assets/Pular.png');
        this.load.image('hist1', "assets/textbox/HistoriaCut1.png");
        this.load.image('hist2', 'assets/textbox/HistoriaCut2.png');
    }
    create() {
        let MobileSystemOn;
        if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
            MobileSystemOn = true;
            console.log("Usuário está em um dispositivo móvel.");

        } else {
            MobileSystemOn = false;
            console.log("Usuário está em um desktop.");
        }

        var imagemPular;
        //IMAGEM PULAR
        if (MobileSystemOn === true){
            imagemPular = 'pularMob';
        }
        else{
            imagemPular = 'pularCut';
        }
        // BLOCO DO FUNDO

        this.cameras.main.fadeIn(1000); // adiciona transição ao entrar nessa tela
        fundo = this.physics.add.image(1800, 300, 'fundo').setScale(1.8); // define que a tela de fundo
        fundo.setVelocityX(velocidade); // define a velocidade do fundo como a variável velocidade

        // BLOCO DO CARRO

        carro = this.add.sprite(175, 560, 'carro').setScale(0.6).setFlip(true, false); //Cria o carro
        this.anims.create({ key: 'carro-andando', frames: this.anims.generateFrameNumbers('carro', { start: 0, end: 1 }), frameRate: 10, repeat: -1 }); // Cria a animação do carro andando
        this.anims.create({ key: 'carro-parado', frames: this.anims.generateFrameNumbers('carro', { start: 0, end: 0 }), frameRate: 10, repeat: -1 }); // Cria a animação do carro parado
        carro.setDepth(10); // define que o carro irá sobrepor os outros objetos
        carro.anims.play('carro-andando', true); // inicia a animação do carro andando

        // BLOCO DA MÚSICA

        let musicaAnterior = this.sound.get('backgroundMusic'); // define a variavel musica anterior como a musica de background da tela inicial
        musicaAnterior.stop();
        motor = this.sound.add('motor', { loop: true, volume: 3 }); // cria o som de barulho do motor
        motor.play(); // começa a tocar o som do motor

        // BLOCO DO PLAYER

        this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }), frameRate: 10, repeat: -1 }); // cria a animação para esquerda
        this.anims.create({ key: 'turn', frames: [{ key: 'player', frame: 0 }], frameRate: 20 }); // cria a animação
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }), frameRate: 10, repeat: -1 }); // cria a animação para a direita
        this.anims.create({ key: 'up', frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }), frameRate: 10, repeat: -1 }); // cria a animação para cima
        this.anims.create({ key: 'down', frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }), frameRate: 10, repeat: -1 }); // cria a animação para baixo
        player = this.physics.add.sprite(170, 555, 'player').setScale(0.5); // cria o player
       
        // Pular Cutscene

        pular = this.add.image(650, 100, imagemPular).setScale(0.35).setDepth(100).setAlpha(0).setInteractive();
        hist1 = this.add.image(200, 100, 'hist1').setScale(0.5).setDepth(100).setAlpha(0).setInteractive();
        hist2 = this.add.image(200, 100, 'hist2').setScale(0.5).setDepth(100).setAlpha(0).setInteractive();

        this.time.addEvent({
            delay: 1000, // Tempo em milissegundos (2 segundos)
            callback: () => {
                this.tweens.add({
                    targets: pular,
                    alpha: 1, // Alvo: tornar totalmente invisível
                    duration: 1000, // Tempo da animação (0.5 segundo)
                    ease: 'Power2'
                });
                this.tweens.add({
                    targets: hist1,
                    alpha: 1, // Alvo: tornar totalmente invisível
                    duration: 1000, // Tempo da animação (0.5 segundo)
                    ease: 'Power2'
                });
                this.time.addEvent({
                    delay: 3000, // Tempo em milissegundos (2 segundos)
                    callback: () => {
                        this.tweens.add({
                            targets: hist1,
                            alpha: 0, // Alvo: tornar totalmente invisível
                            duration: 1000, // Tempo da animação (0.5 segundo)
                            ease: 'Power2'
                        });
                        this.time.addEvent({
                            delay: 500, // Tempo em milissegundos (2 segundos)
                            callback: () => {
                                this.tweens.add({
                                    targets: hist2,
                                    alpha: 1, // Alvo: tornar totalmente invisível
                                    duration: 1000, // Tempo da animação (0.5 segundo)
                                    ease: 'Power2'
                                });
                            },
                        });

                    },
                });
                this.time.addEvent({
                    delay: 3000, // Tempo em milissegundos (2 segundos)
                    callback: () => {
                        this.tweens.add({
                            targets: hist2,
                            alpha: 0, // Alvo: tornar totalmente invisível
                            duration: 1000, // Tempo da animação (0.5 segundo)
                            ease: 'Power2'
                        });
                    },
                });
                this.time.addEvent({
                    delay: 10000, // Tempo em milissegundos (2 segundos)
                    callback: () => {
                        this.tweens.add({
                            targets: pular,
                            alpha: 0, // Alvo: tornar totalmente invisível
                            duration: 1000, // Tempo da animação (0.5 segundo)
                            ease: 'Power2'
                        });
                    },
                });

            },
        });
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Atribui o teclaE ao click da tecla E
    
        pular.on('pointerdown', () => {
            this.acionarTeclaE();
        });
    }
    update() {
        player.anims.play('right', true); // Inicia a animação do player de lado
        if (fundo.x < -1000) { // Se o fundo for menor que - 1000:
            fundo.setVelocityX(0); // define que a velocidade do fundo é 0, ou seja, o fundo para de se mover
            carro.anims.play('carro-parado'); // Inicia a animação do carro parado
            motor.stop();
            // Cria um delay
            this.time.addEvent({
                delay: 2000, // Tempo em milissegundos (2 segundos)
                callback: () => {
                },
            });
            player.setCollideWorldBounds(true); // adiciona colisão ao player
            if (player.y > 540) {
                player.setVelocityY(-65); // Move para cima de forma fluida
                player.anims.play('up', true);
                player.virada = true;
            } else if (player.y <= 540 && player.virada === true) {
                player.setVelocityY(0); // Para a movimentação vertical
                player.setVelocityX(65); // Move para a direita de forma fluida
                player.anims.play('right', true);
            }
            if (player.x >= 470) {
                player.setVelocityX(0); // Para a movimentação ao alcançar o destino
                player.virada = false;
                player.anims.play('up', true);
            }
            // Adiciona delay
            this.time.addEvent({
                delay: 5000, // Tempo em milissegundos (10 segundos)
                callback: () => {
                    this.scene.start('movChar');; // Carrega o jogo
                },
                loop: true // Se true, repete infinitamente
            });
        }
        if (Phaser.Input.Keyboard.JustDown(this.teclaE)) { // Se a tecla E for clicada
            this.acionarTeclaE();
        }
    }
    acionarTeclaE(){
        this.time.addEvent({
            delay: 500, // Tempo em milissegundos (10 segundos)
            callback: () => {
                this.scene.start('movChar');; // Carrega o jogo
            },
            loop: true // Se true, repete infinitamente
        });
    }
}