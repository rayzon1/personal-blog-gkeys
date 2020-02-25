import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
// import { Counter } from './features/counter/Counter';

// ROUTER RESIDES HERE
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className="App">
          <Route
            exact
            path="/"
            render={() => (
              <Home />
            )}
          />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
