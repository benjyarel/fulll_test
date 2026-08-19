import { Card } from "./Card"
import styles from "./UserList.module.css"
import { mockUsers } from "../test/mocks.ts"
import type { GithubUser } from "../types"

export const UserList = ({ users }: { users: GithubUser[] }) => {
  return (
    <div className={styles["user-list"]}>
      {users.map((user) => {
        return (
          <Card>
            <Card.Image src={user.avatar_url} alt={`${user.login} avatar`} />
            <Card.Label text={user.id} />
            <Card.Label text={user.login} />
            <Card.Action href={user.html_url} label="View Profile" />
          </Card>
        )
      })}
    </div>
  )
}
