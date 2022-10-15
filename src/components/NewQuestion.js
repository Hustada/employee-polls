import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Menu,
  Container,
  Button,
  Grid,
} from '@mui/material';

const NewQuestion = (props) => {
  console.log(props.authedUser);

  return (  
    <div>
      <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography variant="h6">Create Your Own Poll</Typography>
        <Typography variant="h4">Would You Rather</Typography>
      <Grid Container spacing="3">
        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        </Grid>
      </Grid>
      </Container>
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser: authedUser,
  }
}

export default connect(mapStateToProps)(NewQuestion);
