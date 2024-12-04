import { Form } from "react-bootstrap";
import regexUtils from "../../utils/regex";

const Input = ({
  label,
  className,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required,
  style,
  max,
  min,
  regexType = "all",
  withoutLabel = false,
}) => {
  const handleChange = (e) => {
    let newValue = e.target.value;

    if (type !== "email" && type !== "password") {
      newValue = newValue.toUpperCase();
    }

    const regex = regexUtils(regexType);
    if (
      !regex ||
      type === "email" ||
      type === "password" ||
      regex.test(newValue)
    ) {
      e.target.value = newValue;
      onChange(e);
    }
  };

  return (
    <Form.Group className="mb-3" controlId={name}>
      {!withoutLabel && (
        <Form.Label>
          {label}: {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <Form.Control
        className={`form-input ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        maxLength={max}
        minLength={min}
        style={style}
      />
    </Form.Group>
  );
};

export default Input;
