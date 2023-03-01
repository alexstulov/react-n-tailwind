import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { useAddPostMutation, useGetPostQuery } from "../../slices/postSlice"
import { Spinner } from "../Spinner"

type PostFormPropsT = {
    submitHandler: (args: any) => void, 
    postId?: number
}

const PostForm = ({submitHandler, postId}: PostFormPropsT) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState(0)
  // const user = useAppSelector((state) => state.users.data.find(user => user.id === userId))
  // const isSucceded = useAppSelector((state) => state.users.status)
  const [_, {isLoading}] = useAddPostMutation()
  const {data: post, isLoading: isLoadingPost, isSuccess} = useGetPostQuery(postId ||0)
  const canSave = [title, content, userId].every(Boolean) && !isLoading

  useEffect(() => {
    if (isSuccess && post) {
      setTitle(post.title)
      setContent(post.content)
      setUserId(post.userId)
    }
  }, [post])

  if (isLoadingPost) {
    return <Spinner text="Loading..." />
  }

  return <div className="p-2 lg:p-4 lg:w-1/2">
    <form>
      <div className="form-control">
        <label className="label" htmlFor='title'>Title</label>
        <input className="input input-bordered input-info" type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="title" />
      </div>
      <div className="form-control">
        <label className="label" htmlFor='content'>Content</label>
        <textarea className="input input-bordered input-info" name="content" value={content} onChange={e => setContent(e.target.value)} placeholder="content" />
      </div>
      <div className="form-control">
        <label className="label" htmlFor='userId'>User</label>
        <select className="select select-bordered select-info" name="userId" value={userId} onChange={e => setUserId(e.target.value ? parseInt(e.target.value) : 0)}>
          <option value="1">user1</option>
          <option value="2">user2</option>
          <option value="3">user3</option>
        </select>
      </div>
      <div className="flex flex-row justify-end mt-2">
        <button type="button" className="btn btn-secondary mr-2" onClick={() => submitHandler({title, content, userId})}>Save</button>
        <Link className="btn btn-accent" to={"/crud/posts"}>Back</Link>
      </div>
    </form>
  </div>
}

export default PostForm