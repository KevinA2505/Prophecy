import Phaser from 'phaser';
import { gameState } from '../core/GameState';
import { SceneKeys } from '../core/SceneKeys';
import { InfoPanel } from '../ui/components/InfoPanel';

export class PlanetScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Planet);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0d1323');
    const player = gameState.player;
    if (!player) {
      this.add.text(40, 40, 'No hay jugador creado', { color: '#ffaaaa' });
      return;
    }

    this.add.text(40, 30, `Planeta: ${player.currentPlanet}`, { fontSize: '24px', color: '#ffffff' });
    this.add.circle(200, 220, 80, 0x69c5ff, 0.5);
    this.add.text(320, 200, 'Ciudad principal', { color: '#b8c7f2' });
    this.add.rectangle(320, 230, 120, 60, 0x3c4a6b, 0.8);

    const panel = new InfoPanel(this, 640, 40);
    panel.addLine({ label: 'Habitantes', value: 'Metrópolis con comercio activo' });
    panel.addLine({ label: 'Hangar', value: 'Recoge tu nave inicial' });
    panel.addLine({ label: 'Controles', value: 'Presiona ESPACIO para ir al espacio' });

    this.input.keyboard?.once('keydown-SPACE', () => this.scene.start(SceneKeys.Space));
  }
}
