import { setAuthedUser } from '../actions/authedUser';
import { _getUser } from '../utils/api'
import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { 
  Navigate,
  useNavigate,
  useLocation,
  useParams 
} from 'react-router-dom';
import {
  Button,
  FormControl,
  Typography,
  TextField,
  Container,
  Alert,
  Box,
} from '@mui/material'

const Login = (props) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

 const navigate = useNavigate();
 const location = useLocation();
 const path = location.pathname;

const handleLogin = (e) => {
  e.preventDefault(e)

  if (!username || !password) {
    setError(true);
    setErrorMessage('set username and password');
  } else {
    _getUser(username, password).then((user) => {
      if (user) {
        setError(false);
        setErrorMessage("");
        props.dispatch(setAuthedUser(user));
      } else {
        setError(true);
        setErrorMessage("Incorrect username or password");
      }
    });
  }
  if (path === "/") {
    navigate("/home");
  }
};

  return (
    <Container
      variant="outlined"
      sx={{
        // border: "1px solid gray",
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
        alignItems: 'center',
      }}
    >
      <Typography level="h4" component="h1" sx={{ textAlign: "center"}}>
        <b>Employee Polls</b>
      </Typography>
      <Box className="box-center">
        {error && (
          <Alert data-testid="login-error" severity="error">
            Incorrect username or password
          </Alert>
        )}
      </Box>
      <Typography level="body2" sx={{ textAlign: "center"}}>Sign in to continue</Typography>
      <FormControl>
        <TextField
          sx={{ 
            minWidth: 300,
          }}
          type="username"
          name="username"
          value={username}
          placeholder='Enter username'
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          data-testid="username"
        >
        </TextField>
        <TextField
        sx={{ 
          maxWidth: 400,
          mt: 2 }}
          name="password"
          placeholder='Enter password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password"
        >
        </TextField>
        <Button
          sx={{
            minWidth: 300,
            mt: 2,
            color: "orange",
            borderColor: "orange"
          }}
          variant="outlined"
          fullWidth
          type="submit"
          data-testid="login-btn"
          onClick={handleLogin}
        >
          Login
        </Button>
      </FormControl>
    </Container>
  );
}

const mapStateToProps = (props) => props;

export default (connect(mapStateToProps)(Login));
