import { Card } from "./Card"
import styles from "./UserList.module.css"
import type { GithubUser } from "../types"
import { useSelection } from "../contexts/SelectionContext"

export const UserList = ({
  users,
  isLoading,
  hasNoResults,
}: {
  users: GithubUser[]
  isLoading: boolean
  hasNoResults: boolean
}) => {
  const { isSelected, toggleItem } = useSelection()
  const listClassName = `${styles["user-list"]} ${hasNoResults ? styles["empty-state"] : styles.grid}`

  if (hasNoResults) {
    return (
      <div className={listClassName}>
        <p>No users found.</p>
      </div>
    )
  }

  return (
    <div
      className={listClassName}
      role="listbox"
      aria-multiselectable="true"
      aria-label="Github users search results"
    >
      {users.map((user) => {
        const selected = isSelected(user.id)

        return (
          <div key={user.id} className={styles["card-wrapper"]}>
            <Card selected={selected}>
              <Card.Checkbox
                checked={selected}
                onChange={() => toggleItem(user)}
                label={`Select ${user.login}`}
              />
              <Card.Image
                src={user.avatar_url}
                alt={`${user.login} avatar`}
              />
              <Card.Label text={user.id} />
              <Card.Label text={user.login} />
              <Card.Action href={user.html_url} label="View Profile" />
            </Card>
            {isLoading && <div className={styles.shimmer} />}
          </div>
        )
      })}
    </div>
  )
}
