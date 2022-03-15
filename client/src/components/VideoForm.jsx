import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGenres, postVideogame } from "../redux/actions";
import RatingStars from "./RatingStars";
import "./styles.css";

const plattforms = [
  "PC",
  "PlayStation",
  "Xbox",
  "Nintendo Switch",
  "iOS",
  "Android",
  "Nintendo",
  "PS Vita",
  "PSP",
  "Wii",
  "GameCube",
  "Game Boy",
  "SNES",
  "NES",
  "Commodore",
  "Atari",
  "Genesis",
  " SEGA",
  "Dreamcast",
  "3DS",
  "Game Gear",
  "Neo Geo",
];

const VideoForm = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    genres: [],
    plattforms: [],
    image: "",
    rating: 0.0,
  });

  //dispatch
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    console.log("valor del event de acuerdo al input", event.target.value);
    // console.log(typeof event.target.value);
  };
  const selectGenre = (event) => {
    setInput({
      ...input,
      genres: [...input.genres, event.target.value],
    });
  };

  const selectPlattform = (event) => {
    setInput({
      ...input,
      plattforms: [...input.plattforms, event.target.value],
    });
  };
  const selectRating = (event) => {
    setInput({
      ...input,
      rating: event.target.value,
    });
    console.log("Valor de los botones radio, ", event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.name && input.description) {
      console.log(input);
      dispatch(postVideogame(input));
      alert("Game Created Successfully!!");
      setInput({
        name: "",
        description: "",
        rating: 0.0,
        genres: [],
        plattforms: [],
        image: "",
        releaseDate: "",
      });
    }
  };

  return (
    <div className="form-container">
      <Link to="/home">
        <button>back</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          <h4>Videogame Name:</h4>
        </label>
        <br />
        <input
          value={input.name}
          name="name"
          type="text"
          placeholder="type here..."
          required
          onChange={handleChange}
          size="100"
        />
        <br />
        <label>
          <h4>Image Url:</h4>
        </label>
        <br />
        <input
          size="100"
          value={input.image}
          name="image"
          type="text"
          placeholder="url..."
          required
          onChange={handleChange}
        />
        <br />
        <label>
          <h4>Description of the videogame:</h4>
        </label>
        <br />
        <textarea
          value={input.description}
          name="description"
          rows="8"
          cols="100"
          placeholder="Type here..."
          required
          onChange={handleChange}
        />
        <br />
        <label>
          <h4> Rating</h4>
        </label>
        <RatingStars rating={selectRating} />
        <br />
        <label>
          <h4>Release Date:</h4>
        </label>
        <br />
        <input
          type="date"
          name="releaseDate"
          value={input.releaseDate}
          required
          onChange={handleChange}
        />
        <br />
        <div style={{ display: "inline-flex" }}>
          <div>
            <label>
              <h4>Genres:</h4>
            </label>
            {genres?.map((g) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    value={g.name}
                    name={g.name}
                    onChange={selectGenre}
                  />
                  <label key={g.id}>{g.name}</label>
                </div>
              );
            })}
          </div>
          <div>
            <label>
              <h4>Plattforms</h4>
            </label>
            {plattforms?.map((p) => {
              return (
                <div>
                  <input type="checkbox" value={p} onChange={selectPlattform} />
                  <label key={p}>{p}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <button type="submit" className="button" id="form">
            ¡Create my videogame!
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
