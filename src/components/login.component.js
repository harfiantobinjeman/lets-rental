import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'; 
import { APIRequest, setAuthToken } from '../Axios';
import { loginContext, useLoginContext } from '../context/loginContext';

const logoBlue = "./../img/logo-blue.png";

const Login = (props) => {
  const loginStatus = useLoginContext();
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [loading, setLoading] = useState(false);

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
      return "PASSWORD NOT VALID";
    }

    return "";
  };

  //Axios for Login
  const onLogin = () => {
    // validation
    const errorInput = validateInput();
    if (errorInput) {
      alert(errorInput);
      return;
    }

    // LOGIN
    setLoading(true)
    APIRequest({
      method: 'post',
      url: 'api/Login/Login',
      data: {
        username: email,
        password: password,
      }
    })
      .then((res) => {
        if (res.status === 200) {
          loginStatus.setIsLogin(true);
          loginStatus.setUserId(res.data.user_id);
          // save auth token to local & axios
          const jwtToken = "Bearer " + res.data.jwtToken;
          setAuthToken(jwtToken);

          // go to next page
          if(!errorInput) {
            history("/homepage");
          }
     
        }
      })
      .catch((err) => {
        alert('LOGIN FAILED: ' + err.response.data)
      })
      .finally(() => setLoading(false))
  }

  //Rendering Login Page
  return (
    <div style={{ backgroundColor: "#f1f6ff" }}>
      <Container fluid>
        <Row style={{ height: "100vh", background: "url('./../img/bg-login.png') center center no-repeat", backgroundSize: "50%" }} className="justify-content-center align-items-center">
          <Col md={3} style={{ marginTop: "-50px" }}>
            <h2 className="mb-5 text-primary text-center">
              <img className="logo" src={logoBlue} />Lets Rental
            </h2>
            <Card className="border-0 px-3 py-3 shadow">
              <Card.Body>
                <Row className="justify-content-between align-items-center">
                  <Col className="text-start">
                    <h2 className="text-secondary">Login</h2>
                  </Col>
                  <Col className="text-end">
                    <Link to="/signup" style={{ textDecoration: "none" }}><h6 className="text-primary">Signup</h6></Link>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-start">
                    <label className="mb-1 mt-5">Nomor Telepon atau Email</label>
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
                    <label className="mb-1 mt-3">Kata Sandi</label>
                    <input
                      type="password"
                      className="form-control input-lg"
                      placeholder="Kata Sandi"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                     // error={!isValidAlphanumeric(password)}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    {/* Hilangkan Komponen Link untuk membuat proses login */}
                      <button
                        className="btn btn-primary bg-primary border-0 fw-bold text-white btn-block w-100 py-2 fs-5" 
                        onClick={onLogin}                
                        >Masuk</button>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <button className="btn btn-light bg-transparent pe-0 fw-bold text-primary mt-4">Lupa Kata Sandi?</button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login;