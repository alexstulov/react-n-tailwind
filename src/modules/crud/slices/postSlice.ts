import { jsonServerApi } from "../services/json-server";

export type PostT = {
  id: number,
  title: string,
  content: string,
  date: string,
  userId: number
}

export interface SortNOrder {
  sort_by: "id" | "title" | "content" | "date" | "userId",
  order: string,
}

export interface PostStateT extends SortNOrder {
  data: PostT[],
  currentPage: number,
  limit: number,
  status: "idle" | "loading" | "succeeded" | "failed",
  error: string
}

export const emptyPost = {
  id: 0,
  title: "",
  content: "",
  date: "",
  userId: 0
}

export const extendedApiSlice = jsonServerApi.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => "posts/",
      providesTags: (result = []) => [
        "Post",
        ...result.map(({id}: PostT) => ({type: "Post", id}))
      ]
    }),
    getPost: builder.query<PostT, number>({
      query: id => ({url: `posts/${id}`, method: "GET"}),
      providesTags: (_, __, arg) => [{type: "Post", id: arg}]
    }),
    addPost: builder.mutation({
      query: initialPost => ({
        url: "posts/",
        method: "POST",
        body: {
          ...initialPost,
          date: "2023-03-01T06:01:55.805Z"
        }
      }),
      invalidatesTags: ["Post"]
    }),
    editPost: builder.mutation({
      query: post => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: post
      }),
      invalidatesTags: (_, __, arg) => [{type: "Post", id: arg.id}]
    }),
    deletePost: builder.mutation({
      query: id => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"]
    })
  })
})

export const {
  useGetPostsQuery, 
  useGetPostQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation
} = extendedApiSlice