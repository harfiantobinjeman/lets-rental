import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Toolbar from './elements/toolbar.seller';
import Order from './elements/order.seller';

function Page(){
    return (
        <Container fluid className="py-2" style={{backgroundColor: "#cbe7e5", minHeight: "100vh"}}>{/** #f7f9fa #b4e6e3*/}
            <Row className="justify-content-center align-items-center text-center">
                <Col className="">
                    <Toolbar/>
                    <Order/>
                </Col>
            </Row>
        </Container>
    )
}

export default Page;