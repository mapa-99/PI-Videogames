import {
  CREATED_BY_ME,
  FILTER_BY_GENRE,
  GAME_DETAILS,
  GET_GENRES,
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  SORT_BY_NAME,
  SORT_BY_RATING,
  POST_GAME,
} from "./constants";

const initialState = {
  games: [],
  allGames: [],
  genres: [],
  detail: [],
};
function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        games: payload,
        allGames: payload,
      };
    case GAME_DETAILS:
      return {
        ...state,
        detail: payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        games: payload,
      };
    case FILTER_BY_GENRE:
      const allGames = state.allGames;
      const genreFiltered =
        payload === "all"
          ? allGames
          : allGames.filter((game) => game.genres.includes(payload));
      return {
        ...state,
        games: genreFiltered,
      };
    case SORT_BY_NAME:
      let sorted =
        payload === "a-z"
          ? state.games.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.games.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: sorted,
      };
    case SORT_BY_RATING:
      let arr =
        payload === "asc"
          ? state.games.sort((a, b) => {
              return a.rating - b.rating;
            })
          : state.games.sort((a, b) => {
              return b.rating - a.rating;
            });
      return {
        ...state,
        games: arr,
      };

    case CREATED_BY_ME:
      let sortedArr =
        payload === "yes"
          ? state.allGames.filter((game) => game.createdByDb)
          : state.allGames.filter((game) => !game.createdByDb);
      return {
        ...state,
        games: sortedArr,
      };
    case POST_GAME:
      return {
        ...state,
      };
    default:
      return state;
  }
}
export default rootReducer;
