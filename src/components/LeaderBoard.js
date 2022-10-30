import React from 'react'
import { connect } from "react-redux";

const LeaderBoard = (users) => {

  const orderedUsers = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      // answered: Object.keys(user.answers).length,
      // created: user.questions.length,
    }))
    .sort((a, b) => b.answered + b.created - (a.answered + a.created));

  return (
    <div>
      { console.log(orderedUsers) }
    </div>
  )
}

const mapStateToProps = ({ users, questions }) => {
  return {
    users,
    questions,
  }
}

export default (connect)(mapStateToProps)(LeaderBoard);