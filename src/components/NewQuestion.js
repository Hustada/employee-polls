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
      <Container>
        <Typography variant="h6">Create Your Own Poll</Typography>
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
