import { useEffect, useState } from "react";
import ReturnButton from "../Buttons/ReturnButton";

const TitleSection = ({
  text,
  isFirst,
  withReturnButton,
  children,
  state = true,
}) => {
  const [isOpen, setIsOpen] = useState(state);

  const toggleContent = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(state);
  }, [state]);

  return (
    <>
      {!isFirst && <hr style={{ borderColor: "#14233b" }} />}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          className="d-flex align-items-center p-2 w-100 bg-gd"
          style={{ cursor: "pointer" }}
          onClick={toggleContent}
        >
          <h5 className="m-0">{text}</h5>
          <span
            className={`ms-auto me-2 ${
              isOpen ? "rotate-open" : "rotate-close"
            }`}
            style={{ transition: "transform 0.3s" }}
          >
            <i className="bi bi-caret-up-fill" />
          </span>
        </div>
        {withReturnButton && <ReturnButton />}
      </div>

      {isOpen && (
        <div className="content px-3 pt-4 pb-3 border bg-secondary-subtle rounded">
          {children}
        </div>
      )}
    </>
  );
};

export default TitleSection;
