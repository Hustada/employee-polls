import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Avatar,
} from '@mui/material';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { formatDate, formatQuestion } from '../utils/helpers';
import { handleQuestionAnswer } from '../actions/shared';

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};


const ShowQuestion = ({ dispatch, questions, users, authedUser, id }) => {
  const [optionOneVote, setOptionOneVote] = useState("");
  const [optionTwoVote, setOptionTwoVote] = useState("");
  const [disabled, setDisabled] = useState(false);
  const question = questions[id];
  const user = users[authedUser];
  const avatar = question ? users[question.author].avatarURL : "";
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePercentage = optionOneVotes / totalVotes;
  console.log('OPTION ONE VOTES:', optionOneVotes)
  console.log('OPTION TWO VOTES:', optionTwoVotes)
  console.log('TOTAL VOTES:', totalVotes);
  console.log('OPTION ONE PERCENTAGE:', optionOnePercentage);

  const handleOptionOneVote = (e) => {
    console.log(selectedAnswer);
    e.preventDefault();
    setOptionOneVote("optionOne");
    setOptionTwoVote("");
    dispatch(handleQuestionAnswer(selectedAnswer))
  }

  const handleOptionTwoVote = (e) => {
    e.preventDefault();
    console.log(selectedAnswer);
    setOptionTwoVote("optionTwo");
    setOptionOneVote("");
    dispatch(handleQuestionAnswer(selectedAnswer))

  }

  const selectedOoptions = {
    optionOneVote,
    optionTwoVote,
  }

  console.log(optionOneVote);
  console.log(optionTwoVote);

  const selectedAnswer ={
    authedUser: authedUser.id,
    qid: id,
    answer: "optionTwo", // fix this.
  }

  return (
  <Container>
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      p: 10 }
    }>
    <Typography variant="h5" >Poll By {question.author} </Typography>
      <Avatar
        alt="Remy Sharp"
        src={avatar}
        sx={{ width: 300, height: 300, alignItems: "center", m: 3}}
      />
      <Typography variant='h5'>Would You Rather?</Typography>
    </Box>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">{optionOneVotes} Total Votes</Typography>
      <Box sx={{
          borderColor: '1 px solid gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          borderRadius: 2,
          mb: 2
        }}
          border={1}
          borderColor="gray"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize={24}
        >
          <Typography variant="h6" sx={{ m: 1 }}>{question.optionOne.text}?</Typography>
        </Box>
        <Button
          className="optionOneButton"
          sx={{ backgroundColor: "orange" }}
          variant="contained"
          fullWidth
          onClick={handleOptionOneVote}
          // disabled={optionTwoVote === true}
        >
          Vote
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h5">{optionTwoVotes} Total Votes</Typography>
        <Box sx={{
          borderColor: '1 px solid gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          borderRadius: 2,
          mb: 2
        }}
          border={1}
          borderColor="gray"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize={24}
        >
          <Typography variant="h6" sx={{ m: 1 }}>{question.optionTwo.text}?</Typography>
        </Box>
        <Button
          className="optionTwoButton"
          sx={{ backgroundColor: "orange" }}
          variant="contained"
          fullWidth
          onClick={handleOptionTwoVote}
          // disabled={optionOneVote === true}
        >
          Vote
        </Button>
      </Grid>
      <Grid item xs={6}>
        
      </Grid>
    </Grid>
  </Container>
  )
}

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  return {
    questions,
    id,
    users,
    authedUser,
  };
};

export default withRouter(connect(mapStateToProps)(ShowQuestion));