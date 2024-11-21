import { renderHook } from "@testing-library/react";
import { useCardStore } from "../../src/card";
import { act } from 'react';

describe("useCardStore", () => {
  it("value's initial value is 0", () => {
    const { result } = renderHook(() => useCardStore());

    expect(result.current.value).toEqual(0);
  });

  it("every time increment is called, value increases by one", () => {
    const { result } = renderHook(() => useCardStore());

    expect(result.current.value).toEqual(0);

    act(() => result.current.cardActions.setValue(1));
    expect(result.current.value).toEqual(1);
    act(() => result.current.cardActions.setValue(2));
    expect(result.current.value).toEqual(2);
  });
});
