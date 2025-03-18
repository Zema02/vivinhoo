// Variáveis do diálogo inicial

var indiceFalaAtualS = 0;
var fala1, fala2, fala3, fala4;
var filtroPreto;

//  Variáveis da barra de progresso
var progresso = 0;

// Variáveis para a seleção das opções
var indiceImagem2 = 0;
var opcaoSelecionada = [];

// VARIÁVEIS DE NÚMERO DE ACERTO
var acertou = 0;

// Opções de preenchimento curriculo
var texto, texto2, texto3, texto4;

// ATUALIZANDO PORCENTAGEM

var por0 = "0", por25 = "25", por50 = "50", por75 = "75", por100 = "100";
var porcentagemSelecionada = [por0, por25, por50, por75, por100];

// OPÇÕES POSSÍVEIS PARA SELECIONAR

var opcaoText = ['Básico', 'contato.secundario@gmail.com', 'Em nada', 'duas vezes']
var opcaoText2 = ['nao sei', 'contato.oficial@gmail.com', 'Básica', '6 meses']
var opcaoText3 = ['Ruim', 'zezinho.lindo@hotmail.com', 'Em TI', '5 dias']

// VARIÁVEIS PARA CONTAGEM DE TEMPO

let tempoDecorrido = 0;
let tempoTexto;
let comecarTempo = false;

var respostasCorretas = ['Básico', 'contato.oficial@gmail.com', 'Em TI', '6 meses'];
class faseUm extends Phaser.Scene { // define faseUm como extensão da cena do Phasser
    constructor() {
        super({ key: 'faseUm' });
    }
    preload() {
        // carrega as imagens do dialogo
        this.load.image('fala1-s', 'assets/textbox/Fala1-S.png');
        this.load.image('fala2-s', 'assets/textbox/Fala2-S.png');
        this.load.image('fala3-s', 'assets/textbox/Fala3-S.png');
        this.load.image('fala4-s', 'assets/textbox/Fala4-S.png');
        // carrega as imagens da cena
        this.load.image("botaoDireita", "assets/botaoDireita.png");
        this.load.image("botaoEsquerda", "assets/botaoEsquerda.png");
        this.load.image("diferentesOpcoes", "assets/diferentesOpcoes.png");
        this.load.image("opcao", "assets/opcao.png");
        this.load.image("opcao2", "assets/opcao2.png");
        this.load.image("opcao3", "assets/opcao3.png");
        this.load.audio("musicaFaseUm", "assets/musicaFaseUm.mp3");

        if (personagem == 1) {
            this.load.image("personagem", "assets/personagem.png");
        } else {
            this.load.image("personagem", "assets/personagem2.png");
        }

        this.load.image("progresso", "assets/progresso.png");
        this.load.image("retanguloRoxo", "assets/retanguloRoxo.png");
        this.load.image("curriculo", "assets/curriculo.png");
        this.load.image("secretaria", "assets/secretaria.png");
        this.load.image("selecionado", "assets/selecionado.png");
        this.load.image("cursor", "assets/cursor.png");
        this.load.image('gameover', 'assets/GameOver.png')
        this.load.image('continuar', 'assets/charSelect/Continuar.png');
        // Porcentagem 
        this.load.image("0", "assets/porcentagem.png");
        this.load.image('25', 'assets/porcentagem2.png');
        this.load.image('50', 'assets/porcentagem3.png');
        this.load.image('75', 'assets/porcentagem4.png');
        this.load.image('100', 'assets/porcentagem5.png');

    };
    create() {
        // Para a música anterior
        let musicazona = this.sound.get('musicaMovChar');
        musicazona.mute = true;
        // Inicia a musica atual
        let musicazinha = this.sound.add('musicaFaseUm', {
            loop: true,
            volume: 0.3
        });

        setTimeout(() => {
            musicazinha.play();
        }, 3000);

        // Cria um gráfico para desenhar
        filtroPreto = this.add.graphics();
        // Define a cor preta com 50% de transparência (0x000000 é preto, 0.5 é a opacidade)
        filtroPreto.fillStyle(0x000000, 0.7);
        // Desenha um retângulo cobrindo toda a tela
        filtroPreto.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        // Garante que o filtro fique na camada correta (ajuste conforme necessário)
        filtroPreto.setDepth(5);

        // adiciona as falas do jogo

        fala1 = this.add.image(430, 380, 'fala1-s').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        fala2 = this.add.image(430, 380, 'fala2-s').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        fala3 = this.add.image(430, 380, 'fala3-s').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();
        fala4 = this.add.image(430, 380, 'fala4-s').setScale(0.55).setAlpha(0).setDepth(90).setInteractive();

        // adiciona uma transição de início para a cena
        this.cameras.main.fadeIn(1000); // 1000ms (1 segundo) para o fade-in

        // adiciona as imagens a cena
        this.personagem = this.add.image(110, 260, 'personagem').setScale(0.5);
        this.secretaria = this.add.image(690, 290, 'secretaria').setScale(0.5);
        this.curriculo = this.add.image(400, 280, 'curriculo').setScale(0.5);
        this.progresso = this.add.image(400, 60, 'progresso').setScale(0.6);
        this.retanguloRoxo = this.add.image(400, 495, 'retanguloRoxo').setScale(0.55);
        this.botaoDireita = this.add.image(700, 500, 'botaoDireita').setScale(0.5).setInteractive();
        this.botaoEsquerda = this.add.image(100, 500, 'botaoEsquerda').setScale(0.5).setInteractive();
        this.diferentesOpcoes = this.add.image(430, 570, 'diferentesOpcoes').setScale(0.7);
        this.diferentesOpcoes2 = this.add.image(410, 570, 'diferentesOpcoes').setScale(0.7);
        this.selecionado = this.add.image(380, 570, 'selecionado').setScale(0.7);
        this.opcao = this.add.image(400, 500, 'opcao').setScale(0.65);
        this.porcentagem = this.add.image(740, 60, porcentagemSelecionada[acertou]).setScale(0.6);
        this.gameover = this.add.image(400, 300, 'gameover').setScale(2).setAlpha(0);

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



        // Botão Esquerdo
        // Se o mouse estiver sobre o botaoEsquerda
        this.botaoEsquerda.on('pointerover', () => {
            this.tweens.add({ // Adiciona animação
                targets: this.botaoEsquerda, // Define que a animação é para o botaoIniciar
                scale: 0.52, // Diminui o tamanho do botão para o normal
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        // Se o mouse sair do botaoEsquerda
        this.botaoEsquerda.on('pointerout', () => {
            this.tweens.add({ // Adiciona animação
                targets: this.botaoEsquerda, // Define que a animação é para o botaoDireita
                scale: 0.5, // Aumenta o tamanho do botão
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        // Botão Direito
        // Se o mouse estiver sobre o botaoDireito
        this.botaoDireita.on('pointerover', () => {
            this.tweens.add({ // Adiciona animação
                targets: this.botaoDireita, // Define que a animação é para o botaoIniciar
                scale: 0.52, // Diminui o tamanho do botão para o normal
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        // Se o mouse sair do botaoDireita
        this.botaoDireita.on('pointerout', () => {
            this.tweens.add({ // Adiciona animação
                targets: this.botaoDireita, // Define que a animação é para o botaoDireita
                scale: 0.5, // Aumenta o tamanho do botão
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        let imagens2 = ['opcao', 'opcao2', 'opcao3'];


        // Evento de clique para mudar as opções

        this.botaoDireita.on('pointerdown', () => {
            indiceImagem2 = (indiceImagem2 + 1) % imagens2.length;
            this.opcao.setTexture(imagens2[indiceImagem2]);

            if (indiceImagem2 === 0) {
                this.diferentesOpcoes.setVisible(false);
                this.diferentesOpcoes2.setVisible(false);
                this.selecionado.setVisible(false);

                this.diferentesOpcoes = this.add.image(430, 570, 'diferentesOpcoes').setScale(0.7);
                this.diferentesOpcoes2 = this.add.image(410, 570, 'diferentesOpcoes').setScale(0.7);
                this.selecionado = this.add.image(380, 570, 'selecionado').setScale(0.7);

                opcaoSelecionada = 0;
            } else if (indiceImagem2 === 1) {
                this.diferentesOpcoes.setVisible(false);
                this.diferentesOpcoes2.setVisible(false);
                this.selecionado.setVisible(false);

                this.diferentesOpcoes = this.add.image(380, 570, 'diferentesOpcoes').setScale(0.7);
                this.selecionado = this.add.image(405, 570, 'selecionado').setScale(0.7);
                this.diferentesOpcoes2 = this.add.image(430, 570, 'diferentesOpcoes').setScale(0.7);
            } else if (indiceImagem2 === 2) {
                this.diferentesOpcoes.setVisible(false);
                this.diferentesOpcoes2.setVisible(false);
                this.selecionado.setVisible(false);

                this.diferentesOpcoes = this.add.image(400, 570, 'diferentesOpcoes').setScale(0.7);
                this.diferentesOpcoes2 = this.add.image(380, 570, 'diferentesOpcoes').setScale(0.7);
                this.selecionado = this.add.image(430, 570, 'selecionado').setScale(0.7);
            }
        });

        this.botaoEsquerda.on('pointerdown', () => {
            indiceImagem2 = (indiceImagem2 - 1 + imagens2.length) % imagens2.length;
            this.opcao.setTexture(imagens2[indiceImagem2]);

            if (indiceImagem2 === 0) {
                this.diferentesOpcoes.setVisible(false);
                this.diferentesOpcoes2.setVisible(false);
                this.selecionado.setVisible(false);

                this.diferentesOpcoes = this.add.image(430, 570, 'diferentesOpcoes').setScale(0.7);
                this.diferentesOpcoes2 = this.add.image(410, 570, 'diferentesOpcoes').setScale(0.7);
                this.selecionado = this.add.image(380, 570, 'selecionado').setScale(0.7);

                this.opcaoSelecionada = opcaoText;
            } else if (indiceImagem2 === 1) {
                this.diferentesOpcoes.setVisible(false);
                this.diferentesOpcoes2.setVisible(false);
                this.selecionado.setVisible(false);

                this.diferentesOpcoes = this.add.image(380, 570, 'diferentesOpcoes').setScale(0.7);
                this.selecionado = this.add.image(405, 570, 'selecionado').setScale(0.7);
                this.diferentesOpcoes2 = this.add.image(430, 570, 'diferentesOpcoes').setScale(0.7);
            } else if (indiceImagem2 === 2) {
                this.diferentesOpcoes.setVisible(false);
                this.diferentesOpcoes2.setVisible(false);
                this.selecionado.setVisible(false);

                this.diferentesOpcoes = this.add.image(400, 570, 'diferentesOpcoes').setScale(0.7);
                this.diferentesOpcoes2 = this.add.image(380, 570, 'diferentesOpcoes').setScale(0.7);
                this.selecionado = this.add.image(430, 570, 'selecionado').setScale(0.7);
            }
        });


        texto = this.add.text(510, 266, '', {
            fontSize: '100px',
            fontFamily: 'ByteBounce',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5).setScale(0.2);

        texto2 = this.add.text(450, 370, '', {
            fontSize: '100px',
            fontFamily: 'ByteBounce',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5).setScale(0.2);
        texto3 = this.add.text(530, 302, '', {
            fontSize: '100px',
            fontFamily: 'ByteBounce',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5).setScale(0.2);
        texto4 = this.add.text(530, 338, '', {
            fontSize: '100px',
            fontFamily: 'ByteBounce',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5).setScale(0.2);

        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.trocaFalas();
        this.trocaOpcoes();

        // BARRA DE PROGRESSO

        // Variável de progresso (0 a 1)
        this.progress = 0;

        // Criando a barra de fundo (background)
        this.progressBarBackground = this.add.graphics();
        this.progressBarBackground.fillStyle(0xffffff, 1);
        this.progressBarBackground.fillRect(125, 50, 550, 20, 15);

        // Criando a barra de progresso (foreground)
        this.progressBar = this.add.graphics();

        //MOBILE
        interagir = this.add.image(720, 400, 'botaoE').setScale(0.65).setAlpha(0).setDepth(90).setInteractive();

        if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
            MobileSystemOn = true;
            console.log("Usuário está em um dispositivo móvel.");
            this.cursor = null;
            interagir.setInteractive();
            interagir.setAlpha(1);

        } else {
            MobileSystemOn = false;
            console.log("Usuário está em um desktop.");
        }

        interagir.on('pointerdown', () => {
            this.trocaFalas();
        });

        // Definir tempo inicial (3 minutos = 180 segundos)
        this.tempoRestante = 60;

        // Criar um texto para exibir o tempo no canto superior direito
        this.relogioTexto = this.add.text(110, 34, this.inicio, {
            fontSize: '50px',
            fontFamily: 'ByteBounce',
            color: '#ffffff',
        }).setOrigin(1, 0);
        this.inicio = '01:00'
        // Configurar um evento que reduz o tempo a cada segundo

        // botao CONTINUAR

        // Botão Continuar
        this.continuar = this.add.image(400, 500, "continuar").setScale(0.4).setInteractive().setAlpha(0);
        // Se o mouse estiver sobre o Botão Continuar
        this.continuar.on('pointerover', () => {
            this.tweens.add({ // Adiciona animação
                targets: this.continuar, // Define que a animação é para o botaoIniciar
                scale: 0.42, // Diminui o tamanho do botão para o normal
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        // Se o mouse sair do Botão Continuar
        this.continuar.on('pointerout', () => {
            this.tweens.add({ // Adiciona animação
                targets: this.continuar, // Define que a animação é para o botaoDireita
                scale: 0.4, // Aumenta o tamanho do botão
                duration: 200, // Define duração como 0.2 segundos
                ease: 'Linear' // Define movimento da animação como linear(constante)
            });
        });

        this.continuar.on('pointerdown', () => { // Ao clicar o botão continuar:
            let musicaAntiga = this.sound.get('musicaFaseUm');
            let musicazona = this.sound.get('musicaMovChar');
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.cameras.main.fadeOut(1000, 0, 0, 0); // / cria um fade out de 1 segundo
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            musicazinha.stop();
                            musicaAntiga.stop();
                            musicazona.mute = false;
                            this.scene.start('movCharTwo');
                        },
                    });
                },
            });

        });


    };

    update() {

        // MOSTRA QUAL DAS TELAS DE OPÇÕES O JOGADOR ESTÁ

        if (indiceImagem2 === 0) {
            opcaoSelecionada = opcaoText;
        } else if (indiceImagem2 === 1) {
            opcaoSelecionada = opcaoText2;
        } else {
            opcaoSelecionada = opcaoText3;
        }
        // AO CLICAR A TECLA E
        if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            this.teclaE.enabled = false;
            this.trocaFalas();

            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.teclaE.enabled = true;
                },
            });

        }

    };

    // FUNÇÃO PARA NPC VICTORIA: Avança as falas da personagem
    trocaFalas() {
        var falasS = [fala1, fala2, fala3, fala4];

        if (indiceFalaAtualS < falasS.length + 1) {
            this.tweens.add({ targets: falasS[indiceFalaAtualS - 1], alpha: 0, duration: 1000, ease: 'Power2' });
            this.tweens.add({ targets: falasS[indiceFalaAtualS], alpha: 1, duration: 1000, ease: 'Power2' });
            indiceFalaAtualS++;
        }

        if (indiceFalaAtualS === 5) {
            this.tweens.add({ targets: falasS[indiceFalaAtualS - 1], alpha: 0, duration: 1000, ease: 'Power2' });
            inicioFalas = false;
            filtroPreto.setDepth(-1)
            this.time.addEvent({
                delay: 1000, // 1 segundo
                callback: this.atualizarRelogio,
                callbackScope: this,
                loop: true
            });
        }
    };
    // Carrega as opções de preenchimento do curriculo
    trocaOpcoes() {

        const opcao1 = this.add.rectangle(250, 478, 160, 32, 0x000000, 0).setInteractive();
        const opcao2 = this.add.rectangle(400, 525, 446, 32, 0x000000, 0).setInteractive();
        const opcao3 = this.add.rectangle(400, 478, 125, 32, 0x000000, 0).setInteractive();
        const opcao4 = this.add.rectangle(550, 478, 158, 32, 0x000000, 0).setInteractive();


        // Ao clicar cada um desses botões ele preenche o curriculo
        opcao1.on('pointerdown', () => {
            texto4.setText(opcaoSelecionada[0]);
            this.opcaoCorreta();
        })
        opcao2.on('pointerdown', () => {
            texto2.setText(opcaoSelecionada[1]);
            this.opcaoCorreta();
        })
        opcao3.on('pointerdown', () => {
            texto.setText(opcaoSelecionada[2]);
            this.opcaoCorreta();
        })
        opcao4.on('pointerdown', () => {
            texto3.setText(opcaoSelecionada[3]);
            this.opcaoCorreta();
        })
    }
    // Função caso o jogador termine 100% da fase 1
    opcaoCorreta() {

        acertou = 0;
        let respostasSelecionadas = [texto.text, texto2.text, texto3.text, texto4.text];


        // VERIFICA NÚMEROS DE ACERTOS
        if (texto4.text == respostasCorretas[0]) {
            acertou += 1;
            this.progress += 0.25;
            this.updateProgress();
        }
        if (texto2.text == respostasCorretas[1]) {
            acertou += 1;
            this.progress += 0.25;
            this.updateProgress();
        }
        if (texto.text == respostasCorretas[2]) {
            acertou += 1;
            this.progress += 0.25;
            this.updateProgress();
        }
        if (texto3.text == respostasCorretas[3]) {
            acertou += 1;
            this.progress += 0.25;
            this.updateProgress();
        }

        // Avança para a tela de passaporte
        if (acertou === 4) {
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.cameras.main.fadeOut(1000, 0, 0, 0); // / cria um fade out de 1 segundo
                    this.time.addEvent({
                        delay: 2000,
                        callback: () => {
                            indiceFalaAtualS = 0;
                            this.scene.start('finalUm');
                        },
                    });
                },
            });
        }
        console.log(acertou);
        this.porcentagem.setTexture(porcentagemSelecionada[acertou]);
        this.progress = 0;

    }
    updateProgress() {
        // Atualiza a barra de progresso
        this.progressBar.clear();
        this.progressBar.fillStyle(0x00ff00, 1);
        this.progressBar.fillRect(125, 50, 550 * this.progress, 20, 15);

    }
    // Atualiza o tempo do relógio
    atualizarRelogio() {
        if (this.tempoRestante > 0) {
            this.tempoRestante--;

            // Converter segundos para formato MM:SS
            let minutos = Math.floor(this.tempoRestante / 60);
            let segundos = this.tempoRestante % 60;

            // Garantir que sempre exiba dois dígitos (ex: 02:05)
            let tempoFormatado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

            // Atualizar o texto do relógio
            this.relogioTexto.setText(tempoFormatado);
        } else {
            // Se o tempo acabar, pode adicionar lógica para encerrar a fase
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    filtroPreto.setDepth(10)
                    indiceFalaAtualS = 0;
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            this.tweens.add({
                                targets: this.gameover,
                                alpha: 1,
                                duration: 1000, // Mais lento para suavizar o ajuste
                                ease: 'Power2' // Efeito de suavização natural
                            });
                            filtroPreto.fillStyle(0x000000, 0.85);
                            this.gameover.setScale(0.6);
                            this.gameover.setDepth(20);
                            this.continuar.setAlpha(1);
                            this.continuar.setDepth(20);
                        },
                    });
                },
            });
        }
    }
}