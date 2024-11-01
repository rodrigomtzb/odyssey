import React, { useState } from "react";
import { Button } from "react-bootstrap";

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="tag-input">
      <input
        type="text"
        className="form-control"
        placeholder="Escribe un tag y presiona Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="mt-2 p-3 rounded border border-black bg-white">
        {tags.map((tag, index) => (
          <span key={index} className="badge bg-gd me-2">
            {`#${tag}`}
            <i
              className="bi bi-x-circle ms-2"
              style={{ cursor: "pointer" }}
              onClick={() => removeTag(tag)}
            ></i>
          </span>
        ))}
      </div>
      <Button
        variant="gd"
        className="mt-3"
      >
        Añadir
      </Button>
    </div>
  );
};

export default TagInput;
