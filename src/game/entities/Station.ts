export interface Station {
  id: string;
  name: string;
  factionOwner: string;
  services: ('mercado' | 'hangar' | 'misiones')[];
}
