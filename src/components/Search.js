import React, { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import TextField from "@mui/material/TextField";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("Crime and Punishment");
  const [results, setResults] = useState([]);
  // console.log(results);

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: searchTerm,
        },
      });

      setResults(data.query.search);
    };

    //to avoid a delay from the first search
    // if there is no search...
    if (searchTerm && !results.length) {
      search();
    } else {
      // set timeout for API request after user input
      const timeoutId = setTimeout(() => {
        if (searchTerm) {
          search();
        }
      }, 500);

      // cleanout function
      // React will hold this function in the first render, and return it after further rerenders
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchTerm]);

  const renderedResult = results.map((result) => {
    return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <div key={result.pageid}>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={result.title}
                secondary={
                  <React.Fragment>
                    {/* wikipedia API is returning a text with html
            using feature bellow to transform the string returend into an html element */}
                    <span
                      dangerouslySetInnerHTML={{ __html: result.snippet }}
                    ></span>
                    <div>
                      <a
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                      >
                        Go
                      </a>
                    </div>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </div>
      </Box>
    );
  });

  return (
    <Box>
      <TextField id="outlined-basic" label="Enter search term">
        <input onChange={searchHandler} />
      </TextField>
      <div>{renderedResult}</div>
    </Box>
  );
};

export default Search;
