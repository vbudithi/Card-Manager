import React from "react";
import "./cities.css";

const Cities = ({ cities }) => {
  const renderCities = cities.map((city, i) => {
    return (
      <div className="card">
        <div className="card-header">{city}</div>
      </div>
    );
  });
  return <ul>{renderCities}</ul>;
};

export default Cities;
