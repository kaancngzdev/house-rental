import React from "react";
import MediaCard from "../components/Card.js";
import "../styles.css";
import { cardData } from "../const/Const.js";
export default function AdminHouses() {
  const customCardStyle = {
    backgroundColor: "#eaf7f7",
    border: "2px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="Houses">
      {cardData.map((card) => (
        <MediaCard key={card.id} customStyle={customCardStyle} {...card} />
      ))}
    </div>
  );
}
