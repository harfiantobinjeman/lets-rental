import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil'
import { dataKeranjangStore } from '../state';
import { APIRequest } from '../Axios';
import { loginContext } from '../context/loginContext';
/* PARTIALS */
import Header from './partials/header.partials';
import Footer from './partials/footer.partials';
import { useParams } from 'react-router-dom';
import { WindowSidebar } from 'react-bootstrap-icons';




const dataProduct = [
  // {
  //   id: 1,
  //   nama: "BMW",
  //   merek: "BMW",
  //   check: false,
  //   tahun: "2018",
  //   srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
  //   harga: "500000",
  //   tgglInputan: "06/28/2022",
  //   keyWord: "BMW Murah",
  //   day: 1,
  //   detail: "BMW Brio adalah mobil hatchback yang banyak diminati masyarakat indonesia karena masuk kategori mobil LCGC yang mana harga terjangkau dan irit bensin"
  // },
  // {
  //   id: 2,
  //   nama: "Mitsubhisi",
  //   merek: "Mitsubishi",
  //   check: false,
  //   tahun: "2011",
  //   srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
  //   harga: "300000",
  //   tgglInputan: "06/30/2022",
  //   keyWord: "Mitsubhisi Murah",
  //   day: 1,
  //   detail: "Mitsubhisi adalah mobil hatchback yang banyak diminati masyarakat indonesia karena masuk kategori mobil LCGC yang mana harga terjangkau dan irit bensin"

  //   },
  // {
  //   id: 3,
  //   nama: "Honda",
  //   check: false,
  //   merek: "Honda",
  //   tahun: "2021",
  //   srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
  //   harga: "170000",
  //   tgglInputan: "08/02/2022",
  //   keyWord: "Honda Murah",
  //   day: 1,
  //   detail: "HOnda adalah mobil hatchback yang banyak diminati masyarakat indonesia karena masuk kategori mobil LCGC yang mana harga terjangkau dan irit bensin"

  // }
  // {
  //   id: 4,
  //   nama: "Toyota",
  //   check: false,
  //   merek: "Toyota",
  //   tahun: "2022",
  //   srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
  //   harga: "150000",
  //   tgglInputan: "07/08/2022",
  //   keyWord: "Toyota Murah",
  //   day: 1,
  //   detail: "Toyota adalah mobil hatchback yang banyak diminati masyarakat indonesia karena masuk kategori mobil LCGC yang mana harga terjangkau dan irit bensin"

  // }
]
/* Components */
const mobilHonda = "./../img/mobil-honda.jpg";
const logo = "../img/logo.png";
const cart = "../img/cart.png";
const invoice = "../img/invoice.png";
const signout = "../img/signout.png";

