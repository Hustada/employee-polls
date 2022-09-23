import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from '../actions/shared'

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData())
  },[]);
  return <div>Employee Polls</div>
}

export default connect()(App);