import Phaser from 'phaser';
import { SceneKeys } from '../core/SceneKeys';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.MainMenu);
  }

  create(): void {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#02050d');
    this.drawStarfield();

    const frame = this.add.rectangle(width / 2, height / 2, width - 40, height - 40, 0x0a1324, 0.55);
    frame.setStrokeStyle(2, 0x284a7a, 0.5);

    const title = this.add.text(width / 2, height * 0.2, 'Prophecy of the Outer Realms', {
      fontSize: '36px',
      color: '#e5edff',
      fontStyle: 'bold',
      stroke: '#0b1e3c',
      strokeThickness: 2,
    });
    title.setOrigin(0.5);

    const subtitle = this.add.text(
      width / 2,
      height * 0.27,
      'Explora sistemas estelares, recluta tripulación y sobrevive más allá de la Frontera Exterior',
      {
        fontSize: '18px',
        color: '#9eb6ff',
        wordWrap: { width: width * 0.75 },
        align: 'center',
      },
    );
    subtitle.setOrigin(0.5);

    this.buildMenuCards(width, height);

    const startButton = this.add
      .rectangle(width / 2, height * 0.78, 280, 72, 0x0f1a33, 0.85)
      .setStrokeStyle(3, 0x5ea8ff, 0.9)
      .setInteractive({ useHandCursor: true })
      .on('pointerup', () => this.startCreation())
      .on('pointerover', () => startButton.setScale(1.03))
      .on('pointerout', () => startButton.setScale(1));

    const startLabel = this.add.text(startButton.x, startButton.y, 'Iniciar expedición', {
      fontSize: '22px',
      color: '#e5edff',
      fontStyle: 'bold',
    });
    startLabel.setOrigin(0.5);

    const instructions = this.add.text(
      width / 2,
      height * 0.88,
      'Pulsa ESPACIO o ENTER para configurar tu tripulación y saltar al espacio',
      {
        fontSize: '16px',
        color: '#cdd9ff',
      },
    );
    instructions.setOrigin(0.5);

    this.input.keyboard?.once('keydown-SPACE', () => this.startCreation());
    this.input.keyboard?.once('keydown-ENTER', () => this.startCreation());
  }

  private drawStarfield(): void {
    const { width, height } = this.scale;
    const stars = this.add.graphics({ fillStyle: { color: 0xffffff, alpha: 0.9 } });
    for (let i = 0; i < 160; i += 1) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const size = Phaser.Math.FloatBetween(0.5, 1.5);
      stars.fillCircle(x, y, size);
    }

    const glow = this.add.graphics({ fillStyle: { color: 0x19366d, alpha: 0.55 } });
    glow.fillCircle(width * 0.28, height * 0.24, 160);
    glow.fillCircle(width * 0.76, height * 0.78, 200);
  }

  private buildMenuCards(width: number, height: number): void {
    const cardWidth = width * 0.26;
    const cardHeight = 150;
    const baseY = height * 0.5;
    const labels = [
      {
        title: 'Navega',
        description: 'Mapa estelar ampliado para ver todos los sistemas sin recortes.',
        color: 0x1c2d4d,
      },
      {
        title: 'Pilota',
        description: 'Controles WASD/Cursores refinados con giros suaves y aceleración.',
        color: 0x1d3557,
      },
      {
        title: 'Prepárate',
        description: 'Briefing rápido de facciones y estado de tu expedición inicial.',
        color: 0x1b2844,
      },
    ];

    labels.forEach((card, index) => {
      const x = width * 0.25 + index * (cardWidth + 20);
      const panel = this.add.rectangle(x, baseY, cardWidth, cardHeight, card.color, 0.9);
      panel.setStrokeStyle(2, 0x4e6ea9, 0.6);

      const title = this.add.text(panel.x, panel.y - 46, card.title, {
        fontSize: '18px',
        fontStyle: 'bold',
        color: '#e5edff',
      });
      title.setOrigin(0.5);

      const description = this.add.text(panel.x, panel.y - 12, card.description, {
        fontSize: '14px',
        color: '#b7cbff',
        wordWrap: { width: cardWidth - 28 },
        align: 'center',
      });
      description.setOrigin(0.5, 0);
    });
  }

  private startCreation(): void {
    this.scene.start(SceneKeys.CharacterCreation);
  }
}
