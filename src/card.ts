import { create } from "zustand";
import type { SetActions } from "./types/zustand";
import type { Card } from "./types/states";
import { v4 } from 'uuid';

const initialState: Card = {
  effect: () => { },
  id: v4(),
  value: 0
}

const cardActions = (set: SetActions<CardStore>) => ({
  setEffect: (effect: Function) => set({ effect }),
  setValue: (value: number) => set({ value }),
})

export type CardStore = Card & {
  initialState: Card
  cardActions: ReturnType<typeof cardActions>
}

export const useCardStore = create<CardStore>()((set: SetActions<CardStore>, get: () => CardStore) => {
  return {
    ...initialState,
    initialState,
    cardActions: cardActions(set)
  }
})
