import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useFetch } from "../hooks/useFetch";
import Highlight from "react-highlight.js";

export default function BlogMain() {
  const [openBlog, setOpenBlog] = useState(false);
  const [openBlogPreview, setOpenBlogPreview] = useState({
    open: true,
    id: null,
  });

  // DB POST GET ALL COURSES - Hook useFetch will get response from api/db.
  const connection = (str) => `${process.env.REACT_APP_API_CONNECTION}${str}`;
  const { response, error, isLoading } = useFetch(connection("api/posts"), {
    method: "get",
  });

  // TRUNCATE BLOG PREVIEW - Shortens blog preview text and appends ellipse to preview.
  const truncate = (str, char) => {
    if (str.length > char) {
      return str.substring(0, char) + "...";
    } else {
      return str;
    }
  };

  // Capture code content as well as p1, p2, etc..
  // Capture paragraph depending on input 'type' param
  const captureTextContent = (text) => {
    const paragraphRegex = /\[p[0-9]+](.*?)\[\/p[0-9]+]|\[c](.*?)\[\/c]/g;
    return [...text.matchAll(paragraphRegex)];
  };

  // MAIN BLOG CONTENT
  const BlogContentMain = ({ data }) => {
    const description = data.description;
    const code = data.code;
    const matchedContent = captureTextContent(description);

    const replaceCapturedText = (array, status) => {
      // Take in matched code array - (array of arrays)
      // captures tagged[p1] texts as well as plain text in 
      // seperate arrays.
      let taggedText;
      let capturedText;
      try {
        if (array) {
          taggedText = array.map((data) => data[0]);
          capturedText = array.map((data) => data[1] || data[2]);
        } else {
          throw new Error("Needs array");
        }
      } catch (error) {
        console.log(error);
      }

      if (status === "tagged") {
        return taggedText;
      } else if (status === "text") {
        return capturedText;
      }
    };

    // TAKES IN ARRAY AND CREATES MAIN BLOG CONTENT COMPONENT
    const DisplayMainBlogContent = ({ data, code }) => {
      // COMBINED DESCRIPTIONS AND CODE SNIPPETS TO DISPLAY IN MAIN BLOG
      const combinedDescriptionsCode = [];
      const codeSnippets = /\[c](.*?)\[\/c]/g;
      const paragraphSnippets = /\[p[0-9]+](.*?)\[\/p[0-9]+]/g;

      let codeCounter = 0;

      data.map((d, i) => {
        if (d.match(paragraphSnippets)) {
          combinedDescriptionsCode.push(
            <p className="blog-preview__description" key={i}>
              {replaceCapturedText(matchedContent, "text")[i]}
            </p>
          );
        } else if (d.match(codeSnippets)) {
          combinedDescriptionsCode.push(
            <Highlight language={"javascript"} className="blog-main__code" key={i}>
              {code[codeCounter]}
            </Highlight>
          );
          return (codeCounter += 1);
        }
        return null;
      });

      return combinedDescriptionsCode.map((data, index) => <>{data}</>);
    };

    return (
      <div className="blog-main">
        <h1 className="blog-main__title">{data.title}</h1>

        <DisplayMainBlogContent
          data={replaceCapturedText(matchedContent, "tagged")}
          code={code}
        />

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
      <div className="blog-preview__container">
        <p className="blog-preview__title">
          {data.title}
          <span className="blog-preview__title--date">10.11.1986</span>
        </p>
        <p className="blog-preview__description">
          {truncate(captureTextContent(data.description)[0][1], 200)}
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
        response.map((data, index) => (
          <div key={index}>
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
          </div>
        ))
      )}
    </div>
  );
}
