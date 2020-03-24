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
  const [loading, isLoading] = useState(false);
  const connection = str => `${process.env.REACT_APP_API_CONNECTION}${str}`;
  // const isSignedIn = useSelector(signedInState);
  const dispatch = useDispatch();

  // SIGN-IN SUBMISSION
  const submitSignIn = async e => {
    e.preventDefault();

    const headerObject = {
      method: "get",
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
        dispatch(setSignIn());
        Cookies.set("authenticatedUser", JSON.stringify({ admin: true }), {
          expires: 5
        });
        history.push('/');
      } 
   
    } catch (error) {
      if(error.response.status === 401) {
        //TODO: CREATE REDUX STATE TO NOTATE DENIED ENTRY FOR OTHER COMPONENENTS

        console.log('Access Denied');
      }
      isLoading(false);
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
          {loading && <p>...loading</p>}
        </form>
      </div>
    </Fade>
  );
}

export default withRouter(AdminSignIn);
