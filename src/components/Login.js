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
  List,
  ListItemText,
} from '@mui/material'
import questions from '../reducers/questions';

const Login = ( { authedUser, dispatch, users }) => {
//  const [userName, setUser] = useState('');
//  const [password, setPassword] = useState('');
//  const [disable, setDisable] = useState(true);

const [form, setForm] = useState({
  username: '',
  password: '',
})

 const navigate = useNavigate()
 const location = useLocation()
 const path = location.pathname;

const handleLogin = (e) => {
  e.preventDefault(e)
  dispatch(setAuthedUser(form.username));
  if (path === "/") {
    navigate("/home");
  }
};

// const handleChange = (e) => {
//   e.preventDefault();
//   setUser(e.target.value);
//   setPassword(e.target.value)
//   setDisable(false);
//   console.log(userName);
//   console.log(password);
// };

const handleChange = (e) => {
  e.preventDefault();
  setForm({...form, [e.target.name]: e.target.value});
  console.log(form);
}


  return (
    <Container sx={{
      mt: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}>
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
          name="username"
          placeholder='Enter username'
          type="text"
          onChange={handleChange}
        >
        </TextField>
        <TextField
          name="password"
          placeholder='Enter password'
          type="password"
          onChange={handleChange}
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
          // disabled={disable}
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
