import { v4 as uuid } from 'uuid';
import { factions } from './factions';
import { Planet, PlanetType } from './entities/Planet';
import { StarSystem } from './entities/StarSystem';

const planetTypes: PlanetType[] = ['habitable', 'arido', 'gaseoso', 'helado', 'asteroid_belt'];

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function createPlanet(name: string, ownerFaction?: string): Planet {
  const type = randomFrom(planetTypes);
  const colonized = ownerFaction !== undefined || type === 'habitable';
  return {
    id: uuid(),
    name,
    type,
    colonized,
    population: colonized ? Math.floor(Math.random() * 10_000_000) + 50_000 : 0,
    ownerFaction,
  };
}

function createSystem(name: string, planetNames: string[], ownerFaction?: string): StarSystem {
  const planets = planetNames.map((planetName) => createPlanet(planetName, ownerFaction));
  return {
    id: uuid(),
    name,
    starType: randomFrom(['amarilla', 'roja', 'azul']),
    planets,
    hasAsteroidField: Math.random() > 0.5,
  };
}

export function generateUniverse(seed?: string): StarSystem[] {
  if (seed) {
    // simple deterministic seed imitation
    let acc = 0;
    for (const char of seed) acc += char.charCodeAt(0);
    Math.random = ((): (() => number) => {
      let value = acc;
      return () => {
        value ^= value << 13;
        value ^= value >> 17;
        value ^= value << 5;
        return Math.abs(value % 1000) / 1000;
      };
    })();
  }

  const systems: StarSystem[] = [];
  Object.values(factions).forEach((faction) => {
    systems.push(createSystem(`${faction.name} System`, [faction.homeworld, `${faction.homeworld} Luna`], faction.id));
  });

  for (let i = 0; i < 3; i += 1) {
    systems.push(createSystem(`Procedural-${i + 1}`, [`PX-${i}A`, `PX-${i}B`]));
  }

  return systems;
}
