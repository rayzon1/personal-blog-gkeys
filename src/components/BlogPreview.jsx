import React from "react";

export default function BlogPreview() {
  return (
    <div className="blog-preview">
      <p className="blog-preview__title">
        This is a blog title{" "}
        <span className="blog-preview__title--date">10.11.1986</span>
      </p>
      <p className="blog-preview__description">
        Morbi elementum faucibus nunc eget mollis. Etiam quis purus ac ligula porta condimentum. Proin nunc dui, varius at accumsan id, lobortis sed eros. Maecenas in semper urna. Nunc venenatis, metus at faucibus luctus, dolor ante sodales magna, ut aliquet est felis mattis nunc...
        <span className="blog-preview__description--right-arrow">&rarr;</span>
      </p>
    </div>
  );
}
