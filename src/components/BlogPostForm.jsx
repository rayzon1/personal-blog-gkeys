import React, { useState } from "react";

/**
 * Component will be the main blog post submission form for the admin.
 * This is where the blog will be made and inputed to be saved to the db.
 */
export default function BlogPostForm() {

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  // Submit post to server.
  const submitPost = () => {
    // Gather all state information
    // Create post submission object/options
    // useFetch hook
    if (date || title || summary === "") {
      console.log('please input values...')
    } else {
      console.log('submitted...');
    }
    
  }

  // Input sections for blog post form.
  const blogPost = (type, name, label, state) => (
    <div className="blog-post__form__section">
      <input
        type={type}
        id={name}
        className={`blog-post__form__section--${name}`}
        onChange={e => state(e.target.value)}
      />
      <label htmlFor={name} className="blog-post__form__section--label">
        {label}
      </label>
    </div>
  );

  return (
    <div className="blog-post">
      <h1 className="blog-post__title">This is the admins blog post form</h1>
      <form className="blog-post__form">
        {blogPost("date", "date", "Date", setDate)}
        {blogPost("text", "title", "Title", setTitle)}

        <div className="blog-post__form__section">
          <textarea
            id="summary"
            className="blog-post__form__section--summary"
            onChange={e => setSummary(e.target.value)}
          />
          <label htmlFor="summary" className="blog-post__form__section--label">
            Summary
          </label>
        </div>

      </form>
      <button type="submit" onClick={() => submitPost()}>Click Me.</button>
    </div>
  );
}
