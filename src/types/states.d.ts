export interface CardState {
  effect: Function;
  id: string;
  value: number;
}

export interface PlayerState {
  name: string;
  cards: CardState[];
}
