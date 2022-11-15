import { connect } from 'react-redux'
import { useState } from 'react';
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
    let params = useParams();
    return <Component {...props} router={{ location, params }} />;
  };

  return ComponentWithRouterProp;
};

const ShowQuestion = ({ dispatch, questions, users, authedUser, id }) => {
  const [optionOneVote, setOptionOne] = useState(false);
  const [optionTwoVote, setOptionTwo] = useState(false);
  const navigate = useNavigate();

  function formatAsPercent(num) {
    return new Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num / 100);
  }

  const question = questions[id];
  if(!question) {
    return <Navigate to='/404'/>
  }
  const user = users[authedUser];
  const avatar = question ? users[question.author].avatarURL : "";
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePercentage = optionOneVotes === 0 ? 0 : formatAsPercent((optionOneVotes / totalVotes) * 100);
  const optionTwoPercentage = optionTwoVotes === 0 ? 0 : formatAsPercent((optionTwoVotes / totalVotes) * 100);

  const handleVotes = (e) => {
    e.preventDefault();

    const selectedAnswer ={
      authedUser: authedUser.id,
      qid: id,
      answer: e.currentTarget.value,
    }
    selectedAnswer.answer === 'optionOne' ? setOptionOne(true) : setOptionTwo(true);
    dispatch(handleQuestionAnswer(selectedAnswer))
  }

  const userVotedOne = question.optionOne.votes.includes(authedUser.id);
  const userVotedTwo = question.optionTwo.votes.includes(authedUser.id);

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
      <Typography variant='h4' sx={{ mb: 5 }}>{totalVotes} Total Votes</Typography>
      <Typography variant='h3'>Would You Rather?</Typography>
    </Box>
    <Grid container spacing={5} sx={{ mb: 10 }}>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" sx={{mb: 2}}>{optionOneVotes} Votes</Typography>
      <Box sx={{
          borderColor: '1px solid gray',
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
          onClick={handleVotes}
          value="optionOne"
          disabled={userVotedTwo === true}
        >
          Vote
        </Button>
        <Typography variant="h5" sx={{ mt: 2 }}>Percent Voted: {optionOnePercentage}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h5" sx={{mb: 2}} >{optionTwoVotes} Votes</Typography>
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
          onClick={handleVotes}
          value="optionTwo"
          disabled={userVotedOne === true}
        >
          Vote
        </Button>
        <Typography variant="h5" sx={{ mt: 2 }}>Percent Voted: {optionTwoPercentage}</Typography>
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