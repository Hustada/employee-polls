import { authedUser } from '../actions/authedUser';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import app from '../firebase';

function SignUp() {

  const auth = getAuth(app);
  console.log('Firebase Auth:', auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert("Success!");
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      alert(errorCode);
    });
  }

  const signIn = () => {

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert("Sign in Success!");
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      alert(errorCode);
    });
  }

  const signUserOut = () => {
    signOut(auth).then(() => {
      alert('Sign out Success!')
      // Sign-out successful.
    }).catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
      // An error happened.
    });
  }
    
  return (
    <CssVarsProvider>
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
          // html input attribute
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          // pass down to FormLabel as children
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="password"
          type="password"
          placeholder="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="outlined"
          sx={{
            mt: 1, // margin top
            color: "orange",
            borderColor: "orange"
          }}
          onClick={signUp}
        >
          Create
        </Button>
        <Button
          variant="outlined"
          sx={{
            mt: 1, // margin top
            color: "orange",
            borderColor: "orange"
          }}
          onClick={signIn}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          sx={{
            mt: 1, // margin top
            color: "orange",
            borderColor: "orange"
          }}
          onClick={signUserOut}
        >
          Sign Out
        </Button>
        <Typography
          endDecorator={<Link sx={{
            color: "orange"
          }}href="/login">Log in</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Already have an account?
        </Typography>
      </Sheet>
      
    </CssVarsProvider>
  );
}

const mapStateToProps = ({  authedUser, users }) => {
  return {
    authedUser: authedUser,
    users 
  }
}

export default SignUp;
