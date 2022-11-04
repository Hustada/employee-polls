import React from 'react'
import { 
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const fourOfour = () =>{
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  return (
    <Container 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
    <Typography variant='h3' sx={{ mt: 5 }}>
      PAGE NOT FOUND
    </Typography>
    <Typography variant='body1'>
      <Button onClick={fourOfour}>Click here to Login</Button>
    </Typography>
    </Container>
  )
}

export default NotFound