import { Children, useEffect } from "react";
import { Form } from "react-bootstrap";

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  optionValue = "id",
  optionLabel = "name",
  className,
  defaultOption,
  required,
  disabled,
  children,
}) => {
  useEffect(() => {
    if (options && options.length == 1) {
      const singleOptionValue = options[0][optionValue] || options[0];
      onChange({ target: { name, value: singleOptionValue } });
    }
  }, [options]);

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}: {required && <span className="text-danger">*</span>}</Form.Label>
      <Form.Select
        className={`form-input ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        <option value="" disabled={required}>
          {defaultOption || "Seleccione una opción"}
        </option>
        {children ? (
          children
        ) : (
          <>
            {options &&
              options.map((option, index) => (
                <option key={index} value={option[optionValue] || option}>
                  {option[optionLabel] || option}
                </option>
              ))}
          </>
        )}
      </Form.Select>
    </Form.Group>
  );
};

export default Select;
