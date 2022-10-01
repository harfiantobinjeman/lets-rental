import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const honda = "./img/honda.png";
const toyota = "./img/toyota.png";
const mitsubishi = "./img/mitsubishi.png";
const bmw = "./img/bmw.png";

function GridCategory() {

  const [listData, setListData] = useState([
    {
      src: honda,
      name: "honda"
    },
    {
      src: toyota,
      name: "toyota"
    },
    {
      src: mitsubishi,
      name: "mitsubishi"
    },
    {
      src: bmw,
      name: "bmw"
    }
  ])

  localStorage.removeItem("kategori")



  return (
    <div className="fotoDalam" style={{ marginLeft: "30px", marginRight: "60px", paddingTop: '20px', marginBottom: '30px' }}>
      <Container fluid>
        <Row>
          {listData.map((item, index) => {
            const link = `/category/${item.name}`;
            const objCar = {
              category: item.name
            }
            localStorage.setItem("kategori", JSON.stringify(objCar));
            return (
              <Col className="col-auto" key={index}>
                <Link style={{ textDecoration: "none", color: "inherit" }} to={`/category/${item.name}`}>
                  <div className="category-item" >
                    <img
                      className="d-block w-100"
                      src={item.src}
                      alt={item.name}
                    />
                  </div>
                </Link>
              </Col>
            )

          })}
        </Row>
      </Container>
    </div>
  );
}

export default GridCategory;