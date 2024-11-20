import { renderHook } from "@testing-library/react";
import { act } from 'react';
import { usePlayerStore } from "../../../src/player";

describe("player victory points unit tests", () => {
  it('set victory points', () => {
    const { result } = renderHook(() => usePlayerStore());

    const victoryPoints = Math.floor(Math.random() * 1000);

    act(() => result.current.playerActions.setVictoryPoints(victoryPoints));
    expect(result.current.victoryPoints).toEqual(victoryPoints);
  });

  it('increment victory points', () => {
    const { result } = renderHook(() => usePlayerStore());

    const startingPoints = Math.floor(Math.random() * 1000);
    const victoryPoints = Math.floor(Math.random() * 1000);

    act(() => result.current.playerActions.setVictoryPoints(startingPoints));
    act(() => result.current.playerActions.incrementVictoryPoints(victoryPoints));
    expect(result.current.victoryPoints).toEqual(startingPoints + victoryPoints);

    act(() => result.current.playerActions.incrementVictoryPoints());
    expect(result.current.victoryPoints).toEqual(startingPoints + victoryPoints + 1);
  })
})


