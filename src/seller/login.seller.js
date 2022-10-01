import React ,{ useEffect, useState }from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { APIRequest, setAuthToken } from '../Axios';

const logoBlue = "./../img/logo-blue.png";

function Login(){
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('renter');
  const [loading, setLoading] = useState(false);
  const [isLogin , setIsLogin] = useState(false);



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
      url: 'api/Login/SellerLogin',
      data: {
        username: email,
        password: password,
        
      }
    })
      .then((res) => {
        if (res.status === 200) {
          // save auth token to local & axios
          const jwtToken = "Bearer " + res.data.jwtToken;
          setAuthToken(jwtToken);
          setIsLogin(true)

          const objLogin = {
            admin_id: res.data.admin_id,
            email: email,
            role: role,
            isLogin : true
            
          }
          localStorage.removeItem('seller');
          localStorage.setItem('seller',JSON.stringify(objLogin));
          

          // go to next page
          if(!errorInput) {
            history("/seller");
          }
     
        }
      })
      .catch((err) => {
        alert('LOGIN FAILED: ' + err.response.data)
      })
      .finally(() => setLoading(false))
  }

    return (
      <div style={{backgroundColor: "#f1f6ff"}}>
        <Container fluid>
        <Row style={{height: "100vh", background: "url('./../img/bg-login.png') center center no-repeat", backgroundSize: "50%"}} className="justify-content-center align-items-center">
            <Col md={3} style={{ marginTop: "-50px"}}>
              <h2 className="mb-5 text-primary text-center">
                <img className="logo" src={logoBlue}/>Lets Rental Seller
              </h2>
              <Card className="border-0 px-3 py-3 shadow">
                <Card.Body>
                  <Row className="justify-content-between align-items-center">
                    <Col className="text-center">
                      <h2 className="text-secondary">Login</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-start">
                      <label className="mb-1 mt-5">Nama Pengguna</label>
                      <input 
                      type="email" 
                      autoComplete="true" 
                      autoFocus={true} 
                      className="form-control input-lg" 
                      placeholder="Contoh : renter@letsrental.co.id" 
                      label ="Email"
                      value ={email}
                      onChange={(e) => {setEmail(e.target.value)}}
                      /*
                      type="email"
                      autoComplete="true"
                      autoFocus={true}
                      className="form-control input-lg"
                      placeholder="Contoh: customer@letsrental.co.id"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                      */
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
                      label ="Password"
                      value ={password}
                      onChange={(e) => setPassword(e.target.value)}
                      /*  
                       type="password"
                      className="form-control input-lg"
                      placeholder="Kata Sandi"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      */

                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      {/* Hilangkan Komponen Link untuk membuat proses login */}
                      <Link to="/seller">
                        <button className="btn btn-primary bg-primary border-0 fw-bold text-white btn-block w-100 py-3 fs-5" onClick={onLogin}>Masuk</button>
                      </Link>
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