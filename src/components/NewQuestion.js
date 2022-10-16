import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
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

const NewQuestion = (props) => {
  console.log(props.authedUser);

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

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser: authedUser,
  }
}

export default connect(mapStateToProps)(NewQuestion);
