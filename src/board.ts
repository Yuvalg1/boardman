import { create } from "zustand";
import type { SetActions } from "./types/zustand";
import type { Board, Deck, Player } from "./types/states";
import { usePlayerStore } from "./player";

const initialState: Board = {
  players: [],
  decks: [],
  currentPlayerIndex: 0,
  winCondition: () => false,
  isGameOver: () => false
}

const boardActions = (set: SetActions<BoardStore>, get: () => BoardStore, setPlayer: (player: Player) => void) => ({
  setBoard: (board: Board) => set(board),

  addPlayers: (players: Player | Player[]) => set({ players: get().players.concat(players) }),

  removePlayers: (players: Player[]) => set({ players: get().players.filter(player => !players.includes(player)) }),

  addDecks: (deck: Deck | Deck[]) => set({ decks: get().decks.concat(deck) }),

  removeDeck: (index = 0) => {
    const decks = get().decks
    const removedDeck = decks[index]
    decks.splice(index, 1);

    set({ decks })

    return removedDeck;
  },

  setDeck: (deck: Deck, index = 0) => {
    const decks = get().decks
    if (!decks[index]) return;

    decks[index] = deck
    set({ decks })
  },

  isGameOver: () => {
    const board = get();
    return board.winCondition(board.players[board.currentPlayerIndex]) || board.isGameOver(board);
  },

  startTurn: () => {
    const board = get();

    const isGameOver = board.boardActions.isGameOver();
    if (isGameOver) return;

    setPlayer(board.players[board.currentPlayerIndex]);
    board.beforeTurn();
  },

  endTurn: () => {
    const board = get();

    board.players[board.currentPlayerIndex] = usePlayerStore.getState();
    board.afterTurn();

    const offset = Number(!board.counterClockwise) * 2 - 1;

    set({ currentPlayerIndex: (board.currentPlayerIndex + offset) % board.players.length });
  }
})

export type BoardStore = Board & {
  initialState: Board;
  boardActions: ReturnType<typeof boardActions>
}

export const useBoardStore = create<BoardStore>()((set: SetActions<BoardStore>, get: () => BoardStore) => {
  const setPlayer = usePlayerStore.getState().playerActions.setPlayer;

  return {
    ...initialState,
    initialState,
    boardActions: boardActions(set, get, setPlayer)
  }
})
