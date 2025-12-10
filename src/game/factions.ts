export type FactionId = 'aetherion' | 'solari' | 'voidborn' | 'nomads';

export interface Faction {
  id: FactionId;
  name: string;
  description: string;
  color: number;
  homeworld: string;
}

export const factions: Record<FactionId, Faction> = {
  aetherion: {
    id: 'aetherion',
    name: 'Aetherion Collective',
    description: 'Tecno-sociedad enfocada en ciencia y diplomacia.',
    color: 0x7ad7f0,
    homeworld: 'Aetheris',
  },
  solari: {
    id: 'solari',
    name: 'Solari Dominion',
    description: 'Imperio expansionista que domina rutas comerciales.',
    color: 0xffe066,
    homeworld: 'Sol Prime',
  },
  voidborn: {
    id: 'voidborn',
    name: 'Voidborn Syndicate',
    description: 'Red de piratas y contrabandistas expertos en sigilo.',
    color: 0xb57bff,
    homeworld: 'Null Station',
  },
  nomads: {
    id: 'nomads',
    name: 'Nomads of Orion',
    description: 'Clanes viajeros que viven entre estrellas y asteroides.',
    color: 0x8bd48b,
    homeworld: 'Orion Drift',
  },
};

export function getFaction(id: FactionId): Faction {
  return factions[id];
}
