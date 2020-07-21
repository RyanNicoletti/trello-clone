import React, { useState } from "react";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";
import Button from "../Button";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
      <Button theme="registration-button">Log in</Button>
      <ul>
        <li>
          <Link to="/register-account">Create account</Link>
        </li>
      </ul>
    </form>
  );
};

export default RegistrationForm;