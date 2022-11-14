import { connect } from 'react-redux'
import {
  Grid,
  Paper,
  Container,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@mui/material/'
import QuestionCard from './QuestionCard';
import { randomDate } from '../utils/helpers';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState } from 'react';
import { borderRadius } from '@mui/system';

function Home ({ questionIds, questions, authedUser }) {
  const authedID = authedUser.id;
  const [unanswered, setUnanswered] = useState(false);
  const [toggleLabel, setToggleLabel] = useState('Show Unanswered');
  const filteredNewQuestions = questionIds.filter((qid) => !(questions[qid].optionOne.votes.includes(authedID) || questions[qid].optionTwo.votes.includes(authedID)));
  const newQuestions = filteredNewQuestions.sort((a, b) => questions[b].timestmap - questions[a].timestamp);
  const doneQuestions = questionIds.filter((qid) => !newQuestions.includes(qid)).sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  const navigate = useNavigate();
  const location = useLocation();

  const showUnansweredAnswered = (event) => {
    if(unanswered === true) {
      setUnanswered(false);
      setToggleLabel('Show Unanswered')
    } else {
      setUnanswered(true);
      setToggleLabel('Show Answered')
    }
  }

  return (
    <Container sx={{ mt: 5 }} >
      <FormGroup>
        <FormControlLabel control={<Switch onClick={showUnansweredAnswered} color="warning" />} label={toggleLabel} />
      </FormGroup>
      {unanswered === true ? (
      <div>
        <Typography
          data-testid="Unanswered"
          variant="h4"
          sx={
            {
              textAlign: 'center',
              padding: '10px',
              mt: 3,
              border: 1,
              borderColor: 'orange',
              borderRadius: 1
            }}>
              Unanswered
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
        {newQuestions.map((id) => (
          <QuestionCard id={id} key={id}/>
        ))}
        </Grid>
      </div>
        ) : (
      <div>
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
      </div>
      )}
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