import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from '../actions/shared'
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import "../App.css"

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData())
  },[]);

  return (
    <div>
      <Nav />
      {props.loading === true ? null : <Dashboard />}
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect()(App);