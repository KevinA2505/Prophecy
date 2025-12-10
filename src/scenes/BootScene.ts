import Phaser from 'phaser';
import { SceneKeys } from '../core/SceneKeys';

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Boot);
  }

  preload(): void {
    this.add.text(20, 20, 'Iniciando Prophecy of the Outer Realms...', {
      color: '#ffffff',
    });
  }

  create(): void {
    this.scene.start(SceneKeys.MainMenu);
  }
}
