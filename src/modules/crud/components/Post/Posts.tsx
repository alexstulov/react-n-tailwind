import React, { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { PostT, SortNOrder } from "../../slices/postSlice"
import Pagination from "../Pagination"
import { format } from "date-fns"
import { useGetPostsQuery } from "../../slices/postSlice"
import { Spinner } from "../Spinner"
import classNames from "classnames"

const PostLine = ({post}: {post: PostT}) => {
  const navigate = useNavigate()
  const {id, title, content, date, userId} = post
  return <tr onClick={() => navigate(`/crud/posts/${id}`)} className="cursor-pointer">
    <td>{id}</td>
    <td>{title.slice(0, 10)}</td>
    <td>{content.slice(0, 10)}</td>
    <td>{format(new Date(date), "MM/dd/yyyy")}</td>
    <td><Link to={`/crud/users/${userId}`}>{userId}</Link></td>
  </tr>
}

const pageSize = 10;

const Posts = () => {
  const {data: posts = [], error, isLoading, isFetching, isSuccess, isError} = useGetPostsQuery("")
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortNOrder, setSortNOrder] = useState<{sortBy: SortNOrder["sort_by"], order: SortNOrder["order"]}>
  ({sortBy: searchParams.get("sort_by") as SortNOrder["sort_by"] || "id", order: searchParams.get("order") || "asc"})
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1"))
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")
  const [searchQueryInput, setSearchQueryInput] = useState(searchParams.get("query") || "")

  useEffect(() => {
    setSearchParams({
      sort_by: sortNOrder.sortBy,
      order: sortNOrder.order,
      page: currentPage.toString(),
      query: searchQuery
    })
  }, [sortNOrder, currentPage, searchQuery])

  const filteredPosts = useMemo(() => {
    const sortedPosts: PostT[] = posts.slice()
    return sortedPosts
      .filter(post => (post.id.toString().toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        post.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        post.content.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        format(new Date(post.date), "MM/dd/yyyy").toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())))
      .sort((a, b) => a[sortNOrder.sortBy].toString()
        .localeCompare(b[sortNOrder.sortBy].toString(), "en", {numeric: true}) * (sortNOrder.order === "asc" ? 1 : -1))
      
  }, [posts, sortNOrder, searchQuery])

  const pagePosts = useMemo(() => filteredPosts.slice((currentPage-1) * pageSize, currentPage * pageSize), [filteredPosts, currentPage])

  useEffect(() => {
    const totalPages = Math.ceil(filteredPosts.length / pageSize)
    if (totalPages < currentPage) {
      setCurrentPage(totalPages)
    }
  }, [
    searchQuery, filteredPosts, pageSize, setCurrentPage
  ])

  const columns: {label: string, accessor: SortNOrder["sort_by"]}[] = [
    {label: "Id", accessor: "id"},
    {label: "Title", accessor: "title"},
    {label: "Content", accessor: "content"},
    {label: "Date", accessor: "date"},
    {label: "User", accessor: "userId"},
  ]

  const handleSortingChange = (accessor: SortNOrder["sort_by"]) => {
    setSortNOrder({
      order: accessor === sortNOrder.sortBy && sortNOrder.order === "asc" ? "desc" : "asc",
      sortBy: accessor
    })
  }

  const submitHandler = () => {
    setSearchQuery(searchQueryInput)
  }
  
  let content

  if (isLoading) {
    content = <div>
      <Spinner text="Loading..." />
    </div>
  } else if (isSuccess) {
    content = <>
      <table className={classNames("table table-zebra table-compact w-full", {"blur": isFetching})}>
        <thead>
          <tr>
            {columns.map(({label, accessor}) => {
              return <th
                key={accessor}
                onClick={() => handleSortingChange(accessor)}
                className="cursor-pointer">
                {label}
                {sortNOrder.sortBy === accessor && sortNOrder.order === "asc" && <svg className="w-6 h-6 float-right inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                }
                {sortNOrder.sortBy === accessor && sortNOrder.order === "desc" && <svg className="w-6 h-6 float-right inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
                }
              </th>
            })}
          </tr>
        </thead>
        <tbody>
          {pagePosts?.map((post: PostT, i) => <PostLine key={i} post={post} />)}
        </tbody>
      </table>
      <div className="flex flex-row justify-end mt-4">
        <Pagination 
          pageSize={pageSize}
          totalCount={filteredPosts.length}
          currentPage={currentPage}
          onPageChange={(n: number) => setCurrentPage(n)}
        />
      </div>
    </>
  } else if(isError) {
    
    return <div>{error.toString()}</div>
  }

  return <div className="overflow-x-auto p-4">
    <div className="mb-4 flex justify-between">
      <form onSubmit={e => {
        e.preventDefault()
        submitHandler()
      }}>
        <div className="form-control">
          <div className="form-control">
            <label className="input-group">
              <input className="input input-bordered input-info" type="text" name="search_query" value={searchQueryInput} onChange={e => setSearchQueryInput(e.target.value)} placeholder="Search..." />
              <button type="button" className="btn btn-secondary mr-2" onClick={submitHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </label>
          </div>
        </div>
      </form>
      <Link to="create" className='btn btn-primary'>Create Post</Link>
    </div>
    {content}
  </div>
}

export default Posts