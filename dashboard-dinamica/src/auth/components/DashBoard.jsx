import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import Menu from './dashboard-components/Menu';
import '../../dashboard.css';
import '../components/dashboard-components/assets/css/modules.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


function DashBoard() {
  return (
    <>   
      <Container fluid="xs" className='dash-bg'>
        <Row>
            <Col  md="col-12 h-10" lg="auto" >
                <Menu></Menu>
            </Col>
            <Col>
              <Outlet />
            </Col>
        </Row>
      </Container>
      </>
  );
}


export default DashBoard;
