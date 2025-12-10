import Phaser from 'phaser';
import { SceneKeys } from './SceneKeys';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  width: 960,
  height: 540,
  parent: 'app',
  backgroundColor: '#05070a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  autoFocus: true,
  title: 'Prophecy of the Outer Realms',
  render: {
    pixelArt: true,
  },
};

export const initialScene = SceneKeys.Boot;
