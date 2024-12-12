import React, { useEffect } from "react";
import { Dropdown } from "primereact/dropdown";

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  optionValue = "id",
  optionLabel = "name",
  className = "",
  defaultOption = "Seleccione una opción",
  required = false,
  disabled = false,
  loading = false,
}) => {
  useEffect(() => {
    if (options && options.length === 1 && value !== options[0][optionValue]) {
      const singleOptionValue = options[0][optionValue] || options[0];
      onChange({ target: { name, value: singleOptionValue } });
    }
  }, [options]);

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}: {required && <span className="text-danger">*</span>}
        </label>
      )}
      <Dropdown
        id={name}
        value={value}
        onChange={(e) =>
          onChange({
            target: { name, value: e.value },
          })
        }
        options={options}
        optionLabel={optionLabel}
        optionValue={optionValue}
        placeholder={defaultOption}
        className={`form-input w-100 ${disabled ? "p-disabled" : ""}`}
        style={{ heigth: "2rem" }}
        disabled={disabled}
        loading={loading}
      />
    </div>
  );
};

export default Select;
