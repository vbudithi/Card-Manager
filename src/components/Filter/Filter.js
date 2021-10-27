import React from "react";
import "./Filter.css";

const Filter = ({ countries, active, onClickHandler }) => {
  const btnFilter = countries.map((country) => {
    return (
      <button
        key={country}
        onClick={() => onClickHandler(country)}
        className={active === country ? "active" : ""}
      >
        {country}
      </button>
    );
  });
  return <div>{btnFilter}</div>;
};

export default Filter;
