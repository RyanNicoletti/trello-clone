import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import { Route, Switch } from "react-router-dom";
import RegistrationForm from "./components/Forms/RegistrationForm";
import LoginForm from "./components/Forms/LogIn";
import HomePage from "./components/HomePage";
import ProjectBoard from "./components/ProjectBoard";
import Header from "./components/Header";
import IdleService from "./services/idle-service";
import TokenService from "./services/token-service";
import authApiService from "./services/auth-api-service";

function App() {
  const logIdleUserOut = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallback();
    IdleService.clearCallbackEvents();
  };
  useEffect(() => {
    IdleService.setIdleCallback(logIdleUserOut);
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        authApiService.postRefreshToken();
      });
    }
    // cleanup when app unmounts-stop event listeners that auto logout user and remove refresh endpoint request
    return function clearEventListenersAndCallBack() {
      IdleService.clearCallbackEvents();
      TokenService.clearCallback();
    };
  });
  return (
    <div className="App">
      <header className="app-header">
        <Header />
      </header>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          exact
          path="/register-account"
          component={RegistrationForm}
        />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/homepage" component={HomePage} />
        {/* props.params.id is passed to projectboard params says its a param in url,
         named it id so its .id */}
        <Route path="/project-board/:id" component={ProjectBoard} />
      </Switch>
    </div>
  );
}

export default App;
