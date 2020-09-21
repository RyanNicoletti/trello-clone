import React, { useState } from "react";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";
import Button from "../Button";
import { Link } from "react-router-dom";
import authApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState({ errorMessage: null });

  const handleSubmit = (e) => {
    e.preventDefault();

    authApiService
      .userLogin({ email, password })
      .then((res) => {
        props.history.push("/homepage");
        password.value = " ";
        TokenService.saveAuthToken(res.authToken);
      })
      .catch((res) => {
        return setErrorMessage({ errorMessage: res.error });
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="form-group">
            <div>
              <label htmlFor="login-email">Email</label>
            </div>
            <EmailInput
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <div>{error && <span>{error.errorMessage}</span>}</div>
          </div>

          <div className="form-group">
            <div>
              <label htmlFor="login-password">Password</label>
            </div>
            <PasswordInput
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </fieldset>
        <Button type="submit" theme="login-button">
          Log in
        </Button>
        <ul>
          <li>
            <Link to="/register-account">Create account</Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default LoginForm;
