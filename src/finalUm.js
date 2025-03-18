class finalUm extends Phaser.Scene { // define finalUm como extensão da cena do Phasser
    constructor() {
        super({ key: 'finalUm' });
    }
preload(){
    this.load.image("fundoFinal","assets/fundoFinalUm.png");
    this.load.image("passaporte","assets/pp.png");
    this.load.image('continuar', 'assets/charSelect/Continuar.png');
    this.load.image("reiniciar","assets/botaoReiniciar.png");
    this.load.image("cursor", "assets/cursor.png");
    this.load.image("vermelha","assets/medalhaVermelha.png");
    this.load.audio('carimboSom', 'assets/sons/carimboSom.mp3');
};
create(){ 
    // adiciona uma transição de início para a cena
    this.cameras.main.fadeIn(1000); // 1000ms (1 segundo) para o fade-in

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

    this.fundoFinal = this.add.image(400, 300, "fundoFinal").setScale(2).setOrigin (0.515, 0.49);
    // Anima o fundo para escurecer gradualmente
    this.tweens.add({
        targets: this.fundoFinal,
        alpha: 0.3, // A opacidade vai diminuir para 0.3 (escurecendo a imagem)
        duration: 2400, // Tempo da animação
        ease: 'Power2' // Suavização da animação
    });

    this.passaporte = this.add.image(400, 250, "passaporte").setScale(0.07);
    this.tweens.add({
        targets: this.passaporte,
        scale: 0.4, // Tamanho final
        duration: 3000, // Tempo da animação em milissegundos
        ease: 'Power2', // Suavização da animação
    });

    // Medalha Vermelha
    this.vermelha = this.add.image(445, 235, "vermelha").setScale().setAlpha(0)

    this.time.delayedCall(2500, () => { 
    this.vermelha.setAlpha(1); // Torna a medalha visível no momento certo

    // Tocar o som durante a animação (pode ser um som de carimbo ou impacto)
    this.time.delayedCall(900, () => {
        this.musica = this.sound.add("carimboSom");
        this.musica.play({ 
            volume: 0.5  // Reproduz o som de carimbo após 100ms de delay
    });
    });

    // Primeiro efeito: Impacto rápido
    this.tweens.add({
        targets: this.vermelha,
        scale: 1.04,  // Pequeno impacto (não muito brusco)
        duration: 1000, // Mais rápido para parecer um carimbo
        ease: 'Back.Out', // Elasticidade suave
        onComplete: () => { 
            // Segundo efeito: Ajuste suave para 0.9
            this.tweens.add({
                targets: this.vermelha,
                scale: 0.9,
                duration: 500, // Mais lento para suavizar o ajuste
                ease: 'Sine.Out' // Efeito de suavização natural
            });
        }
    });
});

    // Botão Continuar
    this.continuar = this.add.image(570, 530, "continuar").setScale(0.4).setInteractive();
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
                            musicaAntiga.stop();
                            musicazona.mute = false;
                            this.scene.start('movCharTwo');
                        },
                    });
                },
            });
            
        });

    // Botão Reiniciar
    this.reiniciar = this.add.image(230, 530, "reiniciar").setScale(0.4).setInteractive();
    // Se o mouse estiver sobre o Botão Reiniciar
    this.reiniciar.on('pointerover', () => {
        
        this.tweens.add({ // Adiciona animação
            targets: this.reiniciar, // Define que a animação é para o botaoIniciar
            scale: 0.42, // Diminui o tamanho do botão para o normal
            duration: 200, // Define duração como 0.2 segundos
            ease: 'Linear' // Define movimento da animação como linear(constante)
        });
    });

    // Se o mouse sair do Botão Continuar
    this.reiniciar.on('pointerout', () => {
        this.tweens.add({ // Adiciona animação
            targets: this.reiniciar, // Define que a animação é para o botaoDireita
            scale: 0.4, // Aumenta o tamanho do botão
            duration: 200, // Define duração como 0.2 segundos
            ease: 'Linear' // Define movimento da animação como linear(constante)
        });
    });
    
    this.reiniciar.on('pointerdown', () => { // Ao clicar o botão reiniciar:
        let musicaAntiga = this.sound.get('musicaFaseUm');
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0); // / cria um fade out de 1 segundo
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        musicaAntiga.stop();
                        this.scene.start('faseUm'); 
                    },
                });
            },
        });
    });

};
upload(){

};
}