import React, { useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import Fade from "react-reveal/Fade";
import { signedInState, setSignIn, clearSignIn } from "../redux/signinSlice";
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "react-router";


function AdminSignIn({ history }) {
  // On change type state for sing-in inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [failedSignIn, setFailedSignIn] = useState(false);

  const connection = str => `${process.env.REACT_APP_API_CONNECTION}${str}`;
  // const isSignedIn = useSelector(signedInState);
  const dispatch = useDispatch();

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
        history.push('/');
      } 
   
    } catch (error) {
      if(error.response.status) {
        setFailedSignIn(true);
        console.log('Access Denied');
      }
      setIsLoading(false);
    }
    

  };

  const InputField = (name, type, fn) => (
    <div className="input">
      <input
        type={type}
        className="input__textfield"
        name={name}
        id={name}
        onChange={e => fn(e.target.value)}
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
          {InputField("username", "text", setUserName)}
          {InputField("password", "password", setPassword)}
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        {loading && <p>...loading</p>}
        {failedSignIn && <p>Access Denied</p>}
      </div>
    </Fade>
  );
}

export default withRouter(AdminSignIn);
