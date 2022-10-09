import { setAuthedUser } from '../actions/authedUser';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  useNavigate,
  useLocation,
  useParams 
} from 'react-router-dom';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import {
  Select,
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  TextField,
  Container,
} from '@mui/material'

const Login = ( { authedUser, dispatch }) => {
 const [userName, setUser] = useState('');
 const [disable, setDisable] = useState(true);
 const navigate = useNavigate()
 const location = useLocation()
 const path = location.pathname;

 console.log('location:', location, 'path:', path);

const handleLogin = (e) => {
  e.preventDefault(e)
  dispatch(setAuthedUser(userName));
  if (path === "/") {
    navigate("/home");
  }
};

const handleChange = (e) => {
  e.preventDefault();
  setUser(e.target.value);
  setDisable(false);
  console.log(userName);
};

  return (
    <Container sx={{
      mt: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <Typography level="h4" component="h1" sx={{ textAlign: "center"}}>
        <b>Employee Polls</b>
      </Typography>
      <Typography level="body2" sx={{ textAlign: "center"}}>Sign in to continue</Typography>
      <FormControl fullWidth>
        <Select
          type="select"
          variant="outlined"
          label="User"
          fullWidth
          value={userName}
          onChange={handleChange}
        >
          <MenuItem value={"mtsamis"}>Mike Tsamis</MenuItem>
          <MenuItem value={"sarahedo"}>Sarah Edo</MenuItem>
          <MenuItem value={"tylermcginnis"}>Tyler McGinnis</MenuItem>
          <MenuItem value={"zoshikanlu"}>Zenobia Oshikanlu</MenuItem>
        </Select>
        </FormControl>
        <Button
          sx={{
            mt: 2,
            color: "orange",
            borderColor: "orange"
          }}
          variant="outlined"
          data-testid="button"
          fullWidth
          onClick={handleLogin}
          disabled={disable}
        >
          Login
        </Button>
      
    </Container>
  );
}

const mapStateToProps = ({ authedUser, dispatch }) => {
  return {
    authedUser,
  };
};

export default (connect(mapStateToProps)(Login));
