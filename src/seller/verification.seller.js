import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { APIRequest } from '../Axios';

const logoBlue = "./../img/logo-blue.png";
const bgLogin = "./../img/bg-login.png";

const VerificationSeller = () => {
    const { verifToken } = useParams();

    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        APIRequest({
            method: 'post',
            url: 'api/Register/EmailTokenVerificationAdmin/',
            data: {
                Token: verifToken,
                role: "renter"
            }
            // params: { verifToken }
        })
            .then((res) => {
                if (res.status === 200) {
                    setMsg("success");
                }
            })
            .catch((err) => {
                console.log('err verif', err.response.data)
                setMsg("failed");
                setIsError(true);
            })
    }, []);


    return (
        <div style={{ background: "#f1f6ff" }}>
            <Container fluid>
                <Row style={{ height: "100vh" }} className="justify-content-center align-items-center">
                    <Col md={12}>
                        <h2 className="text-primary text-center">
                            <img className="logo" src={logoBlue} />Lets Rental Seller
                        </h2>
                    </Col>
                    <Col md={5} style={{ marginTop: "0px" }} className="text-center">
                        <img src={bgLogin} height="250px" />
                        {msg ? (isError ?              
                        <div className="text-primary mt-5">
                            <h4>Oops! Ada yang salah!</h4>
                        </div> 
                        : 
                        <div className="text-primary mt-5">
                            <h4>Selamat! Akun anda sudah terverifikasi!</h4>
                            <p className="fs-5">Silahkan Login di halaman <Link to="/seller/login" className="fw-bold text-primary" style={{ textDecoration: "none" }}>Login</Link></p>
                        </div>) : 
                        
                        <div className="text-primary mt-5">
                            <h4>LOADING</h4>
                        </div> }

                    </Col>
                    <Col className="col-12 text-center fw-bold fs-6 text-primary">
                        &copy; 2022 Lets Rental | All Rights Reserved
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default VerificationSeller