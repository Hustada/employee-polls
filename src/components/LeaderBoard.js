import React from 'react'
import { useEffect } from 'react';
import { connect } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';

const LeaderBoard = ({ users }) => {

  useEffect(() => {}, [users]);
  
  return (
    <Container sx={{ mt: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell align="right">Answered</TableCell>
              <TableCell align="right">Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const answeredCount = Object.keys(user.answers).length;
              return (
                <TableRow
                  key={user.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">{answeredCount}</TableCell>
                  <TableCell align="right">{user.questions.length}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

const mapStateToProps = ({ users }) => {
  // 'mapStateToProps' is a function that maps the Redux store's state to the props of a React component
  // 'users' is an object that maps user IDs to user objects

  const orderedUsers = Object.values(users).sort((a, b) => {
    // 'orderedUsers' is an array of user objects, sorted by the number of questions and answers they have
    // 'a' and 'b' are user objects being compared

    const totalA = Object.entries(a.answers).length + a.questions.length;
    // 'totalA' is the total number of questions and answers the user represented by 'a' has
    
    const totalB = Object.entries(b.answers).length + b.questions.length;
    // 'totalB' is the total number of questions and answers the user represented by 'b' has

    return totalB - totalA;
  })
  // Sort 'orderedUsers' in descending order based on the number of questions and answers
  return {
    users: orderedUsers,
  }
  // Return an object containing the 'orderedUsers' array as the 'users' prop
}

export default (connect)(mapStateToProps)(LeaderBoard);
// 'connect' is a higher-order component that connects the 'LeaderBoard' component to the Redux store
// 'mapStateToProps' specifies which slice of the store's state the component should receive as props
// 'LeaderBoard' is the component being connected to the store
