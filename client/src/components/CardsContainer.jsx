import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./styles.css";

const CardsContainer = ({ games }) => {
  return (
    <div className="container-cards">
      {games?.map((game) => (
        <Link
          to={`/home/${game.id}`}
          key={game.id}
          style={{ textDecoration: "none" }}
        >
          <Card
            key={game.id}
            genres={game.genres}
            name={game.name}
            image={game.image}
          />
        </Link>
      ))}
    </div>
  );
};

export default CardsContainer;