function DetailOfProduct() {

  //useNavigate
  const navigate = useNavigate();

  const { isLogin, setIsLogin, setUserId } = useContext(loginContext)

  const params = useParams()
  //const searching = params.id
  const name = params.name
  const year = params.year
  const [search, setSearch] = useState(0)
  const [CartItem, setCartitem] = useState([])
  const [day, setDay] = useState(1);
  const [check, setCheck] = useState(false)
  const [carname, setCarName] = useState(name)
  const [caryear, setCarYear] = useState(year)

  const onGetDetailOfProduct = (CarName = carname, CarYears = caryear, DaysRented = day, CheckStatus = check) => {

    //Axios
    APIRequest({
      method: "get",
      url: "api/Product/GetDetailProduct",
      params: {
        carName: CarName,
        carYears: CarYears,
        daysRented: DaysRented,
        checkStatus: CheckStatus
      }

    }).then((res) => {
      if (res.status == 200) {
        setCartitem(res.data.map((item) => {
          return {
            id: item.car_id,
            nama: item.product_name,
            check: CheckStatus,
            merek: item.car_variant,
            tahun: item.car_years,
            srcImage: item.car_image,
            harga: item.car_rental_price,
            keyWord: item.keywords,
            day: DaysRented,
            detail: item.description

          }
        }))
      }

    }).catch((e) => {
      console.log("error " + e.response.data)

    }).finally(() => {

    })
  }

  const location = useLocation();
  //console.log("location state", location.state);

  useEffect(() => {
    onGetDetailOfProduct(params.name, params.year, day, check)
  }, [])

  useEffect(() => {
    //let m = JSON.parse(JSON.stringify(dataProduct))
    //setCartitem([])
    setTimeout(() => {
      //search ? setCartitem(m?.filter(arr => arr.id == search)) : setCartitem(m)

      // setCartitem(dataProduct)
    }, 200)
  }, [search])
  //   const [CartItem, setCartitem] = useState([
  //     {
  //         check: false,
  //         name: "Honda",
  //         brand: "Honda Brio",
  //         year: "2016",
  //         image: "./../img/mobil-honda.jpg",
  //         price: 500000,
  //         day: 1,
  //         detail:"Honda Brio adalah mobil hatchback yang banyak diminati masyarakat indonesia karena masuk kategori mobil LCGC yang mana harga terjangkau dan irit bensin"
  //     },
  //     {
  //         check: false,
  //         name: "Honda 2",
  //         brand: "Honda Brio 2",
  //         year: "2016 2",
  //         image: "./../img/mobil-honda.jpg",
  //         price: 600000,
  //         day: 1,
  //         detail:"Honda Brio adalah mobil hatchback yang banyak diminati masyarakat indonesia karena masuk kategori mobil LCGC yang mana harga terjangkau dan irit bensin"
  //     }
  // ]);
  /** SHOPPING DETAILS */
  const [Shopping, setShopping] = useState([
    {
      sumOfItems: 0,
      totalOfRents: 0
    }
  ]);
  useEffect(() => {
    var count = 0
    var total = 0
    const newShopping = Shopping.map((obj) => {
      CartItem.map((val) => {
        if (val.check === true) {
          count++;
          total += (val.price * val.day);
        }
      });
      return { ...obj, sumOfItems: count, totalOfRents: total }
    });
    //setShopping(newShopping);
  }, [Shopping]);

  /** Select Toggle */
  const handleCheck = (e, idx) => {
    const newState = CartItem.map((obj, index) => {
      if (index === idx) {
        return { ...obj, check: e.target.checked }
      }
      return obj;
    });
    setCartitem(newState);
  };
  const checkAll = (e) => {
    var value = false
    if (e.target.checked) {
      value = true;
    }

    const newState = CartItem.map((obj) => {
      return { ...obj, check: value };
    });
    setCartitem(newState);

    var itemTotal = document.querySelectorAll(".checkForItem input[type=checkbox]").length;
    for (let i = 0; i < itemTotal; i++) {
      document.querySelectorAll(".checkForItem input[type=checkbox]")[i].checked = value
    }
  }

  /** Set Day for each item */
  const incDay = (e, idx) => {

    // const newState = CartItem.map((obj, index) => {
    //     if (index === idx) {
    //         document.querySelectorAll(".checkForItem input[type=checkbox]")[idx].checked = true
    //         if(obj.day >= 1){
    //             return {...obj, check: true, day: obj.day+1};
    //         }
    //     }
    //     return obj;
    // });
    let ambil = JSON.parse(JSON.stringify(CartItem))
    ambil[0].day = ambil[0].day + 1
    //setCartitem([])
    setTimeout(() => {
      setCartitem(ambil);
    }, 100)
  }
  const decDay = (e, idx) => {
    const newState = CartItem.map((obj, index) => {
      if (index === idx) {
        if (obj.day > 1) {
          return { ...obj, day: obj.day - 1 };
        }
      }
      return obj;
    });
    setCartitem(newState);
    let ambil = JSON.parse(JSON.stringify(CartItem))
    if (ambil[0].day - 1 < 1) {

    } else {
      ambil[0].day = ambil[0].day - 1

    }
    //setCartitem([])
    setTimeout(() => {
      setCartitem(ambil);
    }, 100)
  }
  /** Delete checked item */
  const handleDelete = () => {
    setCartitem(current =>
      current.filter(item => {
        return item.check !== true;
      }),
    );
    var itemTotal = document.querySelectorAll(".checkForItem input[type=checkbox]").length;
    for (let i = 0; i < itemTotal; i++) {
      document.querySelectorAll(".checkForItem input[type=checkbox]")[i].checked = false;
    }
  };

  const [datakeranjang, setDataKeranjang] = useRecoilState(dataKeranjangStore)
  const handleAddtoChart = () => {
    if (!isLogin) {
      alert("Please Login To Add Item To Cart!")
      return;
    }
    let ambilData = JSON.parse(JSON.stringify(datakeranjang))
    if (ambilData?.findIndex(arr => arr.id == CartItem[0].id) != -1) {
      window.alert("data sudah ada di keranjang")
    } else {
      window.alert("data berhasil di tambahkan ke keranjang")
      ambilData.push(CartItem[0])
    }
    setDataKeranjang(ambilData)
  }

  /** POST DATA */
  return (
    <>
      {CartItem.map((data, index) => {
        return <> <Row className="product-detail" style={{ margin: "100px 60px", marginTop: "150px", marginBottom: "60px" }}>
          <Col md={4}>
            <img className="product-img" src={data.srcImage} alt="Honda Brio" />
          </Col>
          <Col>
            <h1 className="mb-5 fs-1 fw-bold text-secondary">{data.nama}</h1>
            <h3 className="text-primary fw-bold fs-2">Rp {data.harga}</h3>
          </Col>
          <Col>
            <div className="fw-bold fs-4 text-secondary d-inline-block">Days</div>
            <button data-countofitem={index} className="btn btn-light py-0 px-3 bg-transparent border-0 fs-4 text-secondary fw-bold" style={{ marginTop: "-8px", marginLeft: "10px" }} onClick={event => decDay(event, data.id)}>-</button>
            <input data-countofitem={index} className="countofitem form-control d-inline border-0 bg-transparent fs-4 text-primary fw-bold text-center" style={{ width: "40px" }} value={data.day} />
            <button data-countofitem={index} className="btn btn-light py-0 px-3 bg-transparent border-0 fs-4 text-secondary fw-bold" style={{ marginTop: "-5px" }} onClick={event => incDay(event, data.id)}>+</button>

            <div className="mt-4">
              <div className="fw-bold fs-4 text-secondary d-inline-block">Total Rent</div>
              <input className="form-control d-inline border-0 bg-transparent fs-4 text-secondary fw-bold text-center" style={{ width: "200px" }} value={"Rp. " + (parseInt(data.harga) * data.day)} onChange={() => { }} />
            </div>

            <div className="mt-4">
              <button className="btn bg-primary text-white fs-4 fw-bold py-3 btn-block" onClick={() => { handleAddtoChart(); navigate("/cart") }} style={{ width: "70%" }}>Add to Cart</button>
              {/* <button className="btn mt-3 test-primary text-primary border-primary fs-4 fw-bold py-3 btn-block" style={{ width: "70%" }}>Rent Now</button> */}
            </div>
          </Col>
        </Row>
          <Row style={{ margin: "40px 60px" }}>
            <Col>
              <div className="h3 mb-4 fw-bold text-dark">Detail</div>
              <div className="mb-4">
                <div className="d-inline h3 text-dark">Type: </div>
                <div className="d-inline h3 fw-bold text-dark">{data.merek}</div>
              </div>
              <div className="mb-5">
                <div className="d-inline h3 text-dark">Years: </div>
                <div className="d-inline h3 fw-bold text-dark">{data.tahun}</div>
              </div>
              <div className="mb-4">
                <p className="h3 fw-normal" style={{ lineHeight: "30px" }}>
                  {data.detail}
                </p>
              </div>
              <div className="mb-4 mt-5 border-top border-secondary"></div>
            </Col>
          </Row>
        </>
      })}
    </>
  )
}

