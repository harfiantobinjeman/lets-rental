import React, { useContext } from 'react';
import { Navbar, Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate ,useParams} from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { loginContext } from '../../context/loginContext';
import { setAuthToken } from '../../Axios';

const logo = "./../img/logo.png";
const cart = "./../img/cart.png";
const invoice = "./../img/invoice.png";
const signout = "./../img/signout.png";

const item = 0;

function Header() {
  const handleLogout = () => {
    setIsLogin(false);
    setUserId(0)
    setAuthToken("")
  }

  const { isLogin, setIsLogin, setUserId } = useContext(loginContext)
  //useParams
  const params = useParams();
  const history = useNavigate();
  // console.log(history.)
  let pathName = window.location.pathname.split('/');

  //const [isLogin, setIsLogin] = useState(false);
  const [search, setSearch ] = useState("")
  const handleClick = ()=>{

  }
  if (isLogin) {
    return (
      <Navbar fixed="top" expand="lg" className="navbar-custom py-4" >
        <Container fluid className="d-block" sx={{ margin: "0 60px" }} >
          <Row className="align-items-center">
            <Col>
              <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => history("/homepage")}>
                {/* <Link style={{textDecoration: "none", color: "inherit"}} to={'/homepage'}> */}
                <img className="logo" src={logo} />Lets Rental
                {/* </Link> */}
              </Navbar.Brand>
            </Col>
            <Col id="search-field" className="relative items-align-center">
              <input
                type="search"
                className="form-control input-lg"
                placeholder="Search Car"
                onChange={(e)=>setSearch(e.target.value)}
              />
              <Link style={{ textDecoration: "none", color: "inherit" }} to={'../search/'+search}>
                <button type="submit" className="btn btn-primary btn-relative">
                  Search
                </button>
              </Link>
            </Col>
            {/* Logged in */}
            <Col className="text-end text-white">
              <Link to={'/cart'} className="relative" id='cart'>
                <img 
                className="icon me-5"
                src={cart} 
                />
                <Badge className="badge" bg="danger">{item}</Badge>
              </Link>
              <Link to={'/invoice'} className="relative">
                <img className="icon me-5" src={invoice} />
              </Link>
              <Link to={'/login'} className="relative" onClick={() => handleLogout()}>
                <img className="icon me-5" src={signout} />
              </Link>
            </Col>
            {/* /Logged in */}

          </Row>
        </Container>
      </Navbar>
    )
  } else {
    return (
      <Navbar fixed="top" expand="lg" className="navbar-custom py-4">
        <Container fluid className="d-block" style={{ margin: "0 60px"}}>
          <Row className="align-items-center">
            <Col>
              <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => history("/homepage")}>
              <Box sx={(theme)=>({
                position:'absolute',
                left:'30px',
                top:'25px',
                width:'100%',
                height:'100%',
                [theme.breakpoints.down('sm')]: {
                  position:'absolute',
                  left:'30px',
                  top:'25px',
                  width:'100%',
                  height:'100%',
                },
              })}>
                {/* <Link style={{textDecoration: "none", color: "inherit"}} to={'/homepage'}> */}
                <img className="logo" src={logo} />Lets Rental
                {/* </Link> */}
              </Box>
              </Navbar.Brand>
            </Col>
            <Col id="search-field" className="relative items-align-center">
            <Box sx={(theme)=>({
                position:'absolute',
                right:'50px',
                top:'-25px',
                width:'100%',
                height:'100%',
                [theme.breakpoints.down('sm')]: {
                  display:'none'
                },
            })}>
                <input
                  type="search"
                  className="form-control input-lg"
                  placeholder="Search Car"
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <Link style={{ textDecoration: "none", color: "inherit" }} to={'../search/'+search}>
                <button  type="submit" className="btn btn-primary btn-relative">
                  Search
                </button>
              </Link>
            </Box>
            </Col>
            {/* (Logout */}
            <Col className="text-end text-white">
              <Box sx={(theme)=>({
                position:'absolute',
                right:'220px',
                top:'35px',
                [theme.breakpoints.down('sm')]: {
                  display:'none'
                },
            })}>
              <div className="d-inline border-left py-2 me-4"></div>
              </Box>
              <Link to={'/signup'}>
              <Box sx={(theme)=>({
                position:'absolute',
                right:'120px',
                top:'25px',
                [theme.breakpoints.down('sm')]: {
                  display:'none'
                },
            })}>
                <button type="button" className="btn btn-text text-white fw-bold btn-lg me-3">
                  Sign Up
                </button>
                </Box>
              </Link>
              <Link to={'/login'}>
              <Box sx={(theme)=>({
                position:'absolute',
                right:'30px',
                top:'25px',
                [theme.breakpoints.down('sm')]: {
                  display:'none'
                },
            })}>
                <button type="button" className="btn btn-light text-primary fw-bold btn-lg">
                  Login
                </button>
              </Box>
              </Link>
            </Col>
            {/* /Logout */}
          </Row>
          <Box sx={(theme)=>({
            position:'absolute',
            right:'80px',
            top:'30px',
            width:'40px',
            height:'40px',
            backgroundColor:'white',
            padding:'6px',
            border: '2px solid #e9ecef',
            borderRadius:'10px',
            [theme.breakpoints.up('sm')]: {
              display:'none'
            },
        })}>
          <SearchIcon style={{color:'#517BCE'}} />
        </Box><Box sx={(theme)=>({
            position:'absolute',
            right:'80px',
            top:'30px',
            width:'40px',
            height:'40px',
            backgroundColor:'white',
            padding:'6px',
            border: '2px solid #e9ecef',
            borderRadius:'10px',
            [theme.breakpoints.up('sm')]: {
              display:'none'
            },
        })}>
          <SearchIcon style={{color:'#517BCE'}} />
        </Box>
        <Box sx={(theme)=>({
            position:'absolute',
            right:'30px',
            top:'30px',
            width:'40px',
            height:'40px',
            backgroundColor:'white',
            padding:'6px',
            border: '2px solid #e9ecef',
            borderRadius:'10px',
            [theme.breakpoints.up('sm')]: {
              display:'none'
            },
        })}>
          <MenuIcon style={{color:'#517BCE'}} />
        </Box>
        </Container>
      </Navbar>
    )
  }

}

export default Header;