var char;
var personagem = 0; // Começa do primeiro personagem

let larguraJogo = 800;
let alturaJogo = 600;

class charSelecao extends Phaser.Scene {
    constructor() {
        super({ key: 'charSelecao' });
    }

    preload() {
        this.load.image('back', 'assets/charSelect/bg.png');
        this.load.image('plataform', 'assets/charSelect/plataforma.png');
        this.load.image('direita', 'assets/charSelect/right.png');
        this.load.image('esquerda', 'assets/charSelect/left.png');
        this.load.image('titulo', 'assets/charSelect/titulo.png');
        this.load.image('button', 'assets/charSelect/Continuar.png');

        this.load.image('char1', 'assets/charSelect/char1.png');
        this.load.image('char2', 'assets/charSelect/char2.png');
        this.load.image('char3', 'assets/charSelect/char3.png');
        this.load.image('char4', 'assets/charSelect/char4.png');

        this.load.image('Vivian', 'assets/charSelect/name1.png');
        this.load.image('Vinicius', 'assets/charSelect/name2.png');
        this.load.image('Vanessa', 'assets/charSelect/name3.png');
        this.load.image('Vitor', 'assets/charSelect/name4.png');
    }

    create() {

        // Transição de entrada
        this.cameras.main.fadeIn(1000);

        // Cursor do mouse
        this.input.setDefaultCursor('none'); // desativa o cursor básico
        this.cursor = this.add.image(0, 0, 'cursor').setScale(0.5); // define o cursor como um novo cursor
        this.cursor.setDepth(1000); // define que o cursor irá sobrepor os objetos
        
        this.input.on('pointermove', (pointer) => { // se o cursor estiver em movimento:
            this.cursor.setPosition(pointer.x, pointer.y); // a posição do novo cursor é igual a posição do mouse
        });

        this.events.on('resume', () => {
            this.input.setDefaultCursor('none');
        });

        // Fundo
        let bg = this.add.image(0, 0, 'back').setOrigin(0, 0);
        bg.setDisplaySize(larguraJogo, alturaJogo);

        this.add.image(larguraJogo / 2, 380, 'plataform').setScale(0.4);

        // Botões alternador de personagem
        let botaoDireita = this.add.image(700, 340, 'direita').setScale(0.45).setInteractive();
        let botaoEsquerda = this.add.image(100, 340, 'esquerda').setScale(0.45).setInteractive();
        this.add.image(larguraJogo / 2, 120, 'titulo').setScale(0.45);
        let botaoContinua = this.add.image(larguraJogo / 2, 500, 'button').setScale(0.45).setInteractive();

        // Variáveis dos personagens
        let personagens = ['char1', 'char2', 'char4'];
        let nomes = ['Vivian', 'Vinicius', 'Vitor'];

        char = this.add.image(larguraJogo / 2, 280, personagens[personagem]).setScale(0.4); // Carrega imagem do personagem
        let nome = this.add.image(larguraJogo / 2, 410, nomes[personagem]).setScale(0.4); // Carrega nome do personagem

        botaoDireita.on('pointerdown', () => {
            personagem = (personagem + 1) % personagens.length;
            char.setTexture(personagens[personagem]);
            nome.setTexture(nomes[personagem]);
            console.log(personagem)
        });

        botaoEsquerda.on('pointerdown', () => {
            personagem = (personagem - 1 + personagens.length) % personagens.length;
            char.setTexture(personagens[personagem]);
            nome.setTexture(nomes[personagem]);
        });

        botaoContinua.on('pointerdown', () => {
            this.scene.start('cenaHist');
        });
    }
}