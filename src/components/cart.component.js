import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { APIRequest } from '../Axios'
import { loginContext, useLoginContext } from '../context/loginContext';

/* PARTIALS */
import Header from './partials/header.partials';
import Footer from './partials/footer.partials';
import { dataKeranjangStore } from '../state';
import { useRecoilState } from 'recoil'
const mobilHonda = "./../img/mobil-honda.jpg";
let data = [
    // {
    //     check: false,
    //     name: "Honda",
    //     brand: "Honda Brio",
    //     year: "2016",
    //     image: "./../img/mobil-honda.jpg",
    //     price: 500000,
    //     day: 1
    // },
    // {
    //     check: false,
    //     name: "Honda 2",
    //     brand: "Honda Brio 2",
    //     year: "2016 2",
    //     image: "./../img/mobil-honda.jpg",
    //     price: 600000,
    //     day: 1
    // }
]
function ItemCart() {

    //useNavigate
    const navigate = useNavigate();
    const { userId } = useLoginContext();
    /* Cart Item Components */
    const [CartItem, setCartitem] = useState([]);
    const [datakeranjang, setDataKeranjang] = useRecoilState(dataKeranjangStore)

    // useState per data
    const [day, setDay] = useState(1);
    //const [detail, setDetail] = useState("");
    const [harga, setHarga] = useState(0);
    const [id, setCarId] = useState(0);
    //const [keyWord, setKeyWord] = useState("");
    // const [merek,setMerek] = useState("");
    const [nama, setNama] = useState("");
    const [srcImage, setSrcImage] = useState("");
    //const [userID, setUserID] = useState(0);
    const [tahun, setTahun] = useState(0);

    useEffect(() => {
        setCartitem(datakeranjang)
    }, [JSON.stringify(datakeranjang)])
    /** SHOPPING DETAILS */
    const [Shopping, setShopping] = useState([
        {
            sumOfItems: 0,
            totalOfRents: 0
        }
    ]);
    const setShoppingSummary = () => {
        var count = 0
        var total = 0
        const newShopping = Shopping.map((obj) => {
            CartItem.map((val) => {
                if (val.check === true) {
                    count++;
                    total += (parseInt(val.harga) * val.day);
                }
            });
            return { ...obj, sumOfItems: count, totalOfRents: total }
        });
        setShopping(newShopping);
    }
    useEffect(() => {
        setShoppingSummary();
    }, [CartItem]);

    //tidak work
    //setShopping(newShopping);


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
        const newState = CartItem.map((obj, index) => {
            if (index === idx) {
                document.querySelectorAll(".checkForItem input[type=checkbox]")[idx].checked = true
                if (obj.day >= 1) {
                    return { ...obj, check: true, day: obj.day + 1 };
                }
            }
            return obj;
        });
        setCartitem(newState);
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
    }
    /** Delete checked item */
    const handleDelete = () => {
        let ambilData = JSON.parse(JSON.stringify(CartItem))
        let filt = ambilData?.filter(item => item.check !== true)
        setDataKeranjang(filt)
        var itemTotal = document.querySelectorAll(".checkForItem input[type=checkbox]").length;
        for (let i = 0; i < itemTotal; i++) {
            document.querySelectorAll(".checkForItem input[type=checkbox]")[i].checked = false;
        }
        // setDataKeranjang()
    };


    /** POST DATA */
    const onPostDataCart = (car_id = 1, rentedDays = 1, user_id = 1, car_image = "", car_name = "", car_years = 1999, car_rental_price = 0) => {
        //setLoading(true)
        APIRequest({
            method: "post",
            url: "api/User/CartPagePostData",
            data: {
                listData: CartItem.filter((item) => (item.check == true)).map((item) => {
                    return {
                        fk_car_id: item.id,
                        car_rental_days: item.day,
                        fk_user_id: userId,
                        car_image: item.srcImage,
                        car_name: item.nama,
                        car_years: item.tahun,
                        car_rental_price: item.harga,
                    }
                }),

            }
        }).then((res) => {
            if (res.status === 200) {
                console.log("success")
                navigate("/invoice")
                CartItem.forEach((item) => {
                    if (item.check == true) {
                        console.log("deleted car id", item.id)
                        handleDeleteOne(item.id)
                    }

                })

            }
        }).catch((e) => {
            alert("error " + e.response.data)
        }).finally(() => {
            //setLoading(false)
        })
    }
    const handleDeleteOne = (produkid) => {
        // let ambil = [...datakeranjang]
        // let indexFind = ambil?.findIndex(arr => arr.id == produkid)
        // ambil.splice(indexFind, 1)
        // setDataKeranjang(ambil)

        setDataKeranjang((prev) => {
            let deletedData = [...prev]
            let indexFind = deletedData?.findIndex(arr => arr.id == produkid)
            deletedData.splice(indexFind, 1)
            return deletedData;
        })
    }

    /** RENDER PAGE */
    return (
        <>
            <Col md={8} sm={12} className="mb-5 pe-5">
                {CartItem?.length ? <Row style={{ borderBottom: "2px solid grey" }} clasName="align-items-center">
                    <Col className="pb-3">
                        <Form.Check label="Select All" className="form-control-lg" onChange={checkAll} />
                    </Col>
                    <Col className="pb-3 text-end">
                        <Button variant="transparent" className="text-danger fw-bold pe-0 mt-1" onClick={handleDelete}>
                            <Icon.Trash3Fill size={18} className="bi me-2" />
                        </Button>
                    </Col>
                </Row> : "Keranjang anda kosong"}

                {CartItem.map((data, index) => {// useState per data
                    return <Row key={index} style={{ borderBottom: "1px solid grey" }} className="py-5 align-items-center">
                        <Col className="text-start col-auto">
                            <Form.Check aria-label={index} className="checkForItem form-control-lg ps-0" onClick={event => handleCheck(event, index)} />
                        </Col>
                        <Col>
                            <Row>
                                <Col md={6} sm={12}>
                                    <img src={data.srcImage} alt={data.nama} style={{ width: "200px" }} />
                                </Col>
                                <Col md={6} sm={12} className="ps-5">
                                    <h4 className="mb-5 fs-3 text-secondary">{data.nama}</h4>
                                    <h4 className="fs-3 text-primary">{data.tahun}</h4>
                                    <h3 className="text-dark fw-bold fs-3">Rp {data.harga}</h3>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="col-auto">
                            <button data-countofitem={index} className="btn btn-light py-0 px-3 bg-transparent border-0 fs-4 text-secondary fw-bold" style={{ marginTop: "-8px", marginLeft: "10px" }} onClick={event => decDay(event, index)}>-</button>
                            <input data-countofitem={index} className="countofitem form-control d-inline border-0 bg-transparent fs-4 text-primary fw-bold text-center" style={{ width: "40px" }} value={data.day} />
                            <button data-countofitem={index} className="btn btn-light py-0 px-3 bg-transparent border-0 fs-4 text-secondary fw-bold" style={{ marginTop: "-5px" }} onClick={event => incDay(event, index)}>+</button>
                        </Col>
                        <Col className="col-auto">
                            <Button variant="transparent" className="text-danger fw-bold pe-0 mt-1" onClick={() => handleDeleteOne(data.id)}>
                                <Icon.Trash3Fill size={18} className="bi me-2" />
                            </Button>
                        </Col>
                    </Row>
                })}
            </Col>
            <Col md={4} sm={12}>
                {Shopping.map((data, index) => {

                    return <Card key={index} style={{ borderRadius: "10px" }}>
                        <Card.Body className="px-4 py-4">
                            <h3 className="text-secondary-custom">Shopping Details</h3>
                            <Row className="py-3 px-3 fs-4" style={{ color: "#838383" }}>
                                <Col className="px-0 pb-4" style={{ borderBottom: "1px solid #b4b4b4" }}>Item</Col>
                                <Col className="px-0 text-end" style={{ borderBottom: "1px solid #b4b4b4" }}>{data.sumOfItems}</Col>
                            </Row>
                            <Row className="py-2 px-3 fs-4">
                                <Col className="px-0">
                                    <h4 className="text-secondary-custom">Total Rent</h4>
                                </Col>
                                <Col className="px-0">
                                    <h4 className="text-end text-secondary-custom">Rp. {data.totalOfRents}</h4>
                                </Col>
                            </Row>
                            <Button onClick={() => { onPostDataCart() }} variant="primary" className="btn bg-primary text-white fs-4 fw-bold py-3 border-0 mt-4 w-100 btn-block">Rent Now</Button>
                        </Card.Body>
                    </Card>
                })}
            </Col>
        </>
    )
}

