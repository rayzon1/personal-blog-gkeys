import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Header from "./components/Header";
import ResourceList from "./components/ResourceList";
import BlogMain from "./components/BlogMain";
// import { Counter } from './features/counter/Counter';

// ROUTER RESIDES HERE
// MAIN APP CONTAINER
function App() {
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
              <div style={{ display: "flex", overflow: "hidden" }}>
                <Route exact path="/" render={() => <BlogMain />} /> 
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
