export interface Card {
  effect: Function;
  id: string;
  name: string;
  value: number;
}

export interface Player {
  id: string;
  name: string;
  cards: Card[];
  coins?: number;
  victoryPoints?: number;
}

export interface Deck {
  name: string;
  description?: string;
  cards: Card[];
}

export interface Board {
  players: Player[];
  decks?: Deck[];
}
