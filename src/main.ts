import Phaser from 'phaser';
import { gameConfig } from './core/GameConfig';
import { SceneKeys } from './core/SceneKeys';
import { BootScene } from './scenes/BootScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { CharacterCreationScene } from './scenes/CharacterCreationScene';
import { PlanetScene } from './scenes/PlanetScene';
import { SpaceScene } from './scenes/SpaceScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  ...gameConfig,
  scene: [BootScene, MainMenuScene, CharacterCreationScene, PlanetScene, SpaceScene],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const game = new Phaser.Game(config);
