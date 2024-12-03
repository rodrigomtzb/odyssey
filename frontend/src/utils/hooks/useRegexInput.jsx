import { useEffect } from "react";

const useInputRegex = ({ value, regex }) => {
  useEffect(() => {
    switch (regex) {
      case "only-letters":
        break;
      case "only-numbers":
        break;
    }
  }, [value, regex]);
};

export default useInputRegex;
