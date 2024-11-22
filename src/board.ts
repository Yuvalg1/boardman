import { create } from "zustand";
import type { SetActions } from "./types/zustand";
import type { Board, Deck, Player } from "./types/states";

const initialState: Board = {
  players: []
}

const boardActions = (set: SetActions<BoardStore>, get: () => BoardStore) => ({
  addPlayers: (players: Player | Player[]) => set({ players: get().players.concat(players) }),

  removePlayers: (players: Player[]) => set({ players: get().players.filter(player => !players.includes(player)) }),

  addDecks: (deck: Deck | Deck[]) => set({ decks: get().decks.concat(deck) }),

  removeDecks: (index = 0) => {
    const decks = get().decks
    decks.splice(index, 1);

    set({ decks })
  },

  setDeck: (deck: Deck, index = 0) => {
    const decks = get().decks
    if (decks && decks[index]) {
      decks[index] = deck
    }

    set({ decks })
  }
})

export type BoardStore = Board & {
  initialState: Board;
  cardActions: ReturnType<typeof boardActions>
}

export const useCardStore = create<BoardStore>()((set: SetActions<BoardStore>, get: () => BoardStore) => {
  return {
    ...initialState,
    initialState,
    cardActions: boardActions(set, get)
  }
})
