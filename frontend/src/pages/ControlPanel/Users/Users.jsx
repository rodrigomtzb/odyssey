import React from "react"
import { Card, Container, Row, Col, Button } from "react-bootstrap"

const Users = () => {
    return (
        <Card>
            <Container>
                <Row>
                    <Col>
                        <Button variant='gd' href='users/create'>Registro de Usuario</Button>
                    </Col>
                    <Col>
                        <Button variant='gd' href='users/create/masive'>Registro Masivo de Usuarios</Button>
                    </Col>
                    <Col>
                        <Button variant='gd' href='users/list'>Lista de Usuarios</Button>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default Users;