import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import regexUtils from "../../utils/regex";
import { InputNumber } from "primereact/inputnumber";

const Input = ({
  label,
  className = "",
  contentClassName = "",
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  style,
  max,
  min,
  regexType = "all",
  withoutLabel = false,
  withoutClasses = false,
  mask,
  showMask = false,
  suffix,
}) => {
  const [keyfilter, setKeyfilter] = useState(null);

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (type !== "email" && type !== "password") {
      newValue = newValue.toUpperCase();
    }

    if (onChange) {
      onChange({
        target: {
          name: e.target.name,
          value: newValue,
        },
      });
    }
  };

  useEffect(() => {
    if (regexUtils(regexType)) {
      setKeyfilter(regexUtils(regexType));
    } else {
      setKeyfilter(null);
    }
  }, []);

  return (
    <div className={!withoutClasses ? `mb-3 ${contentClassName}` : ""}>
      {!withoutLabel && (
        <label htmlFor={name} className="form-label">
          {label}: {required && <span className="text-danger">*</span>}
        </label>
      )}
      {mask ? (
        <InputMask
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={handleChange}
          className={`w-100 form-input ${className}`}
          keyfilter={keyfilter}
          required={required}
          maxLength={max}
          minLength={min}
          style={style}
          mask={mask}
          unmask={true}
          autoClear={false}
        />
      ) : type === "money" ? (
        <InputNumber
          inputId={name}
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onValueChange={onChange}
          max={max}
          min={min}
          mode="currency"
          currency="USD"
          locale="en-US"
          inputStyle={style}
          inputClassName={`form-input ${className}`}
          className="w-100"
          required={required}
        />
      ) : type === "number" ? (
        <InputNumber
          inputId={name}
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onValueChange={onChange}
          max={max}
          min={min}
          mode="decimal"
          suffix={suffix}
          inputStyle={style}
          inputClassName={`form-input ${className}`}
          className="w-100"
          required={required}
        />
      ) : (
        <InputText
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={handleChange}
          className={`w-100 form-input ${className}`}
          keyfilter={keyfilter}
          required={required}
          maxLength={max}
          minLength={min}
          style={style}
        />
      )}
    </div>
  );
};

export default Input;
