import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
// import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import LandingPage from "../../routes/LandingPage";

import LoginPage from "../../routes/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage";

class App extends Component {
  state = { hasError: false };

  render() {
    return (
      <div className="App">
        <header className="App__header">Header</header>
        <main className="App__main">
          {this.state.hasError && (
            <p className="red">Something went wrong. Please try again later.</p>
          )}
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <PublicOnlyRoute path={"/login"} component={LoginPage} />
            <PublicOnlyRoute path={"/register"} component={RegistrationPage} />
          </Switch>
        </main>
      </div>
    );
  }
}
export default App;
