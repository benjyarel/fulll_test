import type { ChangeEventHandler, FormEvent } from "react"
import style from "./UserSearch.module.css"

interface UserSearchProps {
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const UserSearch = ({ onChange }: UserSearchProps) => {
  // avoid refresh page when pressing "Enter"
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault()

  return (
    <form
      className={style["search-form"]}
      role="search"
      onSubmit={handleOnSubmit}
    >
      <input
        className={style["search-input"]}
        id="user-search"
        name="user search"
        type="search"
        placeholder="Search a user..."
        aria-label="User search"
        onChange={onChange}
      />
    </form>
  )
}
