export interface Card {
  effect: Function;
  id: string;
  value: number;
}

export interface Player {
  name: string;
  cards: Card[];
  coins?: number;
  victoryPoints?: number;
}
