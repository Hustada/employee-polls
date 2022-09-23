import { connect } from 'react-redux'

const Dashboard = (props) => {
  console.log(props);
  return (
    <div>
      <h3>New Questions</h3>
      <ul className='question-list'>
        {props.questionIds.map((id) => (
          <li key={id}>
            <div>Question ID: {id}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ questions }) => ({
  questionIds: Object.keys(questions).sort(
    (a,b) => questions[b].timestamp = questions[a].timestamp
  ),
});

export default connect(mapStateToProps)(Dashboard);