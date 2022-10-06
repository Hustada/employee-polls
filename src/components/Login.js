import { setAuthedUser } from '../actions/authedUser';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  useNavigate,
  useLocation,
  useParams 
} from 'react-router-dom';
// import Select from '@mui/material/Select';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Select, { selectClasses } from '@mui/joy/Select';
import {
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  TextField,
  Container,
} from '@mui/material'


const withRouter = (Component)  => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

const Login = (props) => {
 const [userName, setUser] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate()

const handleLogin = (e) => {
  e.preventDefault(e)
  props.dispatch(setAuthedUser(userName));
  console.log(userName);
  if (props.path === "/" && userName !== "") {
    navigate("/dashboard");
  }
};

const handleChange = (e) => {
  e.preventDefault();
  setUser(e.target.value);
  console.log(userName);
  console.log(e.target.value);
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
      <form type="submit" onSubmit={handleLogin}>
        <TextField
          type="email"
          variant="outlined"
          margin="normal"
          label="Email"
          // required
          fullWidth
          onChange={handleChange}
        >
        </TextField>
        <TextField
          type="password"
          variant="outlined"
          margin="normal"
          label="Password"
          // required
          fullWidth
        >
        </TextField>
        <Button
          sx={{
            mt: 2,
            borderColor: "orange",
            color: "orange"
          }}
          type="submit"
          variant="outlined"
          fullWidth
        >Login
        </Button>
      </form>
    </Container>
  );
}

const mapStateToProps = ({}, props) => {
  const path = props.router.location.pathname;
  return {
    path,
  };
};

export default withRouter(connect(mapStateToProps)(Login));
