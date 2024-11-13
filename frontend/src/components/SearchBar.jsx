import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ apiUrl }) => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === '') {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(apiUrl, {
          params: { q: query }
        });
        setFilteredSuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error al obtener sugerencias:', error);
        setFilteredSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [query, apiUrl]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setActiveSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex((prevIndex) => prevIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex((prevIndex) => prevIndex - 1);
      }
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0) {
        setQuery(filteredSuggestions[activeSuggestionIndex]);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar..."
        value={query}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        onKeyDown={handleKeyDown}
      />
      {loading && <div className="spinner-border spinner-border-sm text-primary position-absolute" role="status" style={{ right: '10px', top: '10px' }}></div>}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="list-group position-absolute w-100">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`list-group-item list-group-item-action ${
                index === activeSuggestionIndex ? 'active' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
