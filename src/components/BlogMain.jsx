import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function BlogMain() {
  const [openBlog, setOpenBlog] = useState(false);
  const [openBlogPreview, setOpenBlogPreview] = useState(true);

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
      <div className="blog-preview__container fadeInLeft">
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
            onClick={() => setOpenBlogPreview(false)}
          >
            &rarr;
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className="blog-preview">
      <CSSTransition
        in={openBlogPreview}
        timeout={300}
        classNames="blog"
        onExited={() => setOpenBlog(true)}
        unmountOnExit
      >
        <BlogPreviewMain />
      </CSSTransition>

      <CSSTransition
        in={openBlog}
        timeout={300}
        classNames="blogm"
        onExited={() => setOpenBlogPreview(true)}
        unmountOnExit
      >
        <BlogContentMain />
      </CSSTransition>
    </div>
  );
}
