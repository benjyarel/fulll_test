import { useState, type ChangeEvent } from "react"
import "./App.css"

import { useGetSearchUsers } from "./hooks/useGetSearchUsers"

import { Header } from "./components/Header"
import { Toolbox } from "./components/Toolbox"
import { UserSearch } from "./components/UserSearch"
import { UserList } from "./components/UserList"

function App() {
  const [queryParams, setQueryParams] = useState("")

  const { users, totalCount, isLoading } = useGetSearchUsers({
    query: queryParams,
  })

  const handleOnUserSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryParams(e.target.value)
  }

  return (
    <div className="app">
      <Header />
      <UserSearch onChange={handleOnUserSearchChange} />
      <Toolbox selectedNumber={0} />
      <UserList users={users} isLoading={isLoading} />
    </div>
  )
}

export default App
