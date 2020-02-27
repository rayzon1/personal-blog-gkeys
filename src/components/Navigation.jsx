import React from "react";

export default function Navigation({ checkBoxRef }) {
  return (
    <div className="navigation">
      <h2 className="navigation__title">MENU</h2>
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
        ref={checkBoxRef}
      />
      <label for="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>

    </div>
  );
}
