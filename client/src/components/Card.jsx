import React from "react";
// import { Plattform, PlattformContainer } from "./style";

const Card = ({ name, image, genres }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <img src={image} alt="not found" width="230px" height="135px" />
      <h3>Genres</h3>
      {genres?.map((gen) => (
        <p key={gen.id}>{gen}</p>
      ))}
      {/* <p>
        <b>plattforms</b>
      </p>
      <PlattformContainer>
        {plattforms?.map((plat) => (
          <Plattform key={plat.id}>{plat}</Plattform>
        ))}
      </PlattformContainer> */}
    </div>
  );
};

export default Card;
