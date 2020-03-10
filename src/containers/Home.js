import React, { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import NavigationList from "../components/NavigationList";
import BlogMain from "../components/BlogMain";
import ResourceList from "../components/ResourceList";
import { CSSTransition } from "react-transition-group";

export default function Home() {
  // State determines whether navigation list will show or not
  const [isChecked, setIsChecked] = useState(false);

  // const connection = str => `${process.env.REACT_APP_API_CONNECTION}${str}`

  // const {response, error, isLoading} = useFetch(connection("api/posts"), {method: "get"});
  // console.log(response);

  return (
    <div className="home">
      <div className="home__section--1">
        <Navigation setIsChecked={setIsChecked} />
        <CSSTransition
          in={isChecked}
          timeout={400}
          classNames="nav"
          unmountOnExit
        >
          <NavigationList />
        </CSSTransition>
      </div>
      <div className="home__section--2">
        <Header />
        <div style={{ display: "flex", overflow: "hidden" }}>
          <BlogMain/>
          <ResourceList />
        </div>
      </div>
    </div>
  );
}
