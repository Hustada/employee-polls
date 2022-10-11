import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Avatar,
} from '@mui/material';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { formatDate, formatQuestion } from '../utils/helpers';

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};


const ShowQuestion = (props) => {
  const question = props.questions[props.id];
  console.log(question);

  return (
  <Container>
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      p: 10 }
    }>
    <Typography variant="h5" >Poll By </Typography>
      <Avatar
        alt="Remy Sharp"
        src="./images/papa.jpeg"
        sx={{ width: 300, height: 300, alignItems: "center", m: 3}}
      />
      <Typography variant='h5'>Would You Rather?</Typography>
    </Box>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{
          borderColor: '1 px solid gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          borderRadius: 2,
          mb: 2
        }}
          border={1}
          borderColor="gray"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize={24}
        >
          <Typography variant="h6" sx={{ m: 1 }}>Be a moviestar?</Typography>
        </Box>
        <Button variant="contained" fullWidth sx={{ backgroundColor: "orange" }}>Click</Button>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box sx={{
          borderColor: '1 px solid gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          borderRadius: 2,
          mb: 2
        }}
          border={1}
          borderColor="gray"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize={24}
        >
          <Typography variant="h6" sx={{ m: 1 }}>Be the President?</Typography>
        </Box>
        <Button variant="contained" fullWidth sx={{ backgroundColor: "orange" }}>Click</Button>
      </Grid>
      <Grid item xs={6}>
        
      </Grid>
    </Grid>
  </Container>
  )
}

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  return {
    questions,
    id,
    users,
    authedUser,
  };
};

export default withRouter(connect(mapStateToProps)(ShowQuestion));