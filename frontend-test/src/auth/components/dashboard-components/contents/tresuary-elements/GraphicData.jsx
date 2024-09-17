

import { Col, Row } from "react-bootstrap";
import AreaData from "./graphics/AreaData";
import BarData from "./graphics/BarData";
import PieData from "./graphics/PieData";
import { ResponsiveContainer } from "recharts";
import LineData from "./graphics/LineData";

const GraphicData = () => {

  return (
    <>
      <ResponsiveContainer className="cnt-graphics clsVisibility justify-content-center">
        <Row className="align-items-center justify-content-center">
          <Col  md="12" xxl="6"> <PieData /> </Col>
          <Col  md="12" xxl="6"> <BarData /> </Col>
          <Col  md="12" xxl="6"> <AreaData /> </Col>
          <Col  md="12" xxl="6"> <LineData /> </Col>
        </Row>
      </ResponsiveContainer>
    </>
  )
}

export default GraphicData
