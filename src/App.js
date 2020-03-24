import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Header from "./components/Header";
import ResourceList from "./components/ResourceList";
import BlogMain from "./components/BlogMain";
import AdminSignIn from "./components/AdminSignIn";
import { signedInState, setSignIn, clearSignIn } from "./redux/signinSlice";
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
// import { Counter } from './features/counter/Counter';

// ROUTER RESIDES HERE
// MAIN APP CONTAINER
function App() {
  const dispatch = useDispatch();
  const cookieState = Cookies.getJSON("authenticatedUser");

  useEffect(() => {
    if(cookieState) {
      return dispatch(setSignIn());
    }
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <div className="App">
          <div className="home">
            <div className="home__section--1">
              <Home />
            </div>
            <div className="home__section--2">
              <Header />
              <div className="home__section--3">
                <Route exact path="/" render={() => <BlogMain />} />
                <Route exact path="/signin" render={() => <AdminSignIn />} /> 
                <ResourceList />
              </div>
            </div>
          </div>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
