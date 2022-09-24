import './styles.scss'

import { useGetUsersQuery } from '../../redux-store/usersSlice'
import { fetchUsers } from '../../utils/api'

import React from 'react'
import { Table } from 'react-bootstrap'

const Users = () => {
  // const { data, isLoading } = useGetUsersQuery(null)

  // const users = data?.users || []

  const getUsers = () => fetchUsers().finally(console.log)

  return (
    <React.Fragment>
      <h6> Users </h6>
      <Table striped bordered hover responsive className="users-table">
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {/*{!isLoading &&*/}
          {/*  users.map((user, id) => (*/}
          {/*    <tr key={id}>*/}
          {/*      <td>{user.firstName}</td>*/}
          {/*      <td>{user.lastName}</td>*/}
          {/*      <td>{user.email}</td>*/}
          {/*    </tr>*/}
          {/*  ))}*/}
        </tbody>
      </Table>
      <button onClick={getUsers}>Fetch</button>
    </React.Fragment>
  )
}

export default Users
