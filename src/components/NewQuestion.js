import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Menu,
  Container,
  Button,
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
