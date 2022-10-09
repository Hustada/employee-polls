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
  },[props]);

  return (
    <div>
      <LoadingBar />
        <Nav />
        {props.loading === true ? null : (
        <Routes>
          <Route path="/questions/:id" element={ <ShowQuestion />} />
          <Route path="/" element={ <Login /> } />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      )}
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loggedIn: !(authedUser === null),
  };
};

export default (connect(mapStateToProps)(App));