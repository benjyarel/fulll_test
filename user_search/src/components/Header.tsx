import style from "./Header.module.css"

export const Header = () => {
  return (
    <nav className={style.header}>
      <h1 className={style.title}>Github user search</h1>
    </nav>
  )
}
