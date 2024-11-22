import { renderHook } from "@testing-library/react";
import { act } from 'react';
import { usePlayerStore } from "../../src/player";
import { createRandomCard, createRandomCards } from "../utils/create";

describe("player cards unit tests", () => {
  it("add card", () => {
    const { result } = renderHook(() => usePlayerStore());
    const card1 = createRandomCard();
    const card2 = createRandomCard();

    act(() => result.current.playerActions.addCards(card1));
    expect(result.current.cards).toEqual([card1]);
    act(() => result.current.playerActions.addCards([card2]));
    expect(result.current.cards).toEqual([card1, card2]);
  });

  it("add card fail", () => {
    const { result } = renderHook(() => usePlayerStore());
    const card1 = createRandomCard();
    const card2 = createRandomCard();

    act(() => result.current.playerActions.addCards([card1]))
    act(() => result.current.playerActions.addCards([card2, card1]));
    expect(result.current.cards).not.toEqual([card2, card1, card1]);
  });


  it("remove card", () => {
    const { result } = renderHook(() => usePlayerStore());
    const card1 = createRandomCard();
    const card2 = createRandomCard();

    act(() => result.current.playerActions.addCards([card1, card2]));
    act(result.current.playerActions.removeCard);
    expect(result.current.cards.length).toEqual(1);
  });

  it("remove card advanced", () => {
    const { result } = renderHook(() => usePlayerStore());
    const card1 = createRandomCard();
    const card2 = createRandomCard();

    act(() => result.current.playerActions.addCards([card1, card2, card1]))

    act(() => result.current.playerActions.removeCard(0));
    expect(result.current.cards).toEqual([card2, card1]);

    act(() => result.current.playerActions.removeCard(1));
    expect(result.current.cards.length).toEqual(1);

    expect(result.current.playerActions.removeCard()).toEqual(card2);
  })

  it("play card", () => {
    const { result } = renderHook(() => usePlayerStore());
    const card1 = createRandomCard();

    act(() => result.current.playerActions.addCards([card1]))
    expect(result.current.playerActions.playCard()).toEqual(card1.effect())
  })

  it("shuffle", () => {
    const { result } = renderHook(() => usePlayerStore());

    const cardArr = createRandomCards(Math.floor(Math.random() * 20));

    act(() => result.current.playerActions.addCards(cardArr));
    act(() => result.current.playerActions.shuffle());
    expect(() => result.current.cards).not.toEqual(cardArr)
  })
});
