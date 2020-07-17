import React from "react";

const Button = (props) => {
  return <button classname={"btn" + props.theme}>{props.children}</button>;
};

export default Button;
