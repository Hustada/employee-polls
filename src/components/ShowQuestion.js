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
  // Higher-order component (HOC) that passes the 'location' and 'params' objects from the router as props to the given 'Component'

  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    // 'location' is an object that represents the current location of the app
    
    let params = useParams();
    // 'params' is an object that contains the dynamic segments of the URL of the current route

    return <Component {...props} router={{ location, params }} />;
    // Render the given 'Component' with the additional 'router' prop that contains the 'location' and 'params' objects
  };

  return ComponentWithRouterProp;
};

const ShowQuestion = ({ dispatch, questions, users, authedUser, id }) => {
  // 'dispatch' is a function that dispatches an action to the redux store
  // 'questions' is an object that maps question IDs to question objects
  // 'users' is an object that maps user IDs to user objects
  // 'authedUser' is an object representing the authenticated user
  // 'id' is the ID of the question being displayed

  const [optionOneVote, setOptionOne] = useState(false);
  // 'optionOneVote' is a state variable that stores a boolean value indicating whether the user voted for the first option
  // 'setOptionOne' is a function that updates the value of 'optionOneVote'

  const [optionTwoVote, setOptionTwo] = useState(false);
  // 'optionTwoVote' is a state variable that stores a boolean value indicating whether the user voted for the second option
  // 'setOptionTwo' is a function that updates the value of 'optionTwoVote'

  const navigate = useNavigate();
  // 'navigate' is a function that allows the user to navigate to a different route

  function formatAsPercent(num) {
    // 'formatAsPercent' is a function that formats a number as a percentage
    return new Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num / 100);
  }

  const question = questions[id];
  // 'question' is an object that represents the question with the given 'id'
  
  if(!question) {
    return <Navigate to='/404'/>
  }
  // If 'question' is falsy, render a 'Navigate' component that redirects the user to the '/404' route
  
  const user = users[authedUser];
  // 'user' is an object that represents the authenticated user
  
  const avatar = question ? users[question.author].avatarURL : "";
  // If 'question' is truthy, assign the avatarURL of the question's author to 'avatar'. Otherwise, assign an empty string to 'avatar'
  
  const optionOneVotes = question.optionOne.votes.length;
  // 'optionOneVotes' is the number of votes for the first option of the question
  
  const optionTwoVotes = question.optionTwo.votes.length;
  // 'optionTwoVotes' is the number of votes for the second option of the question

const totalVotes = optionOneVotes + optionTwoVotes;
// 'totalVotes' is the total number of votes for both options of the question

const optionOnePercentage = optionOneVotes === 0 ? 0 : formatAsPercent((optionOneVotes / totalVotes) * 100);
// 'optionOnePercentage' is the percentage of votes for the first option of the question

const optionTwoPercentage = optionTwoVotes === 0 ? 0 : formatAsPercent((optionTwoVotes / totalVotes) * 100);
// 'optionTwoPercentage' is the percentage of votes for the second option of the question

const userVotedOne = question.optionOne.votes.includes(authedUser.id);
// 'userVotedOne' is a boolean value indicating whether the authenticated user voted for the first option of the question

const userVotedTwo = question.optionTwo.votes.includes(authedUser.id);
// 'userVotedTwo' is a boolean value indicating whether the authenticated user voted for the second option of the question
  
  let userVotedText = "";
  if(userVotedOne) {
    userVotedText = "You voted for option one";
  } else if(userVotedTwo) {
    userVotedText = "You voted for option two";
  }

  console.log(userVotedText)
  const handleVotes = (e) => {
    e.preventDefault();
  
    const selectedAnswer ={
      authedUser: authedUser.id,
      qid: id,
      answer: e.currentTarget.value,
    }
    selectedAnswer.answer === 'optionOne' ? setOptionOne(true) : setOptionTwo(true);
    // If the user selected the first option, set 'optionOneVote' to true. Otherwise, set 'optionTwoVote' to true
    dispatch(handleQuestionAnswer(selectedAnswer))
    // Dispatch the 'handleQuestionAnswer' action with the 'selectedAnswer' object as an argument
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
      <Typography variant='h5' sx={{ mb: 5 }}>{userVotedText}</Typography>
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
          height: '100%',

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
          Vote for Option One
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
          height: '100%',

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
          Vote for Option Two
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