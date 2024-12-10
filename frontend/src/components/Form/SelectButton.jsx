import React from "react";
import { SelectButton as PrimeSelectButton } from "primereact/selectbutton";

const SelectButton = ({
  label,
  name,
  contentClassName = "",
  required = false,
  ...rest
}) => {
  return (
    <div className={`mb-3 ${contentClassName}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}: {required && <span className="text-danger">*</span>}
        </label>
      )}
      <PrimeSelectButton id={name} name={name} {...rest} />
    </div>
  );
};

export default SelectButton;
