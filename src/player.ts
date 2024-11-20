import { create } from "zustand";
import type { SetActions } from "./types/zustand";
import type { CardState, PlayerState } from "./types/states";

const initialState: PlayerState = {
  name: "",
  cards: []
}

const playerActions = (set: SetActions<PlayerStore>, get: () => PlayerStore) => ({
  setName: (name: string) => set({ name }),
  addCard: (card: CardState) => set({ cards: get().cards.concat(card) }),
  removeCard: (index: number) => { set({ cards: get().cards.splice(index, 1) }) }
})

export type PlayerStore = PlayerState & {
  initialState: PlayerState
  playerActions: ReturnType<typeof playerActions>
}

export const useCardStore = create<PlayerStore>()((set: SetActions<PlayerStore>, get: () => PlayerStore) => {
  return {
    ...initialState,
    initialState,
    playerActions: playerActions(set, get)
  }
})
