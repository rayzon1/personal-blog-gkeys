import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function BlogMain() {
  const [openBlog, setOpenBlog] = useState(false);

  const BlogContentMain = () => {
    return (
      <div className="blog-main">
        <h1 className="blog-main__title">Blog Main</h1>
        <span
          className="blog-preview__description--right-arrow"
          onClick={() => setOpenBlog(false)}
        >&larr;</span>
      </div>
    );
  };

  const BlogPreviewMain = () => {
    return (
      <div className="blog-preview__container">
        <p className="blog-preview__title">
          This is a blog title{" "}
          <span className="blog-preview__title--date">10.11.1986</span>
        </p>
        <p className="blog-preview__description">
          Morbi elementum faucibus nunc eget mollis. Etiam quis purus ac ligula
          porta condimentum. Proin nunc dui, varius at accumsan id, lobortis sed
          eros. Maecenas in semper urna. Nunc venenatis, metus at faucibus
          luctus, dolor ante sodales magna, ut aliquet est felis mattis nunc...
          <span
            className="blog-preview__description--right-arrow"
            onClick={() => setOpenBlog(true)}
          >
            &rarr;
          </span>
        </p>
      </div>
    );
  };


  //TODO: CREATE A STATE FOR EACH COMPONENT TO CREATE A SMOOTHER TRANSITION
  return (
    <div className="blog-preview">
      <CSSTransition
        in={!openBlog}
        timeout={300}
        classNames="blog"
        unmountOnExit
      >
        <BlogPreviewMain />
      </CSSTransition>

      <CSSTransition
        in={openBlog}
        timeout={300}
        classNames="blogm"
        unmountOnExit
      >
        <BlogContentMain />
      </CSSTransition>
    </div>
  );
}
