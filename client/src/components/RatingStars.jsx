import React from "react";
import star from "../img/mario-star.png";
import "./styles.css";

const RatingStars = ({ rating }) => {
  return (
    <div style={{ display: "inline-flex" }}>
      <label className="ratingButton">
        <input type="radio" value="1" name="rating" onChange={rating} id="1" />
        <img src={star} width="120" />
      </label>
      <label className="ratingButton">
        <input type="radio" value="2" name="rating" onChange={rating} id="2" />
        <img src={star} width="120" />
      </label>
      <label className="ratingButton">
        <input type="radio" value="3" name="rating" onChange={rating} id="3" />
        <img src={star} width="120" />
      </label>
      <label className="ratingButton">
        <input type="radio" value="4" name="rating" onChange={rating} id="4" />
        <img src={star} width="120" />
      </label>
      <label className="ratingButton">
        <input type="radio" value="5" name="rating" onChange={rating} id="5" />
        <img src={star} width="120" />
      </label>
    </div>
  );
};

export default RatingStars;
