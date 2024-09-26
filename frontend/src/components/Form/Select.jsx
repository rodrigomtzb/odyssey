import { Form } from "react-bootstrap";

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  className,
  defaultOption,
  required,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}:</Form.Label>
      <Form.Select
        className={`form-input ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled={required} >{defaultOption || "Seleccione una opción"}</option>
        {options && options.map((option, index) => (
          <option key={index} value={option.id || option}>
            {option.name || option}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Select;
