import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { selectUser, updateUser } from "./slices/userSlice"
import UserForm from "./components/UserForm"
import { useAppDispatch, useAppSelector } from "./hooks"

export type HandleUserUpdateArgsT = {
    firstName: string, 
    lastName: string, 
    gender: string, 
    email: string
}

const UserUpdate = () => {
  const {userId} = useParams()
  const id = parseInt(userId || "")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector((state) => selectUser(state, id))

  if (!user) {
    return <h2 className='heading-2 text-error'>User not found</h2>
  }
  
  const handleUserUpdate = ({firstName, lastName, gender, email}: HandleUserUpdateArgsT) => {
    dispatch(updateUser({
      id: parseInt(userId || ""),
      first_name: firstName,
      last_name: lastName,
      gender,
      email
    }))
    navigate(`/crud/users/${userId}`)
  }

  return <UserForm submitHandler={handleUserUpdate} userId={id}/>
}

export default UserUpdate