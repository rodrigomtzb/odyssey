import { Form } from "react-bootstrap";

const CheckboxGroup = ({ label, options, selectedOptions, onChange }) => {
  const handleChange = (e) => {
    const { value, checked } = e.target;
    let updatedSelectedOptions = [...selectedOptions];

    if (checked) {
      updatedSelectedOptions.push(value);
    } else {
      updatedSelectedOptions = updatedSelectedOptions.filter(
        (option) => option !== value
      );
    }

    onChange(updatedSelectedOptions);
  };

  return (
    <Form.Group>
      <Form.Label>{label}:</Form.Label>
      {options.map((option, index) => (
        <Form.Check
          key={index}
          type="checkbox"
          label={option}
          value={option}
          checked={selectedOptions.includes(option)}
          onChange={handleChange}
        />
      ))}
    </Form.Group>
  );
};

export default CheckboxGroup;
