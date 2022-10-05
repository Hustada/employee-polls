import { connect } from "react-redux";
import * as React from 'react';
// import { formatQuestion, formatDate } from '../utils/helpers';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const niceLookingDate = new Date().toDateString();

function getDate(timestamp) {
  const date = new Date(timestamp)
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  return "" + time + " | " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
}

const QuestionCard = ({ questions, id }) => {
  return (
    <Grid item  xs={12} sm={6} md={3}>
      <Paper elevation={12} align="center" style={{padding: 6}}>
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
        >
          Show
        </Button>
      </Paper>
    </Grid>
  );
}

const mapStateToProps = ({ questions }) => (
  {
    questions: questions
  }
)

export default connect(mapStateToProps)(QuestionCard);