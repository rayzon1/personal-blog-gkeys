import React, { useState } from "react";
import Navigation from "../components/Navigation";
import NavigationList from "../components/NavigationList";
import { CSSTransition } from "react-transition-group";

export default function Home() {
  // State determines whether navigation list will show or not
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <Navigation setIsChecked={setIsChecked} />
      <CSSTransition
        in={isChecked}
        timeout={400}
        classNames="nav"
        unmountOnExit
      >
        <NavigationList />
      </CSSTransition>
    </>
  );
}
