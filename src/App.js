import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import { Route } from "react-router-dom";
import RegistrationForm from "./components/Forms/RegistrationForm";
import Login from "./components/Forms/LogIn";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/register-account" component={RegistrationForm} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/homepage" component={HomePage} />
    </div>
  );
}

export default App;
