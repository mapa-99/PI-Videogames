import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesByName } from "../redux/actions";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      dispatch(getGamesByName(name));
      setName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type your game..."
        size="45"
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
