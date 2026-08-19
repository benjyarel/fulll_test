import { Card } from "./Card"
import styles from "./UserList.module.css"
import type { GithubUser } from "../types"

export const UserList = ({
  users,
  isLoading,
  hasNoResults,
}: {
  users: GithubUser[]
  isLoading: boolean
  hasNoResults: boolean
}) => {
  const listClassName = `${styles["user-list"]} ${hasNoResults ? styles["empty-state"] : styles.grid}`

  if (hasNoResults) {
    return (
      <div className={listClassName}>
        <p>No users found.</p>
      </div>
    )
  }

  return (
    <div className={listClassName}>
      {users.map((user) => {
        return (
          <div key={user.id} className={styles["card-wrapper"]}>
            <Card>
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
