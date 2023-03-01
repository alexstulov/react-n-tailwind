import React from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../../slices/userSlice"
import PostForm from "./PostForm"
import { useAppDispatch } from "../../hooks"
import { useAddPostMutation } from "../../slices/postSlice"

export type HandlePostCreateArgsT = {
    title: string, 
    content: string, 
    userId: string, 
}

const PostCreate = () => {
  const navigate = useNavigate()
  const [addPost] = useAddPostMutation()


  const handlePostCreate = async ({title, content, userId}: HandlePostCreateArgsT) => {
    try {
      await addPost({title, content, userId}).unwrap().then(data => navigate(`/crud/posts/${data.id}`))
    } catch(err) {
      console.error("Failed to save the post: ", err)
    }
  }

  return <PostForm submitHandler={handlePostCreate} />
}

export default PostCreate