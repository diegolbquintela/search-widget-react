import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const search = async () => {
      await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: searchTerm,
        },
      });
    };

    search();
  }, [searchTerm]);

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
