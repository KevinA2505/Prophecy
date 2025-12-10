import { FactionId, getFaction } from '../factions';
import { Ship } from './Ship';

export type Species = 'humano' | 'robot' | 'alien';

export interface PlayerProfile {
  name: string;
  gender: 'masculino' | 'femenino' | 'no-binario';
  species: Species;
  factionId: FactionId;
  currentPlanet: string;
  ship?: Ship;
}

export function createDefaultPlayer(
  name: string,
  gender: PlayerProfile['gender'],
  species: Species,
  factionId: FactionId,
): PlayerProfile {
  const faction = getFaction(factionId);
  return {
    name,
    gender,
    species,
    factionId,
    currentPlanet: faction.homeworld,
  };
}
