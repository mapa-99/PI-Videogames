import React from "react";
import './styles.css'

const Pagination = ({ gamesPerPage, allGames, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log("Pagination... pageNumbers", pageNumbers);
  return (
    <div className="pags">
      {pageNumbers?.map((num) => (
        <button key={num.id} onClick={() => paginate(num)}>
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
