import { Planet } from './Planet';

export interface StarSystem {
  id: string;
  name: string;
  starType: 'amarilla' | 'roja' | 'azul';
  planets: Planet[];
  hasAsteroidField: boolean;
}
