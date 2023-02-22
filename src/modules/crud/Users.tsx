import React, { useEffect } from "react"
import { format, fromUnixTime } from "date-fns"
import { useSelector } from "react-redux"
import { emptyUser, fetchUsers } from "./slices/userSlice"
import store, { StateT } from "./store"

const UserLine = ({userId}: {userId: number}) => {
  const {first_name, last_name, email, gender, last_login} =
    useSelector((state: StateT) => state.users.find((user) => user.id === userId)) || emptyUser
  return <tr>
    <td>{first_name}</td>
    <td>{last_name}</td>
    <td>{email}</td>
    <td>{gender}</td>
    <td>{format(fromUnixTime(last_login), "MM/dd/yyyy")}</td>
  </tr>
}

const Users = () => {
  useEffect(() => {
    store.dispatch(fetchUsers())
  }, [])
  const userIds = useSelector((state: StateT) => state.users.map((user) => user.id))

  return <div className="overflow-x-auto p-4">
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>E-mail</th>
          <th>Gender</th>
          <th>Last login</th>
        </tr>
      </thead>
      <tbody>
        {userIds.map((userId: number) => <UserLine key={userId} userId={userId} />)}
      </tbody>
    </table>
  </div>
}

export default Users