export type PlanetType = 'habitable' | 'arido' | 'gaseoso' | 'helado' | 'asteroid_belt';

export interface Planet {
  id: string;
  name: string;
  type: PlanetType;
  population: number;
  colonized: boolean;
  ownerFaction?: string;
}
