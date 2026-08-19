import style from "./UserSearch.module.css"

export const UserSearch = ({ onChange }) => {
  const handleOnUserSearchChange = () => console.log("change")
  const handleOnSubmit = (e) => e.preventDefault()

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
