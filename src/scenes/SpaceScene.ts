import Phaser from 'phaser';
import { gameState } from '../core/GameState';
import { SceneKeys } from '../core/SceneKeys';
import { StarSystem } from '../game/entities/StarSystem';
import { InfoPanel } from '../ui/components/InfoPanel';

export class SpaceScene extends Phaser.Scene {
  private ship?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys?: Record<'W' | 'A' | 'S' | 'D', Phaser.Input.Keyboard.Key>;
  private selectedSystem?: StarSystem;
  private systemMarkers: Map<string, Phaser.GameObjects.Arc> = new Map();
  private systemLabels: Map<string, Phaser.GameObjects.Text> = new Map();
  private systemPanel?: InfoPanel;

  constructor() {
    super(SceneKeys.Space);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#05070a');

    const player = gameState.player;
    const universe = gameState.universe;
    if (!player || !player.ship || !universe) {
      this.add.text(40, 40, 'No hay datos de universo o nave disponibles', { color: '#ffaaaa' });
      return;
    }

    this.createStarfield();
    this.physics.world.setBounds(0, 0, 960, 540);
    this.cameras.main.setBounds(0, 0, 960, 540);

    universe.systems.forEach((system) => this.createSystemMarker(system));

    const startingSystem = universe.findSystemByPlanetName(player.currentPlanet);
    const startPosition = startingSystem?.position ?? { x: 480, y: 270 };

    this.createShipTexture();
    this.ship = this.physics
      .add.image(startPosition.x, startPosition.y, 'player-ship')
      .setDisplaySize(38, 42)
      .setTint(0x7ad7f0)
      .setDepth(2);
    this.ship.setDrag(120);
    this.ship.setAngularDrag(180);
    this.ship.setMaxVelocity(260);
    this.ship.setDamping(true);
    this.ship.setRotation(-Math.PI / 2);
    this.cameras.main.startFollow(this.ship, true, 0.08, 0.08);

    this.renderHud(player.ship.name, player.name, player.factionId);
    if (startingSystem) {
      this.selectSystem(startingSystem);
    }

    this.handleControls();
  }

  private createStarfield(): void {
    const stars = this.add.graphics({ fillStyle: { color: 0xffffff, alpha: 0.8 } });
    for (let i = 0; i < 180; i += 1) {
      const x = Phaser.Math.Between(0, 960);
      const y = Phaser.Math.Between(0, 540);
      const size = Phaser.Math.FloatBetween(0.5, 1.8);
      stars.fillCircle(x, y, size);
    }
    const nebula = this.add.graphics({ fillStyle: { color: 0x111f3a, alpha: 0.5 } });
    nebula.fillCircle(260, 140, 120);
    nebula.fillCircle(760, 420, 160);
  }

  private createSystemMarker(system: StarSystem): void {
    const colors: Record<StarSystem['starType'], number> = {
      amarilla: 0xffe066,
      roja: 0xff6b6b,
      azul: 0x6bb6ff,
    };

    const star = this.add.circle(system.position.x, system.position.y, 12, colors[system.starType], 0.9);
    star.setStrokeStyle(2, 0xffffff, 0.4);
    star.setInteractive({ useHandCursor: true });
    star.on('pointerup', () => this.selectSystem(system));
    star.on('pointerover', () => star.setScale(1.2));
    star.on('pointerout', () => star.setScale(this.selectedSystem?.id === system.id ? 1.25 : 1));

    if (system.hasAsteroidField) {
      this.add.circle(system.position.x, system.position.y, 20, 0xffffff, 0.08);
    }

    const label = this.add
      .text(system.position.x, system.position.y, system.name, {
        color: '#cdd9ff',
        fontSize: '12px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, -1.2);

    this.systemMarkers.set(system.id, star);
    this.systemLabels.set(system.id, label);
  }

  private renderHud(shipName: string, pilotName: string, faction: string): void {
    const hudPanel = new InfoPanel(this, 660, 24);
    hudPanel.addLine({ label: 'Piloto', value: pilotName });
    hudPanel.addLine({ label: 'Facción', value: faction });
    hudPanel.addLine({ label: 'Nave', value: shipName });
    hudPanel.addLine({ label: 'Controles', value: 'W A S D para moverte' });
  }

  private selectSystem(system: StarSystem): void {
    const previous = this.selectedSystem && this.systemMarkers.get(this.selectedSystem.id);
    previous?.setScale(1);

    this.selectedSystem = system;
    const marker = this.systemMarkers.get(system.id);
    marker?.setScale(1.25);

    this.systemLabels.forEach((label, id) => label.setAlpha(id === system.id ? 1 : 0.45));

    this.systemPanel?.destroy();
    this.systemPanel = new InfoPanel(this, 20, 24, 320);
    this.systemPanel.addLine({ label: 'Sistema', value: system.name });
    this.systemPanel.addLine({ label: 'Estrella', value: `Tipo ${system.starType}` });
    this.systemPanel.addLine({ label: 'Planetas', value: `${system.planets.length}` });
    const colonized = system.planets.filter((planet) => planet.colonized).length;
    this.systemPanel.addLine({ label: 'Colonizados', value: `${colonized}` });
    if (system.hasAsteroidField) this.systemPanel.addLine({ label: 'Peligros', value: 'Campo de asteroides' });
  }

  private handleControls(): void {
    this.cursorKeys = this.input.keyboard?.createCursorKeys();
    this.wasdKeys = this.input.keyboard?.addKeys('W,A,S,D') as Record<
      'W' | 'A' | 'S' | 'D',
      Phaser.Input.Keyboard.Key
    >;
  }

  update(): void {
    if (!this.ship) return;

    const rotationSpeed = 180;
    const thrust = 210;
    const decel = 120;

    const isLeft = this.cursorKeys?.left.isDown || this.wasdKeys?.A.isDown;
    const isRight = this.cursorKeys?.right.isDown || this.wasdKeys?.D.isDown;
    const isForward = this.cursorKeys?.up.isDown || this.wasdKeys?.W.isDown;
    const isBackward = this.cursorKeys?.down.isDown || this.wasdKeys?.S.isDown;

    const angularVelocity = (isLeft ? -rotationSpeed : 0) + (isRight ? rotationSpeed : 0);
    this.ship.setAngularVelocity(angularVelocity);

    const acceleration = new Phaser.Math.Vector2();
    if (isForward) {
      this.physics.velocityFromRotation(this.ship.rotation, thrust, acceleration);
    }
    if (isBackward) {
      const backwards = new Phaser.Math.Vector2();
      this.physics.velocityFromRotation(this.ship.rotation + Math.PI, decel, backwards);
      acceleration.add(backwards);
    }
    this.ship.setAcceleration(acceleration.x, acceleration.y);
  }

  private createShipTexture(): void {
    if (this.textures.exists('player-ship')) return;
    const graphics = this.add.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xffffff, 1);
    graphics.fillTriangle(0, 32, 16, 0, 32, 32);
    graphics.generateTexture('player-ship', 32, 32);
    graphics.destroy();
  }
}
