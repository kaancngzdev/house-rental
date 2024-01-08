import React, { useState } from "react";
import MediaCard from "../components/Card.js";
import "../styles.css";
import { cardData } from "../const/Const.js";
import NestedList from "../components/Filter.js";

export default function Houses() {
  const customCardStyle = {
    backgroundColor: "#eaf7f7",
    border: "2px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const [filteredProperties, setFilteredProperties] = useState(cardData);

  return (
    <div className="Houses">
      <div className="filter-container">
        <NestedList setFilteredProperties={setFilteredProperties} />
      </div>

      {filteredProperties.map((property) => (
        <MediaCard
          key={property.id}
          customStyle={customCardStyle}
          {...property}
        />
      ))}
    </div>
  );
}
