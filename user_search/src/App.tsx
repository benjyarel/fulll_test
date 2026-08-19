import { useState, type ChangeEvent } from "react"
import "./App.css"

import { useGetSearchUsers } from "./hooks/useGetSearchUsers"

import { Header } from "./components/Header"
import { Toolbox } from "./components/Toolbox"
import { UserSearch } from "./components/UserSearch"
import { UserList } from "./components/UserList"

function App() {
  // const [queryParams, setQueryParams] = useState("")

  // const { users, totalCount } = useGetSearchUsers({ query: queryParams })

  // const handleOnUserSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setQueryParams(e.target.value)
  // }

  return (
    <>
      <Header />
      <UserSearch />
      <Toolbox />
      <UserList />
    </>
  )

  // return (
  //   <>
  //     <h1>Hello World</h1>
  //     <form>
  //       <label htmlFor="user-search">Search</label>
  //       <input
  //         id="user-search"
  //         type="text"
  //         placeholder="search..."
  //         onChange={handleOnUserSearchChange}
  //       />
  //     </form>
  //     <p>number of result : {totalCount}</p>
  //     <p>list of users:</p>
  //     <ul>
  //       {users.map((user) => {
  //         return <li>{user.id}</li>
  //       })}
  //     </ul>
  //   </>
  // )
}

export default App
