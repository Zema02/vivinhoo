
var botaoE, atualizacao = false; // cria variáveis
var keyPressed = false; // variável que verifica se a tecla "E" fo pressionada

class movCharTwo extends Phaser.Scene { // define movCharTwo como extensão da cena do Phasser
    constructor() {
        super({ key: 'movCharTwo' });
    }

    preload() {
        this.load.image('segundaCena', 'assets/maprecepao_two.png'); // carrega o cenário
        this.load.image('botaoE', 'assets/botoes/botao_e.png'); // carregar a imagem do botão E
    }

    create() {

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

        // Botões para mobile

        botaoW = this.add.image(100, 440, 'botaoW').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        botaoA = this.add.image(40, 500, 'botaoA').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        botaoS = this.add.image(100, 560, 'botaoS').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        botaoD = this.add.image(160, 500, 'botaoD').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        interagir = this.add.image(720, 500, 'botaoE').setScale(0.65).setAlpha(0).setDepth(90).setInteractive();

        // Tela de Fundo

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'segundaCena') // define que a tela de fundo é igual ao tamanho da câmera dividido por 2
            .setOrigin(0.5, 0.5) // define a origem da tela de fundo
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height); // define o tamnho da tela como o da câmera

        // Interatividade botão E, portas e início das fases
        botaoE = this.add.image(70, 60, 'botaoE').setScale(0.5).setVisible(false).setInteractive(); // define as configurações da imagem do botão E



        this.input.keyboard.on('keydown-E', () => { // registra um evento ao pressionar a tecla "E"
            this.acionarTeclaE();
        });

        interagir.on('pointerdown', () => {
            this.acionarTeclaE();
        });

        // 🔹 Recuperar a posição salva (se houver)
        let lastPosition = this.registry.get('lastPosition');

        // Se não houver posição salva, define a posição inicial padrão
        if (!lastPosition) {
            lastPosition = { x: 400, y: 550 }; // Posição inicial padrão
        }

        // Criar o jogador na posição recuperada ou padrão
        player = this.physics.add.sprite(lastPosition.x, lastPosition.y, 'player');
        player.setCollideWorldBounds(true); // Garante que o player não sairá da tela

        const colisao1 = this.physics.add.staticImage(410, 330, null).setSize(270, 140).setVisible(false);
        const colisao2 = this.physics.add.staticImage(10, 300, null).setSize(25, 600).setVisible(false);
        const colisao3 = this.physics.add.staticImage(790, 300, null).setSize(25, 600).setVisible(false);
        const colisao4 = this.physics.add.staticImage(70, 330, null).setSize(60, 120).setVisible(false);
        const colisao5 = this.physics.add.staticImage(730, 330, null).setSize(60, 120).setVisible(false);
        const colisao6 = this.physics.add.staticImage(400, 10, null).setSize(800, 103).setVisible(false);

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
    }

    update() {

        // Visibilidade do botão E
        if (player.x > 95 && player.x < 180 && player.y < 120 && player.y > 0 && !atualizacao) { // verifica a posição do jogador
            botaoE.setVisible(true); // torna o "botão E" visível
            botaoE.setInteractive(); // torna o botão E interativo
            atualizacao = true; // define a variável para que a lógica não se repita

        } else if (atualizacao && !(player.x > 95 && player.x < 180 && player.y < 120 && player.y > 0)) { // verifica a posição do jogador
            botaoE.setVisible(false); // torna o "botão E" invisível
            botaoE.setInteractive(false); // desativa a interatividade quando o botão E não é visível
            atualizacao = false; // define a variável para que a lógica possa ser aplicda novamente
        }

        // Movimentação do jogador

        let velocidade = 150; // define a variavel velocidade como 150
        // desabilitando diagonal
        if (andandoX === false) {
            if (cursors.up.isDown || wasd.up.isDown) { // se a seta(cursors) para cima ou tecla W(wasd.cima) estiver clicada:
                player.setVelocity(0, -velocidade); // define a velocidadeY é igual a variável velocidade negativa
                player.anims.play('up', true); // inicia a animação para cima 
                andandoY = true;

            }
            else if (cursors.down.isDown || wasd.down.isDown) { // se a seta(cursors) para baixo ou a tecla S(wasd.baixo) estiver clicada:
                player.setVelocity(0, velocidade); // define a velocidade Y é igual a variável velocidade
                player.anims.play('down', true); // inicia a animação para baixo
                andandoY = true;
            } else {
                andandoY = false;
            }
        }

        if (andandoY === false) {
            if (cursors.left.isDown || wasd.left.isDown) { // se a seta(cursors) para esquerda ou a tecla A(wasd.left) estiver clicada:
                player.setVelocity(-velocidade, 0); // a velocidadeX do player é igual a variável velocidade negativa
                player.anims.play('left', true); // inicia a animação para esquerda
                andandoX = true;
            }
            else if (cursors.right.isDown || wasd.right.isDown) { // se a seta(cursors) para direita ou tecla D(wasd.right) estiver clicada:
                player.setVelocity(velocidade, 0); // define a velocidadeX é igual a variável velocidade
                player.anims.play('right', true); // inicia a animação para direita
                andandoX = true;
            } else {
                andandoX = false;
            }
        }



        if (!cursors.left.isDown && !cursors.right.isDown &&
            !cursors.up.isDown && !cursors.down.isDown &&
            !wasd.left.isDown && !wasd.right.isDown &&
            !wasd.up.isDown && !wasd.down.isDown) { // se duas teclas opostas(esquerda e direita ou cima e baixo) estiveram clicadas juntas:
            player.setVelocity(0, 0); //define a velocidade do player
            player.anims.restart();//Reseta a animação do personagem para a ultima sprite do movimento
            player.anims.stop();//Define a sprite como a ultima
        }


        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Atribui o teclaE ao click da tecla E

        // Escopo referente aos botões mobile
        let clicandoX = false, clicandoY = false;

        if (clicandoX == false) {
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
        if (clicandoY == false) {
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




        var botoes = [botaoA, botaoD, botaoS, botaoW, interagir]

        // Se o mobile estiver desativado:
        if (MobileSystemOn === true) {
            if (mobileOn === false) {
                for (var i of botoes) {
                    i.setAlpha(0); // Deixa os botões mobile invisiveis
                    i.disableInteractive(); // Transforma o botão em não-clicável
                }
            }
            else {
                for (var i of botoes) {
                    i.setAlpha(1); // Deixa os botões mobile visiveis
                    i.setInteractive(); // Transforma o botão em clicável
                }
            }
        }

    }
    acionarTeclaE() {
        if (botaoE.visible && botaoE.input.enabled) { // verifica se o botão está visível e habilidado a receber interações
            keyPressed = true; // muda o valor da variável

            // 🔹 Salvar posição antes de sair da cena
            this.registry.set('lastPosition', { x: player.x, y: player.y });

            // Transição
            this.cameras.main.fadeOut(1000, 0, 0, 0); // / cria um fade out de 1 segundo

            // após o fade out, troca de cena para "faseUm"
            this.time.delayedCall(1000, () => {
                this.scene.start('faseUm');
            });
        }
    }
}