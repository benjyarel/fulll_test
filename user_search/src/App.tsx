import { useRef, useState, type ChangeEvent } from "react"
import "./App.css"

import { useGetSearchUsers } from "./hooks/useGetSearchUsers"
import { SelectionProvider } from "./contexts/SelectionContext"

import { Header } from "./components/Header"
import { Toolbox } from "./components/Toolbox"
import { UserSearch } from "./components/UserSearch"
import { UserList } from "./components/UserList"

const DEBOUNCE_DELAY = 250

function App() {
  const [queryParams, setQueryParams] = useState("")
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const { users, totalCount, isLoading } = useGetSearchUsers({
    query: queryParams,
  })

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

  return (
    <div className="app">
      <Header />
      <UserSearch onChange={handleOnUserSearchChange} />
      <SelectionProvider>
        <Toolbox totalCount={totalCount} />
        <UserList
          users={users}
          isLoading={isLoading}
          hasNoResults={hasNoResults}
        />
      </SelectionProvider>
    </div>
  )
}

export default App
