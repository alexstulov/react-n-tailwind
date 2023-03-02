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
  console.log(searchParams, searchParams.get("sort_by"))

  useEffect(() => {
    setSearchParams({
      sort_by: sortNOrder.sortBy,
      order: sortNOrder.order,
      page: currentPage.toString()
    })
  }, [sortNOrder, currentPage])

  const sortedPosts = useMemo(() => {
    const sortedPosts: PostT[] = posts.slice()
    return sortedPosts.sort((a, b) => a[sortNOrder.sortBy].toString()
      .localeCompare(b[sortNOrder.sortBy].toString(), "en", {numeric: true}) * (sortNOrder.order === "asc" ? 1 : -1))
      .slice((currentPage-1) * pageSize, currentPage * pageSize)
  }, [posts, sortNOrder, currentPage])

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
          {sortedPosts?.map((post: PostT, i) => <PostLine key={i} post={post} />)}
        </tbody>
      </table>
      <div className="flex flex-row justify-end mt-4">
        <Pagination 
          pageSize={pageSize}
          totalCount={posts.length}
          currentPage={currentPage}
          onPageChange={(n: number) => setCurrentPage(n)}
        />
      </div>
    </>
  } else if(isError) {
    
    return <div>{error.toString()}</div>
  }

  return <div className="overflow-x-auto p-4">
    <div className="mb-4 flex justify-end">
      <Link to="create" className='btn btn-primary'>Create Post</Link>
    </div>
    {content}
  </div>
}

export default Posts