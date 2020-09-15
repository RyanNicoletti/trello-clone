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
  const [errorMessage, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    authApiService
      .userLogin({ email, password })
      .then((res) => {
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        props.history.push("./homepage");
      })
      .catch((res) => {
        setError(res.error);
        console.log(errorMessage);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="form-group">
          <div>
            <label htmlFor="registration-email">Email</label>
          </div>
          <EmailInput
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div>
            <label htmlFor="registration-password">Password</label>
          </div>
          <PasswordInput
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </fieldset>
      <Button type="submit" theme="registration-button">
        Log in
      </Button>
      <ul>
        <li>
          <Link to="/register-account">Create account</Link>
        </li>
      </ul>
    </form>
  );
};

export default LoginForm;
