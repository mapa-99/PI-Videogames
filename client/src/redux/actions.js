import axios from "axios";
import {
  CREATED_BY_ME,
  FILTER_BY_GENRE,
  GAME_DETAILS,
  GET_GENRES,
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  SORT_BY_NAME,
  SORT_BY_RATING,
} from "./constants";

export function getVideogames() {
  return async function (dispatch) {
    try {
      var json = await axios("http://localhost:3001/videogames");
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function gameDetails(id) {
  return async function (dispatch) {
    try {
      var info = await axios.get(`http://localhost:3001/videogames/${id}`);
      console.log("gameDetails. info-->", info.data);
      return dispatch({
        type: GAME_DETAILS,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      var info = await axios("http://localhost:3001/genres");
      return dispatch({
        type: GET_GENRES,
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getGamesByName(name) {
  return async function (dispatch) {
    try {
      var info = await axios.get(`http://localhost:3001/videogames?name=${name}`);
      return dispatch({
        type: GET_VIDEOGAMES_BY_NAME,
        payload: info.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function sortByName(payload) {
  return {
    type: SORT_BY_NAME,
    payload,
  };
}
export function sortByRating(payload) {
  return {
    type: SORT_BY_RATING,
    payload,
  };
}
export function filterByGenre(payload) {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
}
export function sortCreated(payload) {
  return {
    type: CREATED_BY_ME,
    payload,
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const res = await axios.post("http://localhost:3001/videogame", payload);
    console.log(res);
    return res;
  };
}
