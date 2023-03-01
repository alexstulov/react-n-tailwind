import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import PostForm from "./PostForm"
import { useEditPostMutation } from "../../slices/postSlice"

export type HandlePostUpdateArgsT = {
    title: string,
    content: string,
    userId: number
}

const PostUpdate = () => {
  const {postId} = useParams()
  const id = parseInt(postId || "")
  const navigate = useNavigate()

  const [updatePost] = useEditPostMutation()
  
  const handlePostUpdate = async ({title, content, userId}: HandlePostUpdateArgsT) => {
    if (!title || !content) {
      return
    }
    await updatePost({id, title, content, userId}).then(() => navigate(`/crud/posts/${id}`))
  }

  return <PostForm submitHandler={handlePostUpdate} postId={id}/>
}

export default PostUpdate