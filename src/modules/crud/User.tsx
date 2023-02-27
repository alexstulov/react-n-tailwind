import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./hooks"
import { deleteUser, selectUser } from "./slices/userSlice"

const User = () => {
  const {userId} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const id = parseInt(userId || "")
  const user = useAppSelector((state) => selectUser(state, id))

  if (!user) {
    return <h2 className='heading-2 text-error'>User not found</h2>
  }

  const handleDeleteUser = () => {
    dispatch(deleteUser(id)).then(() => navigate("/crud/users"))
  }

  return <div className='card bg-primary text-primary-content m-4 lg:w-1/4'>
    <div className="card-body">
      <div className="card-title">{`${user.first_name} ${user.last_name}`}</div>
      <ul className="text-left">
        <li>Gender: {user.gender}</li>
        <li>E-mail: {user.email}</li>
        <li>Last login: {user.last_login}</li>
      </ul>
      <div className="card-actions justify-end">
        <Link className="btn btn-secondary" to={`/crud/users/update/${userId}`}>Update</Link>
        <label htmlFor="deleteDialog" className="btn btn-error">Delete</label>
        <Link className="btn btn-accent" to="/crud/users">Back</Link>
      </div>
    </div>
    <input type="checkbox" id="deleteDialog" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure?</h3>
        <p className="py-4">You are about to delete user {user.last_name} {user.first_name}</p>
        <div className="modal-action">
          <label htmlFor="deleteDialog"><button className="btn" onClick={handleDeleteUser}>Delete!</button></label>
          <label htmlFor="deleteDialog" className="btn btn-accent">Back</label>
        </div>
      </div>
    </div>
  </div>
}

export default User