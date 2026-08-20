import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import type { GithubUser } from "../types"

interface SelectionContextValue {
  selectedItems: Map<number, GithubUser>
  isSelectAllMode: boolean
  isSelected: (itemId: number) => boolean
  toggleItem: (item: GithubUser) => void
  toggleSelectAll: () => void
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<Map<number, GithubUser>>(new Map())
  const [isSelectAllMode, setIsSelectAllMode] = useState(false)

  const toggleItem = useCallback((item: GithubUser) => {
    // A manual toggle always leaves "select all" mode and starts a fresh
    // selection: it never falls back to whatever was selected before.
    setIsSelectAllMode(false)
    setSelectedItems((previous) => {
      const next = new Map(previous)
      if (next.has(item.id)) {
        next.delete(item.id)
      } else {
        next.set(item.id, item)
      }
      return next
    })
  }, [])

  const toggleSelectAll = useCallback(() => {
    setIsSelectAllMode((previous) => !previous)
    setSelectedItems(new Map())
  }, [])

  const isSelected = useCallback(
    (itemId: number) => isSelectAllMode || selectedItems.has(itemId),
    [isSelectAllMode, selectedItems],
  )

  const value = useMemo<SelectionContextValue>(
    () => ({ selectedItems, isSelectAllMode, isSelected, toggleItem, toggleSelectAll }),
    [selectedItems, isSelectAllMode, isSelected, toggleItem, toggleSelectAll],
  )

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  )
}

export const useSelection = () => {
  const context = useContext(SelectionContext)

  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider")
  }

  return context
}
