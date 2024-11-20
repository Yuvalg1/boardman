import { create } from "zustand";
import type { SetActions } from "./types";
import type { CardState } from "./types/card";

const initialState: CardState = {
  effect: () => { },
  id: crypto.randomUUID(),
  value: 0
}

const cardActions = (set: SetActions<CardStore>) => ({
  setEffect: (effect: Function) => set({ effect }),
  setValue: (value: number) => set({ value }),
})

export type CardStore = CardState & {
  initialState: CardState
  cardActions: ReturnType<typeof cardActions>
}

export const useCardStore = create<CardStore>()((set: SetActions<CardStore>, get: () => CardStore) => {
  return {
    ...initialState,
    initialState,
    cardActions: cardActions(set)
  }
})
