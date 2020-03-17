import React, { useState } from "react";
import Axios from 'axios';
import Cookies from "js-cookie";

export default function AdminSignIn() {
  // On change type state for sing-in inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, isLoading] = useState(false);
  const connection = str => `${process.env.REACT_APP_API_CONNECTION}${str}`;


  const submitSignIn = async(e) => {
    e.preventDefault();

    const headerObject = {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      auth: {
        username: userName,
        password: password
      }
    };

    try {
      isLoading(true);
      const response = await Axios(connection("api/users"), headerObject);
      
      if (response.status === 200) {
        isLoading(false);
        Cookies.set(
          "authenticatedUser",
          JSON.stringify(
            {admin: true}
          ),
          { expires: 5 }
        )
        console.log(Cookies.getJSON("authenticatedUser"));
      }
    } catch (error) {
      isLoading(false);
        console.log(error.response.status)      
    }

  }

  const InputField = (name, type, fn) => (
    <div className="input">
      <input
        type={type}
        className="input__textfield"
        name={name}
        id={name}
        onChange={e => fn(e.target.value)}
      />
      <label for={name} className="input__textfield--label">
        {name}
      </label>
    </div>
  );

  return (
    <div className="admin">
      <p className="admin__title">ADMIN</p>
      <form onSubmit={e => submitSignIn(e)}>
        {InputField("username", "text", setUserName)}
        {InputField("password", "password", setPassword)}
        <button type="submit" className="button">
            Submit
        </button>
        {
          loading && <p>...loading</p>
        }
      </form>
    </div>
  );
}
