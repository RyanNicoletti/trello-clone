import React, { useState } from "react";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";
import Button from "../Button";
import ConfirmPasswordInput from "./Inputs/ConfirmPasswordInput";
import { Link } from "react-router-dom";
import authApiService from "../../services/auth-api-service";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newUser = { email_address: email, password: password };
    authApiService.postUser(newUser);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="form-group">
          <div>
            <label htmlFor="registration-email">Email</label>
          </div>
          <EmailInput
            value={email}
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
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

        <div classname="form-group">
          <div>
            <label htmlFor="registration-confirmPassword">
              Confirm Password
            </label>
          </div>
          <ConfirmPasswordInput
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </fieldset>
      <Button
        theme="registration-button"
        type="submit"
        className="account-registration-button"
      >
        Create Account
      </Button>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </form>
  );
};

export default RegistrationForm;
