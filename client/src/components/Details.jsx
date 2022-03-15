import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { gameDetails } from "../redux/actions";
import "./styles.css";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gameDetails(id));
  }, [dispatch]);
  const gameDet = useSelector((state) => state.detail);
  console.log("Game details...", gameDet);

  return (
    <div className="background">
      <div className="details-container">
        <Link to="/home">
          <button> 🔙 Back 🔙</button>
        </Link>
        <h1>{gameDet[0]?.name}</h1>
        <img src={gameDet[0]?.image} width="650px" />
        <h3>Description: </h3>
        <p
          style={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: `${gameDet[0]?.description}` }}
        />
        <div style={{ display: "inline-flex" }}>
          <div>
            <h3>Rating</h3>
            <p>
              <b>{gameDet[0]?.rating}</b>
            </p>
          </div>
          <div style={{ marginLeft: "1.5rem" }}>
            <h3>Release Date</h3>
            <b>{gameDet[0]?.releaseDate}</b>
          </div>
        </div>
        <h3>Genres</h3>
        {gameDet[0]?.genres?.map((gen) => (
          <p key={gen.id} style={{ display: "inline-flex", padding: "0.5rem" }}>
            {gen}
          </p>
        ))}
        <h3>Plattforms</h3>
        {gameDet[0]?.plattforms?.map((plat) => (
          <p
            style={{ display: "inline-flex", padding: "0.5rem" }}
            key={plat.id}
          >
            {plat}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Details;
