import React from 'react';
import { Navbar, Container, Row, Col, Button, Badge } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function Toolbar(){
    return(
        <div className="my-1 ms-1 pb-2">
            <Container className="px-3">
                <Navbar style={{borderRadius: "12px", backgroundColor: "#6288d2"}}>
                    <Container className="pe-0">
                        <Row style={{width: "100%"}} className="align-items-center justify-content center">
                            <Col className="text-start col-auto">
                                <Navbar.Brand href="#home" className="text-white text-start fw-bold">Lets Rental Seller</Navbar.Brand>
                            </Col>
                            <Col>
                                {/* <Link to="/seller/statistic">
                                    <Button variant="info" className="text-white fw-bold me-2">
                                        <Icon.GraphUpArrow size={18} className="bi me-2" color="white"/> Statistic
                                    </Button>
                                </Link> */}
                                <Link to="/seller/product">
                                    <Button variant="info" className="text-white fw-bold me-2">
                                        <Icon.Truck size={18} className="bi me-2" color="white"/> Products
                                    </Button>
                                </Link>
                                <Link to="/seller/order">
                                    <Button variant="info" className="text-white fw-bold">
                                        <Icon.Bag size={18} className="bi me-2" color="white"/> Orders
                                    </Button>
                                </Link>
                            </Col>
                            <Col className="col-auto">
                                <Navbar.Toggle />
                                <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    <Link to="/seller/login">
                                        <Button variant="danger" className="text-white fw-bold">
                                            <Icon.ArrowRightCircleFill size={18} className="bi me-2" color="white"/> Logout
                                        </Button>
                                    </Link>
                                </Navbar.Text>
                                </Navbar.Collapse>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            </Container>
        </div>
    )
}

export default Toolbar;