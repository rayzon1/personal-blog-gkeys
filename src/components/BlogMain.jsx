import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useFetch } from "../hooks/useFetch";
import Highlight from "react-highlight.js";

export default function BlogMain() {
  const [openBlog, setOpenBlog] = useState(false);
  const [openBlogPreview, setOpenBlogPreview] = useState({
    open: true,
    id: null
  });

  // DB POST GET ALL COURSES - useFetch will get response from api/db
  const connection = str => `${process.env.REACT_APP_API_CONNECTION}${str}`;
  const { response, error, isLoading } = useFetch(connection("api/posts"), {
    method: "get"
  });

  // TRUNCATE BLOG PREVIEW - Shortens blog preview text and appends ellipse
  const truncate = (str, char) => {
    if (str.length > char) {
      return str.substring(0, char) + "...";
    } else {
      return str;
    }
  };

  // MAIN BLOG CONTENT
  const BlogContentMain = ({ data }) => {
    return (
      <div className="blog-main">
        <h1 className="blog-main__title">{data.title}</h1>
        {data.code && (
          <Highlight language={"javascript"} className="blog-main__code">
            {data.code}
          </Highlight>
        )}
        <span
          className="blog-preview__description--right-arrow"
          onClick={() => setOpenBlog(false)}
        >
          &larr;
        </span>
      </div>
    );
  };

  // MAIN BLOG PREVIEW
  const BlogPreviewMain = ({ data }) => {
    return (
      <div className="blog-preview__container fadeInLeft">
        <p className="blog-preview__title">
          {data.title}
          <span className="blog-preview__title--date">10.11.1986</span>
        </p>
        <p className="blog-preview__description">
          {truncate(data.description, 200)}
          <span
            className="blog-preview__description--right-arrow"
            onClick={() => setOpenBlogPreview({ open: false, id: data._id })}
          >
            &rarr;
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className="blog-preview">
      {error ? (
        <p>{`Error ${error}`}</p>
      ) : isLoading ? (
        <p>...Loading</p>
      ) : (
        response &&
        response.map(data => (
          <>
            <CSSTransition
              in={openBlogPreview.open}
              timeout={300}
              classNames="blog"
              onExited={() => setOpenBlog(true)}
              unmountOnExit
            >
              <BlogPreviewMain data={data} />
            </CSSTransition>

            <CSSTransition
              in={openBlog && data._id === openBlogPreview.id}
              timeout={300}
              classNames="blogm"
              onExited={() => setOpenBlogPreview({ open: true, index: null })}
              unmountOnExit
            >
              <BlogContentMain data={data} />
            </CSSTransition>
          </>
        ))
      )}
    </div>
  );
}
