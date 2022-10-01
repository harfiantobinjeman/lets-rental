import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIRequest, setAuthToken } from '../Axios';


const logoBlue = "./../img/logo-blue.png";
const bgLogin = "./../img/bg-login.png";

function Signup() {

    const isValidEmail = (email) => {
        if (!email) {
          return false;
        }
        return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      };
    
      const isValidAlphanumeric = (text = "") => {
        if (!text) return false; // empty validation
    
        let regex = new RegExp("^[a-z0-9]+$");
        return regex.test(text) ? false : true;
      };
    
      const validateInput = () => {
        if (!isValidEmail(email)) {
          return "EMAIL NOT VALID"
        }
        if (!isValidAlphanumeric(password)) {
          return "PASSWORD NOT VALID, MUST USE SYMBOL AND LETTERS";
        }
    
        return "";
      };
    
      const onRegister = () => {
        // validation
        const errorInput = validateInput();
        if (errorInput) {
            alert(errorInput);
            return;
        }
    
        // REGISTER
        setLoading(true)
        APIRequest({
            method: 'post',
            url: 'api/Register/register_seller',
            data: {
                username: email,
                nama: name,
                password: password,
                role: role
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    alert("REGISTER SUCCESS, PLEASE CHECK YOUR EMAIL FOR VERIFICATION")
                    //history("/verification");
                }
            })
            .catch((err) => {
                alert('REGISTER FAILED: ' + err.response.data)
            })
            .finally(() => setLoading(false))
    }
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('renter');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    return (<div style={{ background: "#f1f6ff" }}>
        <Container fluid>
            <Row style={{ height: "100vh" }} className="justify-content-center align-items-center">
                <Col md={12}>
                    <h2 className="text-primary text-center">
                        <img className="logo" src={logoBlue} />Lets Rental Seller
                    </h2>
                </Col>
                <Col md={5} style={{ marginTop: "0px" }} className="text-center">
                    <img src={bgLogin} height="250px" />
                    <div className="text-primary mt-5">
                        <h4>Rental Mobil cepat dengan harga yang kompetitif!</h4>
                        <p className="fs-5">Dapatkan beragam keuntungan hanya di LetsRental!</p>
                    </div>
                </Col>
                <Col md={3} style={{ marginTop: "0px" }}>
                    <Card className="border-0 px-3 py-3 shadow">
                        <Card.Body>
                            <Row className="justify-content-between align-items-center">
                                <Col className="text-center">
                                    <h2 className="text-secondary">Daftar Sekarang</h2>
                                    <p align="center">
                                        Sudah punya akun Lets Rental? <Link to="/login" className="fw-bold text-primary" style={{ textDecoration: "none" }}>Login</Link>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-start">
                                    <label className="mb-1 mt-3">Nomor Telepon atau Email</label>
                                    <input
                                    type="email"
                                    autoComplete="true"
                                    autoFocus={true}
                                    className="form-control input-lg"
                                    placeholder="Contoh: customer@letsrental.co.id"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    //error={!isValidEmail(email)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-start">
                                    <label className="mb-1 mt-3">Nama Lengkap</label>
                                    <input
                                    type="text"
                                    autoComplete="true"
                                    autoFocus={true}
                                    className="form-control input-lg"
                                    placeholder="Nama Lengkap Anda"
                                    label="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    //error={!isValidAlphanumeric(name)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-start">
                                    <label className="mb-1 mt-3">Kata Sandi</label>
                                    <input
                                        type="password"
                                        className="form-control input-lg"
                                        placeholder="Kata Sandi"
                                        label="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    //error={!isValidAlphanumeric(password)}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3 mb-4">
                                <Col>
                                    <button
                                        className="btn btn-primary bg-primary border-0 fw-bold text-white btn-block w-100 py-2 fs-5"
                                        onClick={onRegister}

                                    >Daftar</button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <p align="center">
                                        Dengan mendaftar, saya menyutujui <Link to="/terms-and-condition" className="fw-bold text-primary" style={{ textDecoration: "none" }}>Syarat dan Ketentuan</Link> serta <Link to="/privacy-policy" className="fw-bold text-primary" style={{ textDecoration: "none" }}>Kebijakan Privasi</Link>
                                    </p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="col-12 text-center fw-bold fs-6 text-primary">
                    &copy; 2022 Lets Rental | All Rights Reserved
                </Col>
            </Row>
        </Container>
    </div>
    );
}

export default Signup;