import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import PostForm, { HandlePostFormArgsT } from "./PostForm"
import { useEditPostMutation } from "../../slices/postSlice"

const PostUpdate = () => {
  const {postId} = useParams()
  const id = parseInt(postId || "")
  const navigate = useNavigate()

  const [updatePost] = useEditPostMutation()
  
  const handlePostUpdate = async ({title, content, userId}: HandlePostFormArgsT) => {
    if (!title || !content) {
      return
    }
    await updatePost({id, title, content, userId}).then(() => navigate(`/crud/posts/${id}`))
  }

  return <PostForm submitHandler={handlePostUpdate} postId={id}/>
}

export default PostUpdate