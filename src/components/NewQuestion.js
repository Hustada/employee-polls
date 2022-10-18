import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import {
  Box,
  Typography,
  Menu,
  Container,
  Button,
  Grid,
  TextField,
  FormControl
} from '@mui/material';

const NewQuestion = ({ dispatch, authedUser }) => {
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const navigate = useNavigate();

  const handleOptionOne = (e) => {
    e.preventDefault();
    setOptionOne(e.target.value);
  }

  const handleOptionTwo = (e) => {
    e.preventDefault();
    setOptionTwo(e.target.value);
  }

  const addNewQuestion = (e) => {
    e.preventDefault();
    console.log(authedUser.name);  

    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser.name,
    }

    dispatch(handleAddQuestion(question));
    navigate('/home');
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