function Recommended() {
  const [Recommendation, setRecommendation] = useState([]);

  const onGetRecommendation = (rows = 4) => {
    //Axios
    APIRequest({
      method: "get",
      url: "api/Product/RecommendationGetData",
      params: {
        rowsPerPage: rows
      }

    }).then((res) => {
      if (res.status == 200) {
        setRecommendation(res.data.map((item) => {
          return {
            nama: item.product_name,
            tahun: item.car_years,
            harga: item.car_rental_price,
            merek: item.car_variant,
            srcImage: item.car_image,      
            keyWord: item.keywords,
            detail: item.description
          }
        }))
       
        
      }

    }).catch((error) => {
      console.error("error get Recommendation" + error.response.data);

    }).finally(() => {

    })

  }
  useEffect(() => {
    onGetRecommendation(4)
  }, [Recommendation])
  return (
    <Container fluid className="" style={{ padding: '0 80px', marginBottom: "140px" }}>
      <Row className="bg-primary panel-category px-4" >
        <Col className="col-12 pb-4">
          <h2 className="text-white fw-bold">Recommended</h2>
        </Col>
        {Recommendation.map((data, index) => {
          console.log(data)
          return <Col key={index} md={3} className="px-3">
            <Link  style={{ textDecoration: "none", color: "inherit" }} to={`/product/${data.nama}/${data.tahun}`} onClick={() => setTimeout(() => window.location.reload(), 10)} >
              <Card>
                <Card.Img variant="top" src={data.srcImage}/>
                <Card.Body>
                  <Card.Title><h4 className="fw-bold text-secondary">{data.merek}</h4></Card.Title>
                  {/* <Card.Text> */}
                  <h4 className="fw-normal">{data.nama}</h4>
                  {/* </Card.Text> */}
                  <div className="categpry-footer">
                    <h4 className="fw-normal text-primary">{data.tahun}</h4>
                    <h4 className="fw-bold">Rp. {data.harga}</h4>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        })}
      </Row>
    </Container>
  );
}

function Detail() {
  return (
    <div>
      <Header />
      <DetailOfProduct />
      <Recommended />
      <Footer />
    </div>
  )
}

export default Detail;