export interface Weapon {
  name: string;
  damage: number;
  fireRate: number;
  projectileSpeed: number;
}

export const basicCannon: Weapon = {
  name: 'Cañón Ligero',
  damage: 8,
  fireRate: 1,
  projectileSpeed: 350,
};
