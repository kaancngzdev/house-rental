import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from "../const/Const.js";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <div>
      <Slider {...settings}>
        {images.map((imageUrl, index) => (
          <div key={index} className="custom-slide">
            <img src={imageUrl} alt={`Slider Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
