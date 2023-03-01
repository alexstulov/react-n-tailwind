import React from "react"
import { format, fromUnixTime } from "date-fns"
import { emptyUser, selectUser, setCurrentPage, setSortNOrder, SortNOrder } from "../../slices/userSlice"
import Pagination from "../Pagination"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"

const UserLine = ({userId}: {userId: number}) => {
  const navigate = useNavigate()
  const {id, first_name, last_name, email, gender, last_login} =
    useAppSelector((state) => selectUser(state, userId)) || emptyUser
  return <tr onClick={() => navigate(`/crud/users/${userId}`)} className="cursor-pointer">
    <td>{id}</td>
    <td>{first_name}</td>
    <td>{last_name}</td>
    <td>{gender}</td>
    <td>{email}</td>
    <td>{format(fromUnixTime(last_login), "MM/dd/yyyy")}</td>
  </tr>
}

const Users = () => {
  const dispatch = useAppDispatch()
  const usersLength = useAppSelector((state) => state.users.data.length)
  const currentPage = useAppSelector((state) => state.users.currentPage)
  const limit = useAppSelector((state) => state.users.limit)
  const sort_by = useAppSelector((state) => state.users.sort_by)
  const order = useAppSelector((state) => state.users.order)
  const userIds = useAppSelector((state) => [...state.users.data]
    .sort((a, b) => a[sort_by].toString().localeCompare(b[sort_by].toString(), "en", {numeric: true,}) * (order === "asc" ? 1 : -1))
    .slice((state.users.currentPage-1) * state.users.limit, state.users.currentPage * state.users.limit).map((user) => user.id))

  const columns: {label: string, accessor: SortNOrder["sort_by"]}[] = [
    { label: "Id", accessor: "id" },
    { label: "First name", accessor: "first_name" },
    { label: "Last name", accessor: "last_name" },
    { label: "Gender", accessor: "gender" },
    { label: "E-mail", accessor: "email" },
    { label: "Last login", accessor: "last_login" },
  ];

  const handleSortingChange = (accessor: SortNOrder["sort_by"]) => {
    const sortOrder = accessor === sort_by && order === "asc" ? "desc" : "asc";
    dispatch(setSortNOrder({sort_by: accessor, order: sortOrder}))
  };

  return <div className="overflow-x-auto p-4">
    <div className="mb-4 flex justify-end">
      <Link to="create" className="btn btn-primary">Create User</Link>
    </div>
    <table className="table table-zebra table-compact w-full">
      <thead>
        <tr>
          {columns.map(({ label, accessor }) => {
            return <th 
              key={accessor} 
              onClick={() => handleSortingChange(accessor)} 
              className="cursor-pointer">
              {label}
              {sort_by === accessor && order === "asc" && <svg className="w-6 h-6 float-right inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>}
              {sort_by === accessor && order === "desc" && <svg className="w-6 h-6 float-right inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              }
            </th>;
          })}
        </tr>
      </thead>
      <tbody>
        {userIds.map((userId: number) => <UserLine key={userId} userId={userId} />)}
      </tbody>
    </table>
    <div className="flex flex-row justify-end mt-4">
      <Pagination
        pageSize={limit}
        totalCount={usersLength}
        currentPage={currentPage}
        onPageChange={(n: string | number) => dispatch(setCurrentPage(n))} />
    </div>
  </div>
}

export default Users