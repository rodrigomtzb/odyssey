import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TagService from "../../services/tag.service";
import SupplierService from "../../services/supplier.service";
import TitleSection from "./TitleSection";
import { scrollToTop } from "../../utils";

const TagInput = ({ id, type, tagsData, setFormData, state }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [initialTags, setInitialTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState({
    componentId: id,
    listAddTags: [],
    listRemoveTags: [],
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const fetchSuggestions = async (query) => {
    try {
      const response = await TagService.getTags(query);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (selectedIndex >= 0) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        addNewTag();
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
      );
    }
  };

  const addNewTag = () => {
    const trimmedInput = inputValue.trim();
    if (
      trimmedInput !== "" &&
      !tags.listAddTags.some((tag) => tag.description === trimmedInput) &&
      !initialTags.some((tag) => tag.description === trimmedInput)
    ) {
      const matchedSuggestion = suggestions.find(
        (suggestion) => suggestion.description === trimmedInput
      );
      const newTag = matchedSuggestion
        ? {
            id: matchedSuggestion.id,
            description: matchedSuggestion.description,
          }
        : { description: trimmedInput };

      setTags((prevTags) => ({
        ...prevTags,
        listAddTags: [...prevTags.listAddTags, newTag],
      }));
      setInputValue("");
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (
      !tags.listAddTags.some(
        (tag) => tag.description === suggestion.description
      )
    ) {
      setTags((prevTags) => ({
        ...prevTags,
        listAddTags: [...prevTags.listAddTags, suggestion],
      }));
    }
    setInputValue("");
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const removeTag = (tagToRemove, fromInitialTags = false) => {
    if (fromInitialTags) {
      setTags((prevTags) => ({
        ...prevTags,
        listRemoveTags: [...prevTags.listRemoveTags, tagToRemove],
      }));
      setInitialTags((prevInitialTags) =>
        prevInitialTags.filter((tag) => tag.id !== tagToRemove.id)
      );
    } else {
      setTags((prevTags) => ({
        ...prevTags,
        listAddTags: prevTags.listAddTags.filter(
          (tag) => tag.description !== tagToRemove.description
        ),
      }));
    }
  };

  const handleAddTags = () => {
    switch (type) {
      case "supplier":
        SupplierService.addTags(id, tags).then((response) => {
          setFormData(response.data);
          scrollToTop();
          setTags({
            componentId: id,
            listAddTags: [],
            listRemoveTags: [],
          });
          setIsOpen(false);
        });
        break;
    }
  };

  useEffect(() => {
    if (tagsData) {
      setInitialTags(tagsData);
    }
  }, [tagsData]);

  useEffect(() => {
    if (inputValue.trim()) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
    setSelectedIndex(-1);
  }, [inputValue]);

  useEffect(() => {
    setIsOpen(state);
  }, [state]);

  return (
    <TitleSection text="Tags" state={isOpen}>
      <div className="tag-input">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe un tag y presiona Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {suggestions.length > 0 && (
          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                className={`suggestion-item py-2 px-3 ${
                  index === selectedIndex ? "active" : ""
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ cursor: "pointer" }}
              >
                #{suggestion.description}
              </div>
            ))}
          </div>
        )}

        <div className="mt-2 p-3 rounded border border-black bg-white">
          {initialTags.map((tag) => (
            <span key={tag.id || tag.description} className="badge bg-gd me-2">
              {`#${tag.description}`}
              <i
                className="bi bi-x-circle ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeTag(tag, true)}
              ></i>
            </span>
          ))}
          {tags.listAddTags.map((tag) => (
            <span key={tag.id || tag.description} className="badge bg-gd me-2">
              {`#${tag.description}`}
              <i
                className="bi bi-x-circle ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeTag(tag, false)}
              ></i>
            </span>
          ))}
        </div>

        <Button variant="gd" className="mt-3" onClick={handleAddTags}>
          {tagsData ? "Actualizar" : "Añadir"}
        </Button>
      </div>
    </TitleSection>
  );
};

export default TagInput;
