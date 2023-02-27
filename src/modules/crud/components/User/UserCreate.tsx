import React from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../../slices/userSlice"
import UserForm from "./UserForm"
import { useAppDispatch } from "../../hooks"

export type HandleUserCreateArgsT = {
    firstName: string, 
    lastName: string, 
    gender: string, 
    email: string
}

const UserCreate = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleUserCreate = ({firstName, lastName, gender, email}: HandleUserCreateArgsT) => {
    const promise = dispatch(createUser({
      first_name: firstName,
      last_name: lastName,
      gender,
      email
    }))
    promise.then(data => {
      navigate(`/crud/users/${data.payload.id}`)
    })
  }

  return <UserForm submitHandler={handleUserCreate} />
}

export default UserCreate