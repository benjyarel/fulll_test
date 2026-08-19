import { Card } from "./Card"
import { mockUsers } from "../test/mocks.ts"
export const UserList = () => {
  const user = mockUsers[0]
  return (
    <div>
      <Card>
        <Card.Image src={user.avatar_url} alt={`${user.login} avatar`} />
        <Card.Label text={user.id} />
        <Card.Label text={"super long name yough"} />
        <Card.Action href={user.url} label="View Profile" />
      </Card>
    </div>
  )
}
