import { useEffect, useState } from "react"

import { useSelection } from "../contexts/SelectionContext"
import type { DisplayedUser } from "../types"

export const useDisplayedUsers = (users: DisplayedUser[]) => {
  const { selectedItems, isSelectAllMode, clearSelection } = useSelection()
  const [displayedUsers, setDisplayedUsers] = useState<DisplayedUser[]>([])

  // Resynchronize with the latest search results
  useEffect(() => {
    setDisplayedUsers(users)
  }, [users])

  // Frontend-only duplication: no backend to persist it
  const duplicateUser = (user: DisplayedUser, id: number): DisplayedUser => ({
    ...user,
    id,
    displayId: `${user.displayId ?? user.id}(1)`,
    login: `${user.login}(1)`,
  })

  const getSelectedUsers = () =>
    isSelectAllMode
      ? displayedUsers
      : displayedUsers.filter((user) => selectedItems.has(user.id))

  const deleteSelected = () => {
    const selectedIds = new Set(getSelectedUsers().map((user) => user.id))
    setDisplayedUsers((previous) =>
      previous.filter((user) => !selectedIds.has(user.id)),
    )
    clearSelection()
  }

  const duplicateSelected = () => {
    const timestamp = Date.now()
    const duplicatedUsers = getSelectedUsers().map((user, index) =>
      duplicateUser(user, timestamp + index),
    )
    setDisplayedUsers((previous) => [...duplicatedUsers, ...previous])
    clearSelection()
  }

  return { displayedUsers, deleteSelected, duplicateSelected }
}
