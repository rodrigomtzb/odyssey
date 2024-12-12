import { AutoComplete } from "primereact/autocomplete";

const SearchInput = ({
  label,
  name,
  search,
  placeholder,
  value,
  suggestions = [],
  onChange,
  style,
  className,
  required,
}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}: {required && <span className="text-danger">*</span>}
        </label>
        <AutoComplete
          inputId={name}
          name={name}
          value={value}
          completeMethod={search}
          suggestions={suggestions}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className="w-100"
          inputClassName={`w-100 form-input ${className}`}
          inputStyle={style}
        />
      </div>
    </>
  );
};

export default SearchInput;
