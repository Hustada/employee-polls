import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from '../actions/shared'
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import Login from "./Login";
import "../App.css"
import LoadingBar from "react-redux-loading-bar";
import ShowQuestion from "./ShowQuestion";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData())
  },[]);

  return (
    <div>
      <LoadingBar />
        <Nav />
      {props.loading === true ? null : (
        <Routes>
          <Route path="/question/" exact element={ <ShowQuestion />} />
          <Route path="/" exact element={ <Login /> } />
          <Route path="/home" exact element={<Dashboard />} />
        </Routes>
      )}
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect()(App);