import { connect } from "react-redux";
import * as React from 'react';
// import { formatQuestion, formatDate } from '../utils/helpers';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const niceLookingDate = new Date().toDateString();

const QuestionCard = (props) => {
  return (
    <Grid item  xs={12} sm={6} md={3}>
      <Paper elevation={12} align="center" style={{padding: 6}}>
        <Typography variant='h6' align="center">Mark Hustad</Typography>
        <Typography variant='body2' align="center" sx={{ fontStyle: 'italic' }}>{niceLookingDate}</Typography>
        <Button 
          variant="outlined"
          size="small"
          fullWidth="true"
        >
          Show
        </Button>
      </Paper>
    </Grid>
  );
}

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  
  return {
    authedUser,
    questions
  };
};

export default connect(mapStateToProps)(QuestionCard);