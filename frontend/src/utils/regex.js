const regexUtils = (type) => {
  switch (type) {
    case "only-letters":
      return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]*$/;
    case "only-numbers":
      return /^\d*$/;
    case "letters-and-numbers":
      return /^[a-zA-Z0-9]*$/;
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]*$/;
    case "letters-and-space":
      return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    case "all":
      return /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s@.,-_]*$/;
    default:
      return false;
  }
};

export default regexUtils;
