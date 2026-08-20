import type { ReactNode } from "react"
import { describe, expect, it } from "vitest"
import { renderHook, act } from "@testing-library/react"

import { SelectionProvider, useSelection } from "./SelectionContext"
import type { DisplayedUser } from "../types"
import { mockUser } from "../test/mocks"

const userA: DisplayedUser = { ...mockUser, id: 1 }
const userB: DisplayedUser = { ...mockUser, id: 2 }

const wrapper = ({ children }: { children: ReactNode }) => (
  <SelectionProvider>{children}</SelectionProvider>
)

describe("SelectionContext", () => {
  it("toggles an individual item on and off", () => {
    const { result } = renderHook(() => useSelection(), { wrapper })

    act(() => result.current.toggleItem(userA))
    expect(result.current.isSelected(userA.id)).toBe(true)
    expect(result.current.selectedItems.size).toBe(1)

    act(() => result.current.toggleItem(userA))
    expect(result.current.isSelected(userA.id)).toBe(false)
  })

  it("select all overrides the current manual selection", () => {
    const { result } = renderHook(() => useSelection(), { wrapper })

    act(() => result.current.toggleItem(userA))
    act(() => result.current.toggleSelectAll())

    expect(result.current.isSelectAllMode).toBe(true)
    expect(result.current.isSelected(userB.id)).toBe(true)
    // Count is provided by the API, not the context
    expect(result.current.selectedItems.size).toBe(0)
  })
})
