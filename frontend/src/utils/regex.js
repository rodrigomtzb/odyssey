const regexUtils = (type) => {
    switch (type) {
      case "only-letters":
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]*$/;
      case "only-numbers":
        return /^\d*$/;
      case "letters-and-numbers":
        return /^[a-zA-Z0-9]*$/;
      case "letters-and-space":
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
      case "all":
        return /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;
      default:
        throw new Error(`Regex type "${type}" is not supported.`);
    }
  };
  
  export default regexUtils;
  