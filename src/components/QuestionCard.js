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
  const date = new Date(timestamp)
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  return "" + time + " | " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
}

const QuestionCard = (props) => {
  const { questions, users, id } = props;
  const question = formatQuestion(questions[id], users[questions[id].author]);
  const navigate = useNavigate();
  console.log(question);

  return (
    <Grid item  xs={12} sm={6} md={3}>
      <Paper elevation={12} align="center" style={{padding: 6}}>
        <Avatar src={question.avatar} />
        <Typography variant='h6' align="center">{questions[id].author}</Typography>
        <Typography variant='body2' align="center" sx={{ fontStyle: 'italic' }}>{getDate(questions[id].timestamp)}</Typography>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          sx=
          {{
            color: 'orange',
            borderColor: 'orange'
          }}
          onClick={(e) => navigate(`/questions/${question.id}`)}
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