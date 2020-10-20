import React from "react";

const PasswordInput = ({ value, handleChange, placeholder }) => {
  return (
    <input
      id="registration-password"
      type="password"
      name="password"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="pw-input"
      required
    />
  );
};

export default PasswordInput;
