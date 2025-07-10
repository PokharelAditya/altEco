// src/components/SearchBar.jsx
import React from 'react';
import '../css/search-bar.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search sustainable products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={handleClear} className="clear-btn">
            ✕
          </button>
        )}
        <button className="search-btn">🔍</button>
      </div>
    </div>
  );
};

export default SearchBar;
