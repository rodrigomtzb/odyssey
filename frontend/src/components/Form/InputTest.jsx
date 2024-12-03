import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InputWithCardIcons = () => {
  const [inputValue, setInputValue] = useState("");
  const [cardType, setCardType] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);

    // Detección básica de tipo de tarjeta
    if (/^4/.test(value)) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(value)) {
      setCardType("mastercard");
    } else {
      setCardType("");
    }
  };

  return (
    <div className="container mt-4">
      <div className="position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Ingresa tu número de tarjeta"
          value={inputValue}
          onChange={handleChange}
          style={{
            paddingLeft: "50px", // Espacio para el ícono
          }}
          maxLength={16}
        />
        {cardType && (
          <img
            src={
              cardType === "visa"
                ? "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                : "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            }
            alt={cardType}
            className="position-absolute"
            style={{
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "30px",
              height: "30px", // Tamaño uniforme
              objectFit: "contain", // Asegura que el contenido mantenga su proporción
            }}
          />
        )}
      </div>
    </div>
  );
};

export default InputWithCardIcons;
