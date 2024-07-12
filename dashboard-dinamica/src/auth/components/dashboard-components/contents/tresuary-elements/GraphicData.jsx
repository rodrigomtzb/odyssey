

import { Col, Row } from "react-bootstrap";
import AreaData from "./graphics/AreaData";
import BarData from "./graphics/BarData";
import PieData from "./graphics/PieData";
import { ResponsiveContainer } from "recharts";
import LineData from "./graphics/LineData";

const GraphicData = () => {

  return (
    <>
      <ResponsiveContainer>
        <Row className="cnt-graphics">
          <Col className="bg-graphics" xs lg="4"> <PieData /> </Col>
          <Col className="bg-graphics" xs lg="4"> <BarData /> </Col>
          <Col className="bg-graphics" xs lg="4"> <AreaData /> </Col>
          <Col className="bg-graphics" xs lg="4"> <LineData /> </Col>
        </Row>
      </ResponsiveContainer>
    </>
  )
}

export default GraphicData
