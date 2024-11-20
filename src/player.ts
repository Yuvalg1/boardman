import { create } from "zustand";
import type { SetActions } from "./types/zustand";
import type { Card, Player } from "./types/states";
import { shuffle } from "./utils";

const initialState: Player = {
  name: "",
  cards: [],
}

const playerActions = (set: SetActions<PlayerStore>, get: () => PlayerStore) => ({
  setName: (name: string) => set({ name }),

  addCards: (cards: Card[]) => set({ cards: get().cards.concat(cards) }),

  setVictoryPoints: (victoryPoints: number) => set({ victoryPoints }),

  incrementVictoryPoints: (number = 1) => set({ victoryPoints: get().victoryPoints + number }),

  setCoins: (coins: number) => set({ coins }),

  shuffle: () => {
    const cards = get().cards;
    shuffle(cards);
    set({ cards })
  },

  removeCard: (index = Math.floor(Math.random() * get().cards.length), withShuffle = false) => {
    const cards = get().cards;
    const removedCard = cards[index];
    if (withShuffle) shuffle(cards)

    cards.splice(index, 1);
    set({ cards });
    return removedCard
  },

  removeAllCards: () => set({ cards: [] }),

  playCard: (index = Math.floor(Math.random() * get().cards.length), withRemove = false) => {
    const result = get().cards[index].effect();
    if (withRemove) get().playerActions.removeCard(index)
    return result
  }
})

export type PlayerStore = Player & {
  initialState: Player
  playerActions: ReturnType<typeof playerActions>
}

export const usePlayerStore = create<PlayerStore>()((set: SetActions<PlayerStore>, get: () => PlayerStore) => {
  return {
    ...initialState,
    initialState,
    playerActions: playerActions(set, get)
  }
})
