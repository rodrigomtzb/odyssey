import React, { useState, useEffect } from "react";
import CustomerService from "../services/customer.service";

const SearchBar = ({ type, setFormData, data }) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (data) {
      const displayName =
        data.personType === "F" ? data.fullName : data.legalName;
      setQuery(displayName);
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        let response;
        switch (type) {
          case "customer":
            response = await CustomerService.getCustomersBySearch(query.trim());
            break;
          default:
            console.log("El buscador no contiene un tipo válido");
            break;
        }
        setFilteredSuggestions(response.data);
        if (response.data.length == 1) {
          setSelectedId(response.data[0].id);
        } else {
          setSelectedId(null);
        }
        if (selectedId) {
          setShowSuggestions(false);
        } else {
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Error al obtener sugerencias:", error);
        setFilteredSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setActiveSuggestionIndex(-1);
    if (selectedId) {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const displayName =
      suggestion.personType === "F"
        ? suggestion.fullName
        : suggestion.legalName;

    setQuery(displayName);
    setSelectedId(suggestion.id);
    setFormData((prevData) => ({
      ...prevData,
      customerId: suggestion.id,
    }));
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex((prevIndex) => prevIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex((prevIndex) => prevIndex - 1);
      }
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0) {
        const selectedSuggestion = filteredSuggestions[activeSuggestionIndex];
        const displayName =
          selectedSuggestion.personType === "F"
            ? selectedSuggestion.fullName
            : selectedSuggestion.legalName;

        setQuery(displayName);
        setSelectedId(selectedSuggestion.id);
        setFormData((prevData) => ({
          ...prevData,
          customer_id: selectedSuggestion.id,
        }));
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="position-relative mb-3">
      <input
        type="text"
        className="form-control form-input"
        placeholder="Teclee para buscar"
        value={query}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        onKeyDown={handleKeyDown}
      />
      {loading && (
        <div
          className="spinner-border spinner-border-sm text-primary position-absolute"
          role="status"
          style={{ right: "10px", top: "10px" }}
        ></div>
      )}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="list-group position-absolute w-100">
          {filteredSuggestions.map((suggestion, index) => {
            const displayName =
              suggestion.personType === "F"
                ? suggestion.fullName
                : `${suggestion.legalName} / ${suggestion.businessName}`;

            return (
              <li
                key={suggestion.id}
                className={`list-group-item list-group-item-action ${
                  index === activeSuggestionIndex ? "active" : ""
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {displayName}{" "}
                <span
                  className={`fw-normal ${
                    index === activeSuggestionIndex
                      ? "text-white-50"
                      : "text-secondary"
                  }`}
                >
                  {suggestion.personType == "F"
                    ? "- Persona Fisica"
                    : "- Persona Moral"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
