import Phaser from 'phaser';
import { SceneKeys } from '../core/SceneKeys';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.MainMenu);
  }

  create(): void {
    const title = this.add.text(480, 120, 'Prophecy of the Outer Realms', {
      fontSize: '32px',
      color: '#ffffff',
    });
    title.setOrigin(0.5);

    const instructions = this.add.text(
      480,
      200,
      'Presiona ESPACIO para crear personaje',
      {
        fontSize: '18px',
        color: '#b8c7f2',
      },
    );
    instructions.setOrigin(0.5);

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start(SceneKeys.CharacterCreation);
    });
  }
}
