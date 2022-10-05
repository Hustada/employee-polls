import { connect } from 'react-redux'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import QuestionCard from './QuestionCard';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import { randomDate } from '../utils/helpers';

const Dashboard = (props) => {
  return (
    <Container sx={{ mt: 5 }} >
      <Typography 
        variant="h4" 
        sx={
          { 
            textAlign: 'center',
            padding: '10px',
            mb: 3, 
            border: 1,
            borderColor: 'orange',
            borderRadius: 1
          }}>
            New Questions
      </Typography>
      <Grid container spacing={2}>
      {props.questionIds.map((id) => (
         <QuestionCard id={id} key={id}/>
      ))}
      </Grid>
      <Typography 
        variant="h4" 
        sx={
          { 
            textAlign: 'center',
            padding: '10px',
            mt: 3, 
            border: 1,
            borderColor: 'orange' ,
            borderRadius: 1
          }}>
            Done
      </Typography>
    </Container>
   
  )
}

const mapStateToProps = ({ questions }) => ({
  questionIds: Object.keys(questions).sort(
    (a,b) => questions[b].timestamp = questions[a].timestamp
  ),
});

export default connect(mapStateToProps)(Dashboard);