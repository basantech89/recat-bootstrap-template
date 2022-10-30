import './styles.scss'

import React from 'react'
import { Table } from 'react-bootstrap'
import { useGetUsersQuery } from 'redux-store/usersSlice'

const Users = () => {
  const { data, isLoading } = useGetUsersQuery(null)
  const users = data?.users || []

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
          {!isLoading &&
            users.map((user, id) => (
              <tr key={id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </React.Fragment>
  )
}

export default Users
