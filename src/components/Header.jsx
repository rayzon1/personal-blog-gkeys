import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signedInState, clearSignIn } from "../redux/signinSlice";
import Cookies from "js-cookie";

export default function Header() {
  const signedIn = useSelector(signedInState);
  const dispatch = useDispatch();

  const signOut = () => {
    Cookies.remove("authenticatedUser");
    dispatch(clearSignIn());
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
