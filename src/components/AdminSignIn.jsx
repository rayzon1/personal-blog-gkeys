import React, { useState, createRef, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import Fade from "react-reveal/Fade";
import { setSignIn } from "../redux/signinSlice";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";

function AdminSignIn({ history }) {
  // On change type state for user inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [failedSignIn, setFailedSignIn] = useState(false);

  // Refs for user inputs
  const userInput = createRef();
  const passInput = createRef();

  const connection = str => `${process.env.REACT_APP_API_CONNECTION}${str}`;
  const dispatch = useDispatch();

  // Side-effect will clear input fields upon denied access
  useEffect(() => {
    const clearFields = () => {
      userInput.current.value = "";
      passInput.current.value = "";
      userInput.current.focus();
    };
    if (failedSignIn) {
      clearFields();
    }
    return () => {
      console.log("unmounted");
    };
  }, [failedSignIn]);

  // SIGN-IN SUBMISSION - Cookie sets admin object to true.
  // Admin object is used by other components to detect sign in.
  const submitSignIn = async e => {
    e.preventDefault();
    setFailedSignIn(false);

    const headerObject = {
      method: "get",
      auth: {
        username: userName,
        password: password
      }
    };

    try {
      setIsLoading(true);
      const response = await Axios(connection("api/users"), headerObject);
      if (response.status === 200) {
        setIsLoading(false);
        dispatch(setSignIn());
        Cookies.set("authenticatedUser", JSON.stringify({ admin: true }), {
          expires: 5
        });
        history.go(-1);
      }
    } catch (error) {
      if (error.response.status) {
        setFailedSignIn(true);
        console.log("Access Denied");
      }
      setIsLoading(false);
    }
  };

  // FAILED SIGN-IN COMPONENT - This will display a tooltip with error for failed sign-in.
  const FailedSignIn = () => {
    return (
      <div className="failedSignIn">
        <p className="failedSignIn__primary-message">Access Denied</p>
        <p className="failedSignIn__secondary-message">Please try again</p>
      </div>
    )
  } 

  // INPUT FIELD COMPONENT - Input function component will create needed input fields.
  const InputField = (name, type, fn, ref) => (
    <div className="input">
      <input
        type={type}
        className="input__textfield"
        name={name}
        id={name}
        onChange={e => fn(e.target.value)}
        ref={ref}
      />
      <label htmlFor={name} className="input__textfield--label">
        {name}
      </label>
    </div>
  );

  return (
    <Fade left>
      <div className="admin">
        <p className="admin__title">ADMIN</p>
        <form onSubmit={e => submitSignIn(e)}>
          {InputField("username", "text", setUserName, userInput)}
          {InputField("password", "password", setPassword, passInput)}
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        {loading && <p>...loading</p>}
        {failedSignIn && <FailedSignIn />}
      </div>
    </Fade>
  );
}

export default withRouter(AdminSignIn);
