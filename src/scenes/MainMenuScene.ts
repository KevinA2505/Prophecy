import Phaser from 'phaser';
import { SceneKeys } from '../core/SceneKeys';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.MainMenu);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#02050d');
    this.drawStarfield();

    const title = this.add.text(480, 160, 'Prophecy of the Outer Realms', {
      fontSize: '34px',
      color: '#e5edff',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);

    const subtitle = this.add.text(480, 205, 'Explora sistemas estelares en un vacío infinito', {
      fontSize: '18px',
      color: '#8fa6ff',
    });
    subtitle.setOrigin(0.5);

    const startButton = this.add.rectangle(480, 300, 260, 70, 0x0f1a33, 0.8).setStrokeStyle(2, 0x5ea8ff, 0.7);
    startButton.setInteractive({ useHandCursor: true }).on('pointerup', () => this.startCreation());

    const startLabel = this.add.text(480, 300, 'Iniciar expedición', {
      fontSize: '20px',
      color: '#e5edff',
      fontStyle: 'bold',
    });
    startLabel.setOrigin(0.5);

    const instructions = this.add.text(
      480,
      380,
      'Pulsa ESPACIO o haz clic para configurar tu tripulación',
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
    const stars = this.add.graphics({ fillStyle: { color: 0xffffff, alpha: 0.9 } });
    for (let i = 0; i < 120; i += 1) {
      const x = Phaser.Math.Between(0, 960);
      const y = Phaser.Math.Between(0, 540);
      const size = Phaser.Math.FloatBetween(0.5, 1.5);
      stars.fillCircle(x, y, size);
    }

    const glow = this.add.graphics({ fillStyle: { color: 0x19366d, alpha: 0.55 } });
    glow.fillCircle(260, 120, 140);
    glow.fillCircle(720, 420, 180);
  }

  private startCreation(): void {
    this.scene.start(SceneKeys.CharacterCreation);
  }
}
