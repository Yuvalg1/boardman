import { create } from "zustand";
import type { SetActions } from "./types";
import type { CardState } from "./types/card";

const initialState: CardState = {
  effect: () => { }
}

const cardActions = (set: SetActions<CardStore>, get: () => CardStore) => {

}

export type CardStore = CardState & {
  initialState: CardState
  cardActions: ReturnType<typeof cardActions>
}

export const useCardStore = create<CardStore>()((set: SetActions<CardStore>, get: () => CardStore) => {
  return {
    ...initialState,
    initialState,
    cardActions: cardActions(set, get)
  }
})
