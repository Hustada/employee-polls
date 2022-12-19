import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { formatDate, formatQuestion } from "../utils/helpers"
import * as React from 'react';
import {
  Grid,
  Paper,
  Container,
  Typography,
  Button,
  Avatar
} from '@mui/material';

function getDate(timestamp) {
  // 'getDate' is a function that returns a formatted string representation of a date and time
  // 'timestamp' is a number representing a date and time

  const date = new Date(timestamp)
  // 'date' is a 'Date' object representing the date and time specified by 'timestamp'
  
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  // 'time' is a string representation of the time portion of 'date' in the format "hh:mm AM/PM"
  
  return "" + time + " | " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
  // Return a string in the format "hh:mm AM/PM | dd/mm/yyyy"
}

const QuestionCard = (props) => {
  // 'props' is an object that contains the following properties: 'questions', 'users', and 'id'
  
  const { questions, users, id } = props;
  // Destructuring assignment to extract the 'questions', 'users', and 'id' properties from 'props'
  
  const question = formatQuestion(questions[id], users[questions[id].author]);
  // 'question' is an object that represents a formatted version of the question with the given 'id'
  
  const avatar = question ? users[question.author].avatarURL : "";
  // If 'question' is truthy, assign the avatarURL of the question's author to 'avatar'. Otherwise, assign an empty string to 'avatar'
  
  const navigate = useNavigate();
  // 'navigate' is a function that allows the user to navigate to a different route
  
  return (
    <Grid item  xs={12} sm={6} md={3}>
      <Paper elevation={12} align="center" style={{padding: 6}}>
        <Avatar src={avatar} />
        <Typography variant='h6' align="center">{questions[id].author}</Typography>
        <Typography variant='body2' align="center" sx={{ fontStyle: 'italic' }}>{getDate(questions[id].timestamp)}</Typography>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            color: 'orange',
            borderColor: 'orange'
          }}
          onClick={(e) => navigate(`/questions/${props.id}`)}
        >
          Show
        </Button>
      </Paper>
    </Grid>
  );
}

const mapStateToProps = ({ questions, users }, { id }) => (
  {
    questions,
    users,
    id
  }
)

export default connect(mapStateToProps)(QuestionCard);