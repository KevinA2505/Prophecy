import { Weapon } from './Weapon';
import { v4 as uuid } from 'uuid';

export interface ShipStats {
  hull: number;
  shield: number;
  cargo: number;
  speed: number;
}

export interface ShipConfig {
  id?: string;
  name: string;
  class: 'shuttle' | 'freighter' | 'fighter';
  stats: ShipStats;
  weapons?: Weapon[];
}

export class Ship {
  readonly id: string;
  name: string;
  class: ShipConfig['class'];
  stats: ShipStats;
  weapons: Weapon[];

  constructor(config: ShipConfig) {
    this.id = config.id ?? uuid();
    this.name = config.name;
    this.class = config.class;
    this.stats = config.stats;
    this.weapons = config.weapons ?? [];
  }
}

export function starterShuttle(): Ship {
  return new Ship({
    name: 'Shuttle - Regalo',
    class: 'shuttle',
    stats: {
      hull: 100,
      shield: 50,
      cargo: 10,
      speed: 200,
    },
    weapons: [],
  });
}
