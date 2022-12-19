import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/shared';
import {
  Box,
  Typography,
  Menu,
  Container,
  Button,
  Grid,
  TextField,
  FormControl,
  Alert,
} from '@mui/material';

const NewQuestion = ({ dispatch, authedUser }) => {
  // 'dispatch' is a function that dispatches an action to the redux store
  // 'authedUser' is an object representing the authenticated user
  
  const [optionOne, setOptionOne] = useState('');
  // 'optionOne' is a state variable that stores the value of the first option for the new question
  // 'setOptionOne' is a function that updates the value of 'optionOne'

  const [optionTwo, setOptionTwo] = useState('');
  // 'optionTwo' is a state variable that stores the value of the second option for the new question
  // 'setOptionTwo' is a function that updates the value of 'optionTwo'

  const [errorMessage, setErrorMessage] = useState(false);
  // 'errorMessage' is a state variable that stores a boolean value indicating whether there is an error
  // 'setErrorMessage' is a function that updates the value of 'errorMessage'

  const navigate = useNavigate();
  // 'navigate' is a function that allows the user to navigate to a different route

  const handleOptionOne = (e) => {
    e.preventDefault();
    setOptionOne(e.target.value);
  }
  // 'handleOptionOne' is a function that updates the value of 'optionOne' when the user types in the first option input field

  const handleOptionTwo = (e) => {
    e.preventDefault();
    setOptionTwo(e.target.value);
  }
  // 'handleOptionTwo' is a function that updates the value of 'optionTwo' when the user types in the second option input field

  const addNewQuestion = (e) => {
    e.preventDefault();

    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser.id,
    }
    // 'question' is an object that represents the new question, with properties 'optionOneText', 'optionTwoText', and 'author'
    
    if (question.optionOneText === ''  || question.optionTwoText === '') {
      setErrorMessage(true)
      return
    }
    // If either 'optionOneText' or 'optionTwoText' is an empty string, set 'errorMessage' to true and return
    
    dispatch(handleAddQuestion(question));
    // Dispatch an action to the redux store to add the new question
    
    navigate('/home');
    // Navigate to the '/home' route
  }

  return (  
  <FormControl
    sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      p: 10 }
    }
  >
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    {errorMessage && (
      <Alert data-testid="login-error" severity="error">
        Please fill out all fields below
      </Alert>
    )}
    <Typography variant="h6" >Create Your Own Poll</Typography>
    <Typography variant='h4'>Would You Rather</Typography>
    </Box>
    <Grid container>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ mt: '2%' }}>Option 1</Typography>
        <TextField
          onChange={handleOptionOne}
          value={optionOne}
          type="text"
          name="optionOne"
          placeholder="Enter option 1"
          sx=
          {{
            width: '85%', mt: '2%'
          }}
        >
        Something here
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h5" sx={{ mt: '2%' }}>Option 2</Typography>
        <TextField
          onChange={handleOptionTwo}
          value={optionTwo}
          type="text"
          name="optionTwo"
          placeholder="Enter option 2"
            sx=
            {{
              width: '85%', mt: '2%'
            }}
          >
          Something here
        </TextField>
      </Grid>
    </Grid>
    <Button
      data-testid='question-submit-btn'
      type="submit"
      onClick={addNewQuestion}
      variant="outlined"
      sx={{
        minWidth: 300,
        mt: 2,
        color: "orange",
        borderColor: "orange"
      }}
    >
    Submit
    </Button>
  </FormControl>
  )
}

const mapStateToProps = ({ authedUser, dispatch }) => {
  return {
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion);
