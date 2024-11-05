import { Card } from "react-bootstrap";

const MainCard = ({ children }) => {
  return (
    <Card
      className="my-md-3 border border-0 p-2 p-md-4"
      style={{
        backgroundColor: "rgb(255, 255, 255, 0.6)",
        // height: "calc(100vh - 5rem)",
      }}
    >
      <Card className="h-100 p-4">{children}</Card>
    </Card>
  );
};

export default MainCard;
