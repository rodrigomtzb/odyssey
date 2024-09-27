const handleEmailChange = (formData, setFormData) => (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
    username: value,
  });
};

export default handleEmailChange;