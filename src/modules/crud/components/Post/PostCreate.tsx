import React from "react"
import { useNavigate } from "react-router-dom"
import PostForm, { HandlePostFormArgsT } from "./PostForm"
import { useAddPostMutation } from "../../slices/postSlice"


const PostCreate = () => {
  const navigate = useNavigate()
  const [addPost] = useAddPostMutation()


  const handlePostCreate = async ({title, content, userId}: HandlePostFormArgsT) => {
    try {
      await addPost({title, content, userId}).unwrap().then(data => navigate(`/crud/posts/${data.id}`))
    } catch(err) {
      console.error("Failed to save the post: ", err)
    }
  }

  return <PostForm submitHandler={handlePostCreate} />
}

export default PostCreate