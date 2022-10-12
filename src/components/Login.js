import { setAuthedUser } from '../actions/authedUser';
import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
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
  List,
  ListItemText,
} from '@mui/material'
import questions from '../reducers/questions';
import { Sheet } from '@mui/joy';

const Login = ( { authedUser, users }) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const dispatch = useDispatch();

 const navigate = useNavigate();
 const location = useLocation();
 const path = location.pathname;

const handleLogin = (e) => {
  e.preventDefault(e)
  
  dispatch(
    setAuthedUser({
      username: username,
      password: password,
    })
  )
  if (path === "/") {
    navigate("/home");
  }
};

  return (
    <Container
    variant="outlined"
    sx={{
      maxWidth: 400,
      mx: 'auto', // margin left & right
      my: 4, // margin top & botom
      py: 3, // padding top & bottom
      px: 2, // padding left & right
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      borderRadius: 'sm',
      boxShadow: 'md',
    }}
    >
      <Typography level="h4" component="h1" sx={{ textAlign: "center"}}>
        <b>Employee Polls</b>
      </Typography>
      <Typography level="body2" sx={{ textAlign: "center"}}>Sign in to continue</Typography>
      <Typography> Allowed Users </Typography>
      <List>
        <ListItemText>Username: sarahedo, Password: password123 </ListItemText>
        <ListItemText>Username: tylermcginnis, Password: abc321 </ListItemText>
        <ListItemText>Username: zoshikanlu, Password: pass246</ListItemText>
        <ListItemText>Username: mtsamis, Password: xyz123 </ListItemText>
      </List>
      <FormControl>
        <TextField
          sx={{ 
            maxWidth: 400,
          }}
          type="username"
          name="username"
          value={username}
          placeholder='Enter username'
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        >
        </TextField>
        <TextField
        sx={{ mt: 2 }}
          name="password"
          placeholder='Enter password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
        </TextField>
        <Button
          sx={{
            mt: 2,
            color: "orange",
            borderColor: "orange"
          }}
          variant="outlined"
          fullWidth
          type="submit"
          onClick={handleLogin}
        >
          Login
        </Button>
      </FormControl>
    </Container>
  );
}

const mapStateToProps = ({ authedUser, dispatch, users, questions }) => {
  return {
    authedUser,
    dispatch,
    users,
    questions,
  };
};

export default (connect(mapStateToProps)(Login));
