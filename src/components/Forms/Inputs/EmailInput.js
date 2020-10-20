import React from "react";

const EmailInput = ({ value, handleChange }) => {
  return (
    <input
      id="registration-email"
      type="email"
      name="email"
      value={value}
      onChange={handleChange}
      placeholder="Enter email"
      className="email-input"
      required
    />
  );
};

export default EmailInput;
