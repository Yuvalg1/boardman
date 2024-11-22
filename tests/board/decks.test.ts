import { renderHook } from "@testing-library/react";
import { act } from 'react';
import { createRandomDeck } from "../utils/create";
import { useBoardStore } from "../../src/board";

describe("board decks unit tests", () => {
  it("add deck", () => {
    const { result } = renderHook(() => useBoardStore());
    const deck1 = createRandomDeck();
    const deck2 = createRandomDeck();

    act(() => result.current.boardActions.addDecks(deck1));
    expect(result.current.decks).toEqual([deck1]);
    act(() => result.current.boardActions.addDecks([deck2]));
    expect(result.current.decks).toEqual([deck1, deck2]);
  });

  it("add deck fail", () => {
    const { result } = renderHook(() => useBoardStore());
    const deck1 = createRandomDeck();
    const deck2 = createRandomDeck();

    act(() => result.current.boardActions.addDecks([deck1]))
    act(() => result.current.boardActions.addDecks([deck2, deck1]));
    expect(result.current.decks).not.toEqual([deck2, deck1, deck1]);
  });


  it("remove deck", () => {
    const { result } = renderHook(() => useBoardStore());
    const deck1 = createRandomDeck();
    const deck2 = createRandomDeck();

    act(() => result.current.boardActions.addDecks([deck1, deck2]));
    act(result.current.boardActions.removeDeck);
    expect(result.current.decks.length).toEqual(1);
  });

  it("remove deck advanced", () => {
    const { result } = renderHook(() => useBoardStore());
    const deck1 = createRandomDeck();
    const deck2 = createRandomDeck();

    act(() => result.current.boardActions.addDecks([deck1, deck2, deck1]))

    act(result.current.boardActions.removeDeck);
    expect(result.current.decks).toEqual([deck2, deck1]);

    act(() => result.current.boardActions.removeDeck(1));
    expect(result.current.decks.length).toEqual(1);

    expect(result.current.boardActions.removeDeck()).toEqual(deck2);
  })
});
