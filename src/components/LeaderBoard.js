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
    const orderedUsers = Object.values(users).sort((a, b) => {
      const totalA = Object.entries(a.answers).length + a.questions.length;
      const totalB = Object.entries(b.answers).length + b.questions.length;
      return totalB - totalA;
    })
  return {
    users: orderedUsers,
  }
}

export default (connect)(mapStateToProps)(LeaderBoard);