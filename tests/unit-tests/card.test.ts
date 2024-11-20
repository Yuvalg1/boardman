import { renderHook } from "@testing-library/react";
import { useCardStore } from "../../src/card";
import { act } from 'react';

describe("cards unit tests", () => {
  it("value's initial value is 0", () => {
    const { result } = renderHook(() => useCardStore());

    expect(result.current.value).toEqual(0);
  });

  it("changing value works", () => {
    const { result } = renderHook(() => useCardStore());

    const num = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100)
    expect(result.current.value).toEqual(0);

    act(() => result.current.cardActions.setValue(num));
    expect(result.current.value).toEqual(num);
    act(() => result.current.cardActions.setValue(num2));
    expect(result.current.value).toEqual(num2);
  });

  it("activating effect works", () => {
    const { result } = renderHook(() => useCardStore());
    const num = Math.floor(Math.random() * 10);

    act(() => result.current.cardActions.setEffect(() => num))
    expect(result.current.effect()).toEqual(num);
  });
});
