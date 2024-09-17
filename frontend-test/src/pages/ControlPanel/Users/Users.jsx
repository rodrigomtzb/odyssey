import React from "react"
import { Card, Container, Row, Col, Button } from "react-bootstrap"

const Users = () => {
    return (
        <Card>
            <Container>
                <Row>
                    <Col>
                        <Button variant='primary' href='/create'>Registro de Usuario</Button>
                    </Col>
                    <Col>
                        <Button variant='primary' href='/create/masive'>Registro Masivo de Usuarios</Button>
                    </Col>
                    <Col>
                        <Button variant='primary' href='/list'>Lista de Usuarios</Button>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default Users;