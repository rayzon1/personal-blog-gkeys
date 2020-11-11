import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Header from "./components/Header";
import ResourceList from "./components/ResourceList";
import BlogMain from "./components/BlogMain";
import BlogPostForm from "./components/BlogPostForm";
import AdminSignIn from "./components/AdminSignIn";
import { setSignIn } from "./redux/signinSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import PrivateRoute from "./PrivateRoute";

// ROUTER RESIDES HERE
// MAIN APP CONTAINER
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cookieState = Cookies.getJSON("authenticatedUser");
    if (cookieState) {
      dispatch(setSignIn());
    }
    return () => {
      console.log("clean up...")
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <>
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
                  <PrivateRoute
                    exact
                    path="/blogpost"
                    component={BlogPostForm}
                  />
                  <ResourceList />
                </div>
              </div>
            </div>
          </div>
        </>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
