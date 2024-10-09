import { Card } from "react-bootstrap";

const MainCard = ({ children }) => {
  return (
    <Card
      className="mt-3 border border-0 p-4"
      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
    >
      {children}
    </Card>
  );
};

export default MainCard;
