import { setAuthedUser } from '../actions/authedUser';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import app from '../firebase';

const Login = (props) => {
 const [userName, setUser] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate()

 function handleLogin(e) {
   e.preventDefault();
   setUser(e.target.value)
   props.dispatch(setAuthedUser(userName, password))
   navigate('/dashboard')
}

  return (
    <CssVarsProvider>
      <form onSubmit={handleLogin}>
        <Sheet
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
          <div>
            <Typography level="h4" component="h1" sx={{ textAlign: "center"}}>
              <b>Employee Polls</b>
            </Typography>
            <Typography level="body2" sx={{ textAlign: "center"}}>Sign in to continue</Typography>
          </div>
          <TextField
            // value={userName}
            name="username"
            type="text"
            placeholder="username"
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            value={password}
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </Sheet>
      </form>
    </CssVarsProvider>
  );
}

const mapStateToProps = ({  authedUser, dispatch }) => {
  return {
    dispatch,
    authedUser
  }
}

export default connect(mapStateToProps)(Login);
