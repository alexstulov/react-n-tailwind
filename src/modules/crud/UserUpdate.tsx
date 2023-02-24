import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { updateUser } from "./slices/userSlice"
import { AppDispatch, StateT } from "./store"
import UserForm from "./components/UserForm"

export type HandleUserUpdateArgsT = {
    firstName: string, 
    lastName: string, 
    gender: string, 
    email: string
}

const UserUpdate = () => {
  const {userId} = useParams()
  const id = parseInt(userId || "")
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const user = useSelector((state: StateT) => state.users.data.find(user => user.id === id))

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