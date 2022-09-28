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
      <Typography>New Quetsions</Typography>
      <Grid container spacing={2}>
      {props.questionIds.map((id) => (
         <QuestionCard id={id} />
      ))}
      </Grid>
    </Container>
   
  )
}

const mapStateToProps = ({ questions }) => ({
  questionIds: Object.keys(questions).sort(
    (a,b) => questions[b].timestamp = questions[a].timestamp
  ),
});

export default connect(mapStateToProps)(Dashboard);