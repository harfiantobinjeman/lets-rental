import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Overlay, Pagination } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

function Statistic(){
    return(
        <div className="my-1 ms-1 py-0" style={{borderRadius: "15px"}}>
            <Container className="px-3">
                <Row>
                    <Col md={3}>
                        <Card className="prime border-0 text-white text-start px-2 py-2" style={{borderRadius: "10px"}}>
                            <Card.Body>
                                <div>Sum of Orders</div>
                                <div className="d-flex justify-content-between mt-4">
                                    <div>
                                        <Icon.Bag size={50} className="bi" color="white"/>
                                    </div>
                                    <div className="text-end">
                                        <div className="fs-3 fw-bold">114</div>
                                        <div className="fs-6">Orders</div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="prime border-0 text-white text-start px-2 py-2" style={{borderRadius: "10px"}}>
                            <Card.Body>
                                <div>Omzet</div>
                                <div className="d-flex justify-content-between mt-4">
                                    <div>
                                        <Icon.CashStack size={50} className="bi" color="white"/>
                                    </div>
                                    <div className="text-end">
                                        <div className="fs-3 fw-bold">2459K</div>
                                        <div className="fs-6">Rupiah</div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="prime border-0 text-white text-start px-2 py-2" style={{borderRadius: "10px"}}>
                            <Card.Body>
                                <div>Users</div>
                                <div className="d-flex justify-content-between mt-4">
                                    <div>
                                        <Icon.PersonLinesFill size={50} className="bi" color="white"/>
                                    </div>
                                    <div className="text-end">
                                        <div className="fs-3 fw-bold">56</div>
                                        <div className="fs-6">Accounts</div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="prime border-0 text-white text-start px-2 py-2" style={{borderRadius: "10px"}}>
                            <Card.Body>
                                <div>Collections</div>
                                <div className="d-flex justify-content-between mt-4">
                                    <div>
                                        <Icon.Truck size={50} className="bi" color="white"/>
                                    </div>
                                    <div className="text-end">
                                        <div className="fs-3 fw-bold">15</div>
                                        <div className="fs-6">Cars</div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Statistic;