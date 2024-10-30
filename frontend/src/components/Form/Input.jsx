import { Form } from "react-bootstrap";

const Input = ({
  label,
  className,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
  max,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}:</Form.Label>
      <Form.Control
        className={`form-input ${className}`}
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={max}
      />
    </Form.Group>
  );
};

export default Input;
