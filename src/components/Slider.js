import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from "../const/Const.js";

export default function SimpleSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const arrowStyles = {
    fontSize: "32px",
    color: "grey",
  };

  const arrowHoverStyles = {
    color: "#333",
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

      {/* Inline styles for slider arrows */}
      <style>{`
        .slick-prev, .slick-next {
          ${arrowStyles}
        }

        .slick-prev:hover, .slick-next:hover {
          ${arrowHoverStyles}
        }

        .slick-prev {
          left: 10px;
          z-index: 1; /* Ensure the left arrow is above the slides */
        }

        .slick-next {
          right: 10px;
          z-index: 1; /* Ensure the right arrow is above the slides */
        }
      `}</style>
    </div>
  );
}