function CartSection() {
    return (
        <Row className="panel-category px-2 mb-5">
            <ItemCart />
        </Row>
    )
}
function Recommended() {
    /** RECOMMENDATION */
    const [Recommendation, setRecommendation] = useState([
        // {
        //     id: 1,
        //     name: "Honda",
        //     brand: "Honda Brio",
        //     year: "2016",
        //     image: "./../img/mobil-honda.jpg",
        //     price: 500000
        // },
        // {
        //     id: 2,
        //     name: "Honda 2",
        //     brand: "Honda Brio 2",
        //     year: "2017",
        //     image: "./../img/mobil-honda.jpg",
        //     price: 600000
        // }
    ]);

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
        <Row className="bg-primary panel-category px-4">
            <Col className="col-12 pb-4">
                <h2 className="text-white fw-bold">Recommended</h2>
            </Col>

            {Recommendation.map((data, index) => {
                return <Col key={index} md={3} className="px-3">
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/product/${data.nama}/${data.tahun}`}>
                        <Card>
                            <Card.Img variant="top" src={data.srcImage} />
                            <Card.Body>
                                <Card.Title><h4 className="fw-bold text-secondary">{data.nama}</h4></Card.Title>
                                {/* <Card.Text> */}
                                <h4 className="fw-normal">{data.merek}</h4>
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
    );
}

function Detail() {
    return (
        <div>
            <Container fluid className="" style={{ padding: '0 80px', margin: "140px 0" }}>
                <Header />
                <CartSection />
                <Recommended />
            </Container>
            <Footer />
        </div>
    )
}

export default Detail;