import React from "react";
import { useState, useEffect } from "react";

import CardsContainer from "./CardsContainer";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getGenres,
  filterByGenre,
  sortByName,
  sortByRating,
  sortCreated,
} from "../redux/actions";
import { Link } from "react-router-dom";
import "./styles.css";

const Home = () => {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);
  const allGenres = useSelector((state) => state.genres);

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(20);

  //Pagination
  const indexLastGame = currentPage * gamesPerPage;
  const indexFirstGame = indexLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexFirstGame, indexLastGame);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (!allGames.length) {
      dispatch(getVideogames());
    }
  }, [dispatch, allGames]);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const handleGenre = (event) => {
    dispatch(filterByGenre(event.target.value));
  };
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getVideogames());
  };

  const handleName = (event) => {
    event.preventDefault();
    dispatch(sortByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`);
  };

  const handleRating = (event) => {
    event.preventDefault();
    dispatch(sortByRating(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`);
  };
  const handleCreated = (event) => {
    event.preventDefault();
    dispatch(sortCreated(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`);
  };

  // console.log("Home, allGenres-->", allGenres);
  return (
    <div className="home">
      <div>
        <Link to="/videogame">
          <button className="button" id="create">
            Create a game
          </button>
        </Link>
        <button className="button" onClick={handleClick} id="reload">
          Reload
        </button>
      </div>
      <div>
        <SearchBar />
        <select onChange={handleName}>
          <option disabled selected hidden>
            Sort by Name
          </option>
          <option value="a-z">A - Z</option>
          <option value="z-a">Z - A</option>
        </select>
        <select style={{ margin: "1.2rem" }} onChange={handleGenre}>
          <option disabled selected hidden>
            Select a Genre
          </option>
          {allGenres?.map((gen) => (
            <option value={gen.name} key={gen.id}>
              {gen.name}
            </option>
          ))}
        </select>
        <select onChange={handleRating}>
          <option disabled selected hidden>
            Sort by Rating
          </option>
          <option value="asc">Ascendant</option>
          <option value="desc">Descendant</option>
        </select>
        <select style={{ margin: "1.2rem" }} onChange={handleCreated}>
          <option disabled selected hidden>
            filter Created
          </option>
          <option value="yes">yes</option>
        </select>
      </div>
      <div>
        <Pagination
          allGames={allGames.length}
          paginate={paginate}
          gamesPerPage={gamesPerPage}
        />
      </div>
      <CardsContainer games={currentGames} />
    </div>
  );
};

export default Home;
