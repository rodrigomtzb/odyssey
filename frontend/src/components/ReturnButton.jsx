import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ReturnButton = ({ className }) => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <Button onClick={handleReturn} variant="gd" className={className}>
      <i className="bi bi-arrow-return-left" />
    </Button>
  );
};

export default ReturnButton;
