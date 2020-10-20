import React, { useState } from "react";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";
import Button from "../Button";
import { Link } from "react-router-dom";
import authApiService from "../../services/auth-api-service";
import "./login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState({ errorMessage: null });

  const handleSubmit = (e) => {
    e.preventDefault();

    authApiService
      .userLogin({ email, password })
      .then((res) => {
        window.location = "/homepage";
        console.log(res);
      })
      .catch((res) => {
        return setErrorMessage({ errorMessage: res.error });
      });
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <div className="login-flex-container">
          <h1 className="login-header">Log in to Trello Clone</h1>
          <div className="form-group">
            <EmailInput
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <div>{error && <span>{error.errorMessage}</span>}</div>
          </div>

          <div className="form-group">
            <PasswordInput
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <Button type="submit" theme="login-button">
            Log in
          </Button>

          <Link className="route-to-registration" to="/register-account">
            Sign up for an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
