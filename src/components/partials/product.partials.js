import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { APIRequest, setAuthToken } from '../../Axios'

const Honda = "./img/mobil-honda.jpg";
const Mitsubishi = "./img/mobil-mitsubishi.jpg";
const BMW = "./img/mobil-bmw.png";
const Toyota = "./img/mobil-toyota.jpg";

function CardProduct() {
  const params = useParams()
  const searching = params.search 
  //const name = params.name
  //const year = params.name
  const [loading,setLoading] = useState(true);

  const [listData, setListData] = useState([]);

  const onGetDataSeller = (Rows = 8) => {
    //Get Data 
    APIRequest({
      method: "get",
      url: "api/Product/HomePageGetData",
      params: {
        rowPerPage: Rows
      }

    }).then((res) => {
      if (res.status === 200) {
       
        setListData(res.data.map((item) => {
          //console.log(item)
          return { 
            productName: item.product_name,
            carYear: item.car_years,
            carRentalPrice: item.car_rental_price,
            carImage: item.car_image,
            carType: item.car_variant,
            description: item.description,
            carTags: item.keywords
          }
        }))
      }else {
        //console.log.log(res.data)
      }
    }).catch((e) => {
        console.log("error" + e.response.data)
    
    
    }).finally(() => {
        setLoading(false)
    })
  }
  //console.log(listData)
  useEffect(() => {
    onGetDataSeller(8)
  },[])



  return (
    <Container fluid className="" style={{ padding: '0 80px', marginBottom: "140px" }}>
      <Row className="bg-primary panel-category px-4h">
        <Col className="col-12 pb-4">
          <h2 className="text-white fw-bold">New Ready</h2>
        </Col>
        {listData.map((item, index) => {
          return (
            <Col md={3} className="px-3" key={index}>
              <Link style={{ textDecoration: "none", color: "inherit" }} to={`../product/${item.productName}/${item.carYear}`}>
                <Card>{/* style={{ width: '18rem' }} */}
                  <Card.Img variant="top" src={item.carImage} style={{ objectFit: "contain"}} />
                  <Card.Body >
                    <Card.Title className="h4 text-secondary">
                      {item.nama}
                    </Card.Title>
                    {/* <Card.Text> */}
                    <h4 className="fw-normal">{item.productName}</h4>
                    {/* </Card.Text> */}
                    <div className="category-footer">
                      <h4 className="fw-normal text-primary">{item.carYear}</h4>
                      <h4 className="">{("Rp " + item.carRentalPrice)}</h4>
                    </div>
                  </Card.Body>
                </Card>
                </Link>
            </Col>
          )
        })}
      </Row>
    </Container>
  );
}

export default CardProduct;


    // {
    //   nama: "Honda",
    //   merek: "Honda Brio",
    //   tahun: "2016",
    //   srcImage: Honda,
    //   harga: "300.000"
    // },
    // {
    //   nama: "BMW 5",
    //   merek: "BMW",
    //   tahun: "2022",
    //   srcImage: BMW,
    //   harga: "1.500.000"
    // },
    // {
    //   nama: "Outlander PEHV",
    //   merek: "Mitsubishi",
    //   tahun: "2022",
    //   srcImage: Mitsubishi,
    //   harga: "900.000"

    // },
    // {
    //   nama: "Venza",
    //   merek: "Toyota",
    //   tahun: "2021",
    //   srcImage: Toyota,
    //   harga: "700.000"
    // }