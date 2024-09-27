const handleCheckboxChange =
  (formData, setFormData, name) => (updatedOptions) => {
    setFormData({
      ...formData,
      [name]: updatedOptions,
    });
  };

  export default handleCheckboxChange;