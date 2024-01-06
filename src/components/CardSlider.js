import React, { Component } from "react";
import Slider from "react-slick";
import MediaCard from "../components/Card.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class CardSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const customCardStyle = {
      backgroundColor: "#eaf7f7",
      border: "2px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    };

    const cardData = [
      {
        id: 1,
        description: "A beautiful modern apartment with stunning views.",
        propertyType: "Apartment",
        numberOfRooms: 2,
        squareMeters: 120,
        price: 5000,
        image: require("../assets/images/card/h1p1.jpg"),
        title: "house1",
      },
      {
        id: 2,
        description: "A beautiful modern apartment with stunning views.",
        propertyType: "Apartment",
        numberOfRooms: 2,
        squareMeters: 120,
        price: 5000,
        image: require("../assets/images/card/h1p1.jpg"),
        title: "house1",
      },
    ];
    return (
      <div>
        <Slider {...settings}>
          {cardData.map((card) => (
            <MediaCard key={card.id} customStyle={customCardStyle} {...card} />
          ))}

          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
