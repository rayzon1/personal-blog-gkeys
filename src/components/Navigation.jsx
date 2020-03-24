import React from "react";

export default function Navigation({ setIsChecked }) {
  return (
    <div className="navigation">
      <h2 className="navigation__title">MENU</h2>
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      />
      <label
        htmlFor="navi-toggle"
        className="navigation__button"
        onClick={() => setIsChecked(prev => !prev)}
      >
        <span className="navigation__icon">&nbsp;</span>
      </label>
    </div>
  );
}
