import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useFetch } from "../hooks/useFetch";
import Highlight from "react-highlight.js";

const testData = "Sed [c]this is code if c = 10 return c[/c] fringilla dignissim ultrices. Maecenas dignissim molestie augue, at mollis purus condimentum convallis. Nulla ut vulputate urna, ut consequat sem. Etiam volutpat erat ac est faucibus tincidunt. [p1]First paragraph is here.[/p1]Maecenas et elit purus. Fusce gravida lacinia est non interdum. Curabitur libero dolor, vestibulum non mollis a, mollis ac lacus. [c]this is code number 2 if c = 20 return c[/c]In at libero id sapien accumsan tempus vel eget nibh. Aliquam a sapien lectus. Cras vel viverra leo."

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
  const captureContent = (text, type) => {
    // Captures group between code tags [c][/c]
    const regex = /\[c]([\s\S]*?)\[\/c]/g;

    // Captures all group sections between p tags (ex.[p1][/p1])
    const paragraphRegex = /\[p[0-9]](.*?)\[\/p[0-9]]/g;

    let matched;

    if (type === "code") {
      matched = text.matchAll(regex);
    } else if (type === "paragraph") {
      matched = text.matchAll(paragraphRegex);
    }

    return [...matched];
  };

  console.log(captureContent(testData, "code"));

  // MAIN BLOG CONTENT
  const BlogContentMain = ({ data }) => {
    let description = data.description;
    let matchedCode = captureContent(description, "code");
    let matchedParagraph = captureContent(description, "paragraph");

    // Replaces captured portion of description
    if (matchedCode) description = description.replace(matchedCode[1], "");

    // HIGHLIGHTED CODE COMPONENT - Will highlight code from description.
    const HighlightCode = ({ matched }) => (
      <Highlight language={"javascript"} className="blog-main__code">
        {matched}
      </Highlight>
    );

    return (
      <div className="blog-main">
        <h1 className="blog-main__title">{data.title}</h1>
        <p className="blog-preview__description">{description}</p>
        {matchedCode && <HighlightCode matched={matchedCode[1]} />}
        {/* {matchedCode && <p className="blog-preview__description">{matchedAfter[1]}</p>} */}
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
