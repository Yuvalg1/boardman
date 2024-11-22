import { renderHook } from "@testing-library/react";
import { act } from 'react';
import { usePlayerStore } from "../../src/player";

describe("player name unit tests", () => {
  it("set player name", () => {
    const { result } = renderHook(() => usePlayerStore());
    const num = Math.floor(Math.random() * 1000)
    const name = `user_${num}`

    act(() => result.current.playerActions.setName(name))
    expect(result.current.name).toEqual(name)
  });
})
