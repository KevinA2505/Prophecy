import Phaser from 'phaser';
import { gameState } from '../core/GameState';
import { SceneKeys } from '../core/SceneKeys';
import { createDefaultPlayer, Species } from '../game/entities/Player';
import { starterShuttle } from '../game/entities/Ship';
import { Universe } from '../game/Universe';
import { factions, FactionId } from '../game/factions';
import { InfoPanel } from '../ui/components/InfoPanel';

export class CharacterCreationScene extends Phaser.Scene {
  private selectedFaction: FactionId = 'aetherion';
  private selectedSpecies: Species = 'humano';

  constructor() {
    super(SceneKeys.CharacterCreation);
  }

  create(): void {
    this.add.text(40, 30, 'Creación de personaje', { fontSize: '24px', color: '#ffffff' });

    this.add.text(40, 90, 'Selecciona facción (1-4):', { color: '#b8c7f2' });
    Object.values(factions).forEach((faction, index) => {
      const text = this.add.text(60, 120 + index * 22, `${index + 1}. ${faction.name}`, {
        color: Phaser.Display.Color.IntegerToColor(faction.color).rgba,
      });
      text.setInteractive({ useHandCursor: true }).on('pointerup', () => {
        this.selectedFaction = faction.id;
        this.renderPreview();
      });
    });

    this.add.text(40, 230, 'Especies (Q humano / W robot / E alien):', { color: '#b8c7f2' });

    this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (event.key === '1') this.selectedFaction = 'aetherion';
      if (event.key === '2') this.selectedFaction = 'solari';
      if (event.key === '3') this.selectedFaction = 'voidborn';
      if (event.key === '4') this.selectedFaction = 'nomads';
      if (event.key.toLowerCase() === 'q') this.selectedSpecies = 'humano';
      if (event.key.toLowerCase() === 'w') this.selectedSpecies = 'robot';
      if (event.key.toLowerCase() === 'e') this.selectedSpecies = 'alien';
      this.renderPreview();
    });

    this.add.text(40, 320, 'Pulsa ENTER para comenzar', { color: '#ffffff' });
    this.input.keyboard?.once('keydown-ENTER', () => this.startGame());

    this.renderPreview();
  }

  private renderPreview(): void {
    this.children.removeAll();
    this.add.text(40, 30, 'Creación de personaje', { fontSize: '24px', color: '#ffffff' });
    const info = new InfoPanel(this, 40, 360);
    const faction = factions[this.selectedFaction];
    info.addLine({ label: 'Facción', value: faction.name });
    info.addLine({ label: 'Especie', value: this.selectedSpecies });
    info.addLine({ label: 'Mundo inicial', value: faction.homeworld });
    this.add.text(40, 320, 'Pulsa ENTER para comenzar', { color: '#ffffff' });
  }

  private startGame(): void {
    const playerName = 'Explorador';
    const player = createDefaultPlayer(playerName, 'no-binario', this.selectedSpecies, this.selectedFaction);
    player.ship = starterShuttle();

    gameState.player = player;
    gameState.universe = new Universe();
    this.scene.start(SceneKeys.Planet);
  }
}
