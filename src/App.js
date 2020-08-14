import React from "react";
import LandingPage from "./components/LandingPage";
import { Route, Switch } from "react-router-dom";
import RegistrationForm from "./components/Forms/RegistrationForm";
import Login from "./components/Forms/LogIn";
import HomePage from "./components/HomePage";
import ProjectBoard from "./components/ProjectBoard";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          exact
          path="/register-account"
          component={RegistrationForm}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/homepage" component={HomePage} />
        {/* props.params.id is passed to projectboard params says its a param in url,
         named it id so its .id */}
        <Route path="/project-board/:id" component={ProjectBoard} />
      </Switch>
    </div>
  );
}

export default App;
