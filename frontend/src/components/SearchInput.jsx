import React, { useState } from "react";
import { Input } from "./Form";

const SearchInput = ({
  data,
  onSearch,
  searchFields = [],
  placeholder = "Buscar...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (onSearch) {
      const filteredData = data.filter((item) =>
        searchFields.some((field) => {
          const fieldValue = item[field];
          return (
            typeof fieldValue === "string" &&
            fieldValue.toLowerCase().includes(value.toLowerCase())
          );
        })
      );
      onSearch(filteredData);
    }
  };

  return (
    <Input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder={placeholder}
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%",
      }}
      regexType="letters-and-numbers"
      withoutLabel
    />
  );
};

export default SearchInput;
