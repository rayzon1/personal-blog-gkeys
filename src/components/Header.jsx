import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signedInState, clearSignIn } from "../redux/signinSlice";
import Cookies from "js-cookie";
import { withRouter } from "react-router";

function Header({ history }) {
  const signedIn = useSelector(signedInState);
  const dispatch = useDispatch();

  const signOut = () => {
    Cookies.remove("authenticatedUser");
    dispatch(clearSignIn());
    history.push('/');
  }
 

  return (
    <div className="header">
      <h2 className="header__title">REACT BLOG</h2>
      <div className="header__sub-header">
        {signedIn && (
          <span className="header__sub-header--admin">
            admin -{" "}
            <span className="header__sub-header--sign-out" onClick={() => signOut() }>sign out</span>
          </span>
        )}
        <span className="header__sub-header--subtitle">
          a blog by Gerardo Keys
        </span>
      </div>
    </div>
  );
}

export default withRouter(Header);
