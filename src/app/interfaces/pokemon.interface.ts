export interface Pokemon {
  id: number;
  name: string;
  abilities: string[];
  height: number;
  types: string[];
  weight: number;
  artWork: string;
  shiny: string;
  isLegendary: boolean;

  HP:number;
  Speed:number;
  Attack:number;
  SpecialAttack:number;
  Defense:number;
  SpecialDefense:number;
}
