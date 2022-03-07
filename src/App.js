import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/Forms/RegistrationForm";
import LoginForm from "./components/Forms/LogIn";
import HomePage from "./components/HomePage/HomePage";
import BoardPage from "./components/BoardPage/BoardPage";
import Header from "./components/Header/Header";
import IdleService from "./services/idle-service";
import TokenService from "./services/token-service";
import authApiService from "./services/auth-api-service";

const App = () => {
  // if user goes idle, remove auth token, log user out, and clear call backs to monitor if user is idle or not
  const logIdleUserOut = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallback();
    IdleService.clearCallbackEvents();
  };

  // when user is logged in, monitor whether or not user is idle, if idle log user out
  useEffect(() => {
    IdleService.setIdleCallback(logIdleUserOut);
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        authApiService.postRefreshToken();
      });
    }
    // cleanup when app unmounts-stop event listeners that auto logout user if idle and remove refresh endpoint request
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
      <Routes>
        <Route path="/" component={LandingPage} />
        <Route path="/register-account" component={RegistrationForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/homepage" component={HomePage} />
        <Route path="/boardpage/:boardId" component={BoardPage} />
      </Routes>
    </div>
  );
};

export default App;
