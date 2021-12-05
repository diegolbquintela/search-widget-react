import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div>
        <label>Enter search term: </label>
      </div>
      <div>
        <input onChange={searchHandler} />
      </div>
    </div>
  );
};

export default Search;
