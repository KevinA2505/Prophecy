import Phaser from 'phaser';

export interface InfoLine {
  label: string;
  value: string;
}

export class InfoPanel {
  private container: Phaser.GameObjects.Container;
  private yOffset = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, width = 260) {
    const bg = scene.add.rectangle(0, 0, width, 200, 0x0c1222, 0.85).setOrigin(0, 0);
    this.container = scene.add.container(x, y, [bg]);
  }

  addLine(line: InfoLine): void {
    const label = this.container.scene.add.text(12, 12 + this.yOffset, `${line.label}:`, {
      fontSize: '14px',
      color: '#b8c7f2',
    });
    const value = this.container.scene.add.text(140, 12 + this.yOffset, line.value, {
      fontSize: '14px',
      color: '#ffffff',
    });

    this.container.add([label, value]);
    this.yOffset += 22;
  }
}
