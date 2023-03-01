import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDeletePostMutation, useGetPostQuery } from "../../slices/postSlice"
import { Spinner } from "../Spinner"
import { format } from "date-fns"

const Post = () => {
  const navigate = useNavigate()
  const {postId = "0"} = useParams()

  const {data: post, isFetching, isSuccess} = useGetPostQuery(parseInt(postId))
  const [deletePost] = useDeletePostMutation()

  const handleDeleteUser = async () => {
    await deletePost(parseInt(postId)).then(() => navigate("/crud/posts"))
  }

  let content
  if (isFetching) {
    content = <Spinner text='Loading...' />
  } else if (isSuccess) {
    content = <div className='card bg-primary text-primary-content m-4 lg:w-1/4'>
      <div className="card-body">
        <div className="card-title">{post.title}</div>
        <ul className="text-left">
          <li>User Id: {post.userId}</li>
          <li>Date: {format(new Date(post.date), "MM/dd/yyyy")}</li>
          <li>{post.content}</li>
        </ul>
        <div className="card-actions justify-end">
          <Link className="btn btn-secondary" to={`/crud/posts/update/${post.id}`}>Update</Link>
          <label htmlFor="deleteDialog" className="btn btn-error">Delete</label>
          <Link className="btn btn-accent" to="/crud/posts">Back</Link>
        </div>
      </div>
      <input type="checkbox" id="deleteDialog" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">You are about to delete post {post?.title.slice(0,10)}...</p>
          <div className="modal-action">
            <label htmlFor="deleteDialog"><button className="btn" onClick={handleDeleteUser}>Delete!</button></label>
            <label htmlFor="deleteDialog" className="btn btn-accent">Back</label>
          </div>
        </div>
      </div>
    </div>
  }

  

  return <section>{content}</section>
}

export default Post