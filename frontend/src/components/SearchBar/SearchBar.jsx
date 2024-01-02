import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import './search.css';

function SearchBar({value , onSearch, onClearSearch}) {
    return (
      <div className="search-bar">
        <input
          placeholder="Search Users..."
          onChange={onSearch}
          value={value}
        />
        <DeleteIcon className="clear-search" onClick={onClearSearch} />
      </div>
    );
}

export default SearchBar;