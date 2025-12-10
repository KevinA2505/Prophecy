import { factions } from './factions';
import { generateUniverse } from './universeGenerator';
import { StarSystem } from './entities/StarSystem';

export class Universe {
  systems: StarSystem[];

  constructor(seed?: string) {
    this.systems = generateUniverse(seed);
  }

  findHomeworldSystems(): StarSystem[] {
    const homeworlds = new Set(Object.values(factions).map((faction) => faction.homeworld));
    return this.systems.filter((system) => system.planets.some((planet) => homeworlds.has(planet.name)));
  }

  findSystemByPlanetName(planetName: string): StarSystem | undefined {
    return this.systems.find((system) => system.planets.some((planet) => planet.name === planetName));
  }
}
