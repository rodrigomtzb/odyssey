import { Button, Col } from "react-bootstrap";

const SubmitButton = ({ onClick, text }) => {
  return (
    <>
      <hr />
      <Col>
        <Button variant="gd" onClick={onClick}>{text}</Button>
      </Col>
    </>
  );
};

export default SubmitButton;
