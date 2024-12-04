import { useEffect, useState } from "react";
import Input from "./Input";
import TitleSection from "./TitleSection";
import { handleFormChange } from "../../utils";
import { Form } from "react-bootstrap";
import Select from "./Select";

const PayDataSection = ({ state }) => {
  const [formData, setFormData] = useState({
    bankNumber: "",
  });
  const [cardType, setCardType] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.trim();
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (/^4/.test(value)) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(value)) {
      setCardType("mastercard");
    } else {
      setCardType("");
    }
  };
  return (
    <TitleSection text="Datos Bancarios" state={state}>
      <Form.Label>CLABE/Numero de tarjeta:</Form.Label>
      <div className="position-relative mb-3">
        <input
          type="text"
          className="form-control"
          name="bankNumber"
          placeholder="Ingresa tu número de tarjeta"
          value={formData.bankNumber}
          onChange={handleChange}
          style={{
            paddingLeft: "50px",
          }}
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
              height: "30px",
              objectFit: "contain",
            }}
          />
        )}
      </div>
      <Select label="Banco" />
    </TitleSection>
  );
};

export default PayDataSection;
