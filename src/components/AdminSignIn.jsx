import React from "react";
import Button from "./Button";

export default function AdminSignIn() {
  const InputField = ({ name, type }) => {
    return (
      <div className="input">
        <input type={type} className="input__textfield" name={name} id={name} />
        <label for={name} className="input__textfield--label">
          {name}
        </label>
      </div>
    );
  };

  return (
    <div className="admin">
      <p className="admin__title">ADMIN</p>
      <form>
        <InputField name={"username"} type={"text"} />
        <InputField name={"password"} type={"password"} />
        <Button text={"Submit"} />
      </form>
    </div>
  );
}
