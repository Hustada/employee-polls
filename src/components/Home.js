import { connect } from 'react-redux'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import QuestionCard from './QuestionCard';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import { randomDate } from '../utils/helpers';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState } from 'react';

function Home ({ questionIds, questions, authedUser }) {
  const authedID = authedUser.id;
  const [answered, unanswered] = useState('');
  const newQuestions = questionIds.filter((qid) => !(questions[qid].optionOne.votes.includes(authedID) || questions[qid].optionTwo.votes.includes(authedID)));
  const doneQuestions = questionIds.filter((qid) => !newQuestions.includes(qid));
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container sx={{ mt: 5 }} >
      <Typography
        data-testid="Unanswered"
        variant="h4" 
        sx={
          { 
            textAlign: 'center',
            padding: '10px',
            mb: 3, 
            border: 1,
            borderColor: 'orange',
            borderRadius: 1
          }}>
            Unanswered
      </Typography>
      <Grid container spacing={2}>
      {newQuestions.map((id) => (
         <QuestionCard id={id} key={id}/>
      ))}
      </Grid>
      <Typography
        data-testid="answered"
        variant="h4" 
        sx={
          { 
            textAlign: 'center',
            padding: '10px',
            mt: 3, 
            border: 1,
            borderColor: 'orange' ,
            borderRadius: 1
          }}>
            Answered
      </Typography>
      <Grid container spacing={2} sx={{ mt: 3 }}>
      {doneQuestions.map((id) => (
         <QuestionCard id={id} key={id}/>
      ))}
      </Grid>
    </Container>
   
  )
}

const mapStateToProps = ({ questions, authedUser }) => ({
  questionIds: Object.keys(questions).sort(
    (a,b) => questions[b].timestamp > questions[a].timestamp
  ),
  authedUser,
  questions,
});

export default connect(mapStateToProps)(Home);