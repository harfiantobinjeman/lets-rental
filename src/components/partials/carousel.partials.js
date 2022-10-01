import React from 'react';
import { Carousel } from 'react-bootstrap';
import Box from '@mui/material/Box';
const slide1 = "./img/iklan 1.png";
const slide2 = "./img/iklan 2,2.png";
const slide3 = "./img/iklan 3.png";

function CarouselElement(){
    return (
      <Carousel 
      //   sx={(theme)=>({
      //   height:'320px',
      //   width:'100%',
      //   marginBottom:'20px',
      //     [theme.breakpoints.down('sm')]: {
      //       display:'none',
      //     },
      // })}
        >
        <Carousel.Item>
          <img
            className="d-blocker w-100"
            src={slide1}
            alt="First slide"
            width="1300px"
          />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-blocker w-100"
            src={slide2}
            alt="Second slide"
            width="1300px"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-blocker w-100"
            src={slide3}
            alt="Third slide"
            width="1300px"
          />
        </Carousel.Item>
      </Carousel>
    );
  }

  export default CarouselElement;