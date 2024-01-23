import React, { Component } from "react";
import Slider from "react-slick";
import MediaCard from "../components/Card.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardSlider = ({ cardData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const customCardStyle = {
    backgroundColor: '#eaf7f7',
    border: '2px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div>
      <Slider {...settings}>
        {cardData.map((card) => (
          <MediaCard key={card.id} customStyle={customCardStyle} image= {card.imageUrl} squareMeters= {card.area} numberOfRooms= {card.numRooms} {...card} />
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;