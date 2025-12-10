import Phaser from 'phaser';
import { gameState } from '../core/GameState';
import { SceneKeys } from '../core/SceneKeys';
import { InfoPanel } from '../ui/components/InfoPanel';

export class SpaceScene extends Phaser.Scene {
  private ship?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor() {
    super(SceneKeys.Space);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#05070a');

    const player = gameState.player;
    if (!player?.ship) {
      this.add.text(40, 40, 'No hay nave inicial asignada', { color: '#ffaaaa' });
      return;
    }

    this.ship = this.physics.add.image(480, 270, '').setDisplaySize(32, 48).setTint(0x7ad7f0);
    this.ship.setDrag(100);
    this.ship.setAngularDrag(100);
    this.ship.setMaxVelocity(240);

    const panel = new InfoPanel(this, 680, 30);
    panel.addLine({ label: 'Piloto', value: player.name });
    panel.addLine({ label: 'Facción', value: player.factionId });
    panel.addLine({ label: 'Nave', value: player.ship.name });
    panel.addLine({ label: 'Controles', value: 'W A S D + Espacio' });

    this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (!this.ship) return;
      const rotSpeed = 3;
      const thrust = 12;
      if (event.key.toLowerCase() === 'a') this.ship.setAngularVelocity(-rotSpeed);
      if (event.key.toLowerCase() === 'd') this.ship.setAngularVelocity(rotSpeed);
      if (event.key.toLowerCase() === 'w') this.physics.velocityFromRotation(this.ship.rotation - Math.PI / 2, thrust, this.ship.body.acceleration);
      if (event.key.toLowerCase() === 's') this.physics.velocityFromRotation(this.ship.rotation + Math.PI / 2, thrust, this.ship.body.acceleration);
    });

    this.input.keyboard?.on('keyup', () => {
      this.ship?.setAngularVelocity(0);
      if (this.ship) this.ship.setAcceleration(0);
    });
  }
}
