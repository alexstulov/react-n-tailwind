import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { StateT } from "../store"
import { HandleUserUpdateArgsT } from "../UserUpdate"

type UserFormPropsT = {
    submitHandler: (args: HandleUserUpdateArgsT) => void, 
    userId?: number
}

const UserForm = ({submitHandler, userId}: UserFormPropsT) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("male")
  const [email, setEmail] = useState("")
  const user = useSelector((state: StateT) => state.users.data.find(user => user.id === userId))
  const isSucceded = useSelector((state: StateT) => state.users.status)


  useEffect(() => {
    if (isSucceded && user) {
      setFirstName(user.first_name)
      setLastName(user.last_name)
      setGender(user.gender)
      setEmail(user.email)
    }
  }, [user])


  return <div className="p-2 lg:p-4 lg:w-1/2">
    <form>
      <div className="form-control">
        <label className="label" htmlFor='firstName'>First Name</label>
        <input className="input input-bordered input-info" type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="first name" />
      </div>
      <div className="form-control">
        <label className="label" htmlFor='lastName'>Last Name</label>
        <input className="input input-bordered input-info" type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="last name" />
      </div>
      <div className="form-control">
        <label className="label" htmlFor='gender'>Gender</label>
        <select className="select select-bordered select-info" name="gender" value={gender} onChange={e => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderfluid">Genderfluid</option>
          <option value="Bigender">Bigender</option>
          <option value="Agender">Agender</option>
          <option value="Genderqueer">Genderqueer</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Polygender">Polygender</option>
        </select>
      </div>
      <div className="form-control">
        <label className="label" htmlFor='email'>E-mail</label>
        <input className="input input-bordered input-info" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      </div>
      {user && <div className="form-control">
        <label className="label" htmlFor='last_login'>Last login</label>
        <input className="input input-bordered input-info input-disabled" type="text" name="last_login" value={user.last_login} readOnly placeholder="last login" />
      </div>}
      <div className="flex flex-row justify-end mt-2">
        <button type="button" className="btn btn-secondary mr-2" onClick={() => submitHandler({firstName, lastName, gender, email})}>Save</button>
        <Link className="btn btn-accent" to={`/crud/users/${userId}`}>Back</Link>
      </div>
    </form>
  </div>
}

export default UserForm