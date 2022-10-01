import { listClasses } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Overlay, Pagination } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { APIRequest, setAuthToken } from '../../Axios'
import { useNavigate } from 'react-router-dom';

const NoImage = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";

function Page() {
    const [carImage, setCarImage] = useState(NoImage);
    const [productName, setProductName] = useState("Mitsubishi Outlander PHEV");
    const [carRentalPrice, setCarRentalPrice] = useState(900000);
    const [carType, setCarType] = useState("Mitsubishi");
    const [carYear, setCarYear] = useState(2022);
    const [carTags, setCarTags] = useState("Mitsubishi, Outlander, offroad");
    const [desc, setDescription] = useState("Mobil Mitsubishi Outlander 2022");

    const [loading, setLoading] = useState(true);
    const [buttonType, setButtonType] = useState("add");

    const [listDataCar, setListDataCar] = useState([]);

    const [page, setPage] = useState(1);

    //Navigate
    const navigate = useNavigate();

    const delimiterPrice = (price) => {
        let delimiter = ",";
        for (let index = 0; index < price.length; index++) {
            if (index % 3 == 0) {

            }
        }
    }
    const encodeImage = (e) => {
        //fungsi untuk convert base64
        const imageRaw = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
            setImage(fileReader.result);
            setCarImage(fileReader.result);

        }
        fileReader.readAsDataURL(imageRaw);
    }

    const isValidAlphanumeric = (text = "") => {
        if (!text) return false; // empty validation

        let regex = new RegExp("^[a-zA-Z0-9\s]");
        return regex.test(text) ? false : true;
    };

    const isValidNumeric = (integer = null) => {
        if (integer == null) return false; //null validation

        let regex = new RegExp("^[0-9]");
        return regex.test(integer) ? false : true;
    }

    const validateInput = () => {
        if (!productName) {
            return ("Nama mobil tidak boleh kosong");
        }
        if (!carType) {
            return ("Tipe/Category mobil tidak boleh kosong");
        }
        if (!carTags) {
            return ("Keywords mobil tidak boleh kosong");
        }
        if (!desc) {
            return ("Deskripsi mobil tidak boleh kosong");
        }
        if (!carYear) {
            return ("Tahun mobil tidak boleh kosong")
        }
        if (!carRentalPrice) {
            return ("harga mobil tidak boleh kosong")
        }

        return ""
    }

    const onPostDataSeller = (Type = "add") => {
        if (Type == "edit") {
            const DataSellerLocalStorage = localStorage.getItem("seller") ? JSON.parse(localStorage.getItem("seller")) : {};
            // post Data
            setLoading(true)
            APIRequest({
                method: "post",
                url: "api/Admin/SellerProductUpdatePost",
                data: {
                    product_name: productName,
                    car_years: carYear,
                    car_rental_price: carRentalPrice,
                    car_image: carImage,
                    car_variant: carType,
                    description: desc,
                    keywords: carTags,
                    type: Type,
                    fk_admin_id: DataSellerLocalStorage.admin_id,

                }
            }).then((res) => {
                if (res.status === 200) {
                    onGetDataSeller(page);

                }

            }).catch((e) => {
                alert("error " + e.response.data)
            }).finally(() => {
                setLoading(false)
                addHandle();
            })
        }
        else {
            // setButtonType("add")
            const DataSellerLocalStorage = localStorage.getItem("seller") ? JSON.parse(localStorage.getItem("seller")) : {};
            //console.log(DataSellerLocalStorage);

            const validateinput = validateInput();
            if (validateinput) {
                alert(validateinput)
                return;
            }

            // post Data
            setLoading(true)
            APIRequest({
                method: "post",
                url: "api/Admin/SellerProductPost",
                data: {
                    product_name: productName,
                    car_years: carYear,
                    car_rental_price: carRentalPrice,
                    car_image: carImage,
                    car_variant: carType,
                    description: desc,
                    keywords: carTags,
                    type: Type,
                    fk_admin_id: DataSellerLocalStorage.admin_id,

                }
            }).then((res) => {
                if (res.status === 200) {
                    onGetDataSeller(page);
                    setCarImage(NoImage)
                    setProductName("")
                    setCarRentalPrice(0)
                    setCarYear(0)
                    setCarTags("")
                    setDescription("")

                }

            }).catch((e) => {
                alert("error " + e.response.data)
            }).finally(() => {
                setLoading(false)

            })
        }
    }

    const editHandle = () => {
        setClassAddProduct("d-none align-items-strech");
        setClassEditProduct("d-flex align-items-strech");
    }

    const addHandle = () => {
        setClassAddProduct("d-flex align-items-strech");
        setClassEditProduct("d-none align-items-strech");
    }

    const onGetDataSeller = (Page = 1) => {
        // get Data
        setLoading(true)
        //console.log("SEBELUM APIRequest")
        //console.log(Page)
        APIRequest({
            method: "get",
            url: "api/Admin/SellerProductGet",
            params: {
                rowPerPage: 10,
                page: Page

            }
        }).then((res) => {
            if (res.status === 200) {
                setListDataCar(res.data.map((item) => {
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
                setPage(Page)
                //alert("RES OK")
            }
        }).catch((e) => {
            alert("error " + e.response.data)
        }).finally(() => {
            setLoading(false)
            //console.log("FINALLY")
        })

    }

    const onDeleteDataSeller = (carName = listDataCar.productName) => {

        //Axios
        APIRequest({
            method: "get",
            url: "api/Admin/SellerDeleteProduct",
            params: {
                productname: carName
            }
        }).then((res) => {
            if (res.status == 200) {
                alert(`delete ${carName} success`)
                window.location.reload();
                //navigate("/seller/product")
            }
        }).catch((e) => {
            console.log("error" + e.response.data)

        }).finally(() => {

        })
    }
    useEffect(() => {
        onGetDataSeller(1);
    }, [])

    const onUpdateDataSeller = (carbrand = listDataCar.productName , carimage = listDataCar.carImage , carrentalprice = listDataCar.carRentalPrice , type = listDataCar.carType , years = carYear,tags = listDataCar.carTags , desc= listDataCar.description) => {
        //Axios
        APIRequest({
            method: "get",
            url: "api/Admin/SellerEditProduct",
            params: {
                carbrand:carbrand,
                carimage:carimage,
                carrentalprice:carrentalprice,
                type:type,
                years:years,
                tags:tags,
                desc:desc,
            }
            
        }).then((res) => {
            if(res.status == 200) {
                setListDataCar(res.data.map((item) => {
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
            }

        }).catch((error) => {
            console.log("error on update ",error.response.data)
        }).finally(() => {
            
        })
    }

    //console.log("test")
    const [ClassAddProduct, setClassAddProduct] = useState("d-flex align-items-stretch");
    const [ClassEditProduct, setClassEditProduct] = useState("d-none align-items-stretch");
    const [image, setImage] = useState("");
    const [show, setShow] = useState(false);
    const target = useRef(null);

    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === page} onClick={() => {
                onGetDataSeller(number)
            }

            }>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div className="my-1 ms-1 py-0" style={{ borderRadius: "15px" }}>
            <Container className="px-3">
                <Row className="mt-0">
                    {/** Add Products */}
                    <Col md={4} className={ClassAddProduct}>
                        <Card className="border-0 shadow-sm text-start mt-3 px-2 py-2" style={{ borderRadius: "10px" }}>
                            <Card.Body>
                                <h5 className="pb-0">Add Product</h5>
                                <p className="mb-4">Add product to improve your collections</p>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <div className="btn-file mb-2">
                                            <img src={image} alt="Pick image file to preview" style={{ display: "block", width: "100%", objectFit: "contain" }} />
                                        </div>
                                        {/* Onchange set image state to url or base64 format from related image */}
                                        <Form.Control type="file" className="" accept="image/*" onChange={encodeImage} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control type="text" placeholder="Give the name of the product" value={productName} onChange={(e) => { setProductName(e.target.value) }} />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control type="number" placeholder="ex. 100000" value={carRentalPrice.toString()} onChange={(e) => {
                                                    setCarRentalPrice(Number(e.target.value))

                                                }} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label >Type/Category</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={carType}
                                                    onChange={(e) => { setCarType(e.target.value) }}>

                                                    <option value="Honda">Honda</option>
                                                    <option value="Toyota" >Toyota</option>
                                                    <option value="Mitsubishi" >Mitsubishi</option>
                                                    <option value="BMW">BMW</option>

                                                </Form.Control>

                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3" >
                                                <Form.Label>Year</Form.Label>
                                                <Form.Control type="number" placeholder="ex. 2012" value={carYear.toString()} onChange={(e) => { setCarYear(Number(e.target.value)) }} />
                                                <Form.Text className="text-muted" >
                                                    Year of production
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Tag(s)</Form.Label>
                                                <Form.Control type="text" placeholder="" value={carTags} onChange={(e) => { setCarTags(e.target.value) }} />
                                                <Form.Text className="text-muted" >
                                                    Split by comma (,)
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>



                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={desc} onChange={(e) => { setDescription(e.target.value) }} />
                                        <Form.Text className="text-muted" >
                                            Let your customers know more about this product
                                        </Form.Text>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Button className="" variant="primary" onClick={() => {
                                                onPostDataSeller("add");

                                            }}>Submit Car</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/** Add Products */}
                    <Col md={4} className={ClassEditProduct}>
                        <Card className="border-0 shadow-sm text-start mt-3 px-2 py-2" style={{ borderRadius: "10px" }}>
                            <Card.Body>
                                <h5 className="pb-0">Edit Product</h5>
                                <p className="mb-4">Edit product to update your collections</p>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <div className="btn-file mb-2">
                                            <img src={image} alt="Pick image file to preview" style={{ display: "block", width: "100%", objectFit: "contain" }} />
                                        </div>
                                        {/* Onchange set image state to url or base64 format from related image */}
                                        <Form.Control type="file" className="" accept="image/*" onChange={encodeImage} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control type="text" placeholder="Give the name of the product" value={productName} onChange={(e) => { setProductName(e.target.value) }} />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control type="number" placeholder="ex. 100000" value={carRentalPrice.toString()} onChange={(e) => {
                                                    setCarRentalPrice(Number(e.target.value))
                                                }} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label >Type/Category</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={carType}
                                                    onChange={(e) => { setCarType(e.target.value) }}>

                                                    <option value="Honda">Honda</option>
                                                    <option value="Toyota" >Toyota</option>
                                                    <option value="Mitsubishi" >Mitsubishi</option>
                                                    <option value="BMW">BMW</option>

                                                </Form.Control>

                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3" >
                                                <Form.Label>Year</Form.Label>
                                                <Form.Control type="number" placeholder="ex. 2012" value={carYear.toString()} onChange={(e) => { setCarYear(Number(e.target.value)) }} />
                                                <Form.Text className="text-muted" >
                                                    Year of production
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Tag(s)</Form.Label>
                                                <Form.Control type="text" placeholder="" value={carTags} onChange={(e) => { setCarTags(e.target.value) }} />
                                                <Form.Text className="text-muted" >
                                                    Split by comma (,)
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>



                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={desc} onChange={(e) => { setDescription(e.target.value) }} />
                                        <Form.Text className="text-muted" >
                                            Let your customers know more about this product
                                        </Form.Text>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Button className="" variant="success" onClick={() => {
                                                  onUpdateDataSeller(productName ,carImage , carRentalPrice , carYear,carTags , desc);

                                            }}>Update Car</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8} className="d-flex align-items-stretch">
                        <Card className="border-0 shadow-sm text-start mt-3 px-2 py-2" style={{ width: "100%", borderRadius: "10px" }}>
                            <Card.Body>
                                <h5 className="pb-0">List of Products</h5>

                                <p className="mb-4">This is place that you manage your products</p>

                                <Row className="mb-2">
                                    {/* <Col>
                                    <Button variant="primary">Primary</Button>
                                </Col>
                                <Col className="text-end">
                                    <Button variant="primary">Primary</Button>
                                </Col> */}
                                </Row>

                                <Table className="light-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Category</th>
                                            <th>Year</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listDataCar.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1})</td>
                                                    <td>{item.productName}</td>
                                                    <td>{item.carRentalPrice}</td>
                                                    <td>{item.carType}</td>
                                                    <td>{item.carYear}</td>
                                                    <td>
                                                        <Button variant="primary" className="btn-sm me-1 px-3" ref={target} onClick={() => setShow(!show)}>
                                                            <Icon.Eye className="bi" />
                                                        </Button>
                                                        <Button variant="success" className="btn-sm me-1 px-3" onClick={() => editHandle()}>
                                                            <Icon.Pencil className="bi" />
                                                        </Button>
                                                        <Button variant="danger" className="btn-sm me-1 px-3" onClick={() => { onDeleteDataSeller(item.productName) }}>
                                                            <Icon.Trash className="bi" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </Table>
                            </Card.Body>

                            <Card.Footer className="text-end bg-white pb-0 pt-3">
                                <Pagination>{items}</Pagination>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Overlay */}
            <Overlay target={target.current} show={show} placement="top">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{
                            position: 'absolute',
                            backgroundColor: 'white',
                            padding: '10px',
                            color: 'white',
                            boxShadow: '0 0 10px grey',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        <img src={image} style={{ display: "block", width: "100%", maxWidth: "200px" }} />
                    </div>
                )}
            </Overlay>
        </div>
    )
}

export default Page;