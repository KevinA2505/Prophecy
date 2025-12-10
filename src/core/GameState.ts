import { PlayerProfile } from '../game/entities/Player';
import { Universe } from '../game/Universe';

export interface GameState {
  player?: PlayerProfile;
  universe?: Universe;
}

export const gameState: GameState = {};
