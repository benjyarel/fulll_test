import { useEffect, useRef, useState, type ChangeEvent } from "react"
import "./App.css"

import { useGetSearchUsers } from "./hooks/useGetSearchUsers"
import { useSelection } from "./contexts/SelectionContext"
import type { DisplayedUser } from "./types"

import { Header } from "./components/Header"
import { Toolbox } from "./components/Toolbox"
import { UserSearch } from "./components/UserSearch"
import { UserList } from "./components/UserList"

const DEBOUNCE_DELAY = 250

// Frontend-only duplication: no backend to persist it, so we just prepend a
// copy with a fresh id (the same user can be duplicated more than once, so
// it can't reuse the original's) and a "(1)" suffix on what's displayed.
const duplicateUser = (user: DisplayedUser, id: number): DisplayedUser => ({
  ...user,
  id,
  displayId: `${user.displayId ?? user.id}(1)`,
  login: `${user.login}(1)`,
})

function App() {
  const [queryParams, setQueryParams] = useState("")
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const { users, totalCount, isLoading } = useGetSearchUsers({
    query: queryParams,
  })
  const { selectedItems, isSelectAllMode, clearSelection } = useSelection()

  const [displayedUsers, setDisplayedUsers] = useState<DisplayedUser[]>([])

  // Resynchronize with the latest search results, discarding any fake
  // duplicate/delete done on the previous ones.
  useEffect(() => {
    setDisplayedUsers(users)
  }, [users])

  const hasNoResults = !!queryParams && !isLoading && users.length === 0

  const handleOnUserSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Cancel the previous pending update so only the last keystroke
    // within the delay window actually triggers a search.
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(
      () => setQueryParams(value),
      DEBOUNCE_DELAY,
    )
  }

  const getSelectedUsers = () =>
    isSelectAllMode
      ? displayedUsers
      : displayedUsers.filter((user) => selectedItems.has(user.id))

  const handleDelete = () => {
    const selectedIds = new Set(getSelectedUsers().map((user) => user.id))
    setDisplayedUsers((previous) =>
      previous.filter((user) => !selectedIds.has(user.id)),
    )
    clearSelection()
  }

  const handleDuplicate = () => {
    const timestamp = Date.now()
    const duplicatedUsers = getSelectedUsers().map((user, index) =>
      duplicateUser(user, timestamp + index),
    )
    setDisplayedUsers((previous) => [...duplicatedUsers, ...previous])
    clearSelection()
  }

  return (
    <div className="app">
      <Header />
      <UserSearch onChange={handleOnUserSearchChange} />
      <Toolbox
        totalCount={totalCount}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />
      <UserList
        users={displayedUsers}
        isLoading={isLoading}
        hasNoResults={hasNoResults}
      />
    </div>
  )
}

export default App
