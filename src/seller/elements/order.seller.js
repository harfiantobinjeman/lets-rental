import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Overlay, Pagination } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { APIRequest } from '../../Axios'

function Order(){
    const [image, setImage] = useState("https://greatdubai.com/sell-car-rentals/wp-content/uploads/sites/4/2022/05/SONATA-hero-option1-764A5360-edit-640x354-1.jpg");
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const [invoice, SetInvoice] = useState([])
    const [invoiceDetails, SetInvoiceDetails] = useState([])

    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }

    const onGetDataInvoice = () => {
        //setLoading(true)
        APIRequest({
            method: "get",
            url: "api/Product/InvoiceGetDataAll",
            params: {
                
            }
        }).then((res) => {
            if (res.status === 200) {
                SetInvoice(res.data.map((item) => {
                    return {
                        NoInvoice: item.invoice_id,
                        BuyDate: item.buy_date,
                        TotalItem: item.total_item,
                        TotalPrice: item.total_price,
                        name: item.name,
                        car_brand: item.car_brand
                    }
                }))
            }
        }).catch((e) => {
            alert("error " + e.response.data)
        }).finally(() => {
            //setLoading(false)
        })
    }
    // Use Effet to getData
    useEffect(() => {
        onGetDataInvoice();
    }, [])

    function handleDetailMain(){
        setdetailMainDisplay("border-0 shadow-sm text-start mt-3 px-2 py-2");
        setdetailDisplay("border-0 shadow-sm text-start mt-3 px-2 py-2 d-none");
    }
    function handleDetail(id){
        setdetailMainDisplay("border-0 shadow-sm text-start mt-3 px-2 py-2 d-none");
        setdetailDisplay("border-0 shadow-sm text-start mt-3 px-2 py-2");

        console.log(id)
        APIRequest({
            method: "get",
            url: "api/product/InvoiceDetailGetData",
            params: {
                invoiceid: id
            }
        }).then((res) => {
            if (res.status === 200) {
                SetInvoiceDetails(res.data.map((item) => {
                    return {
                        NoInvoice: item.invoice_id,
                        BuyDate: item.buy_date,
                        TotalItem: item.total_item,
                        TotalPrice: item.car_rental_price*item.total_item,
                        name: item.car_brand,
                        merek: item.car_variant,
                        tahun: item.car_years,
                        srcImage: item.car_image
                    }
                }))
            }
        }).catch((e) => {
            alert("error " + e.response.data)
        }).finally(() => {
            //setLoading(false)
        })
    }

    const [detailDisplay, setdetailDisplay] = useState("border-0 shadow-sm text-start mt-3 px-2 py-2 d-none");
    const [detailMainDisplay, setdetailMainDisplay] = useState("border-0 shadow-sm text-start mt-3 px-2 py-2");

    return(
        <div className="my-1 ms-1 py-0" style={{borderRadius: "15px"}}>
            <Container className="px-3">
                <Row className="mt-0">
                    <Col md={12} className="">
                        <Card className={detailMainDisplay} style={{borderRadius: "10px"}}>
                            <Card.Body>
                                <h5 className="pb-0">Orders</h5>
                                <p className="mb-4">Here you can see the orders of your customers</p>
                                
                                <Table className="light-table">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Customer</th>
                                    <th>Invoice ID</th>
                                    <th>Items</th>
                                    <th>Subtotal</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {invoice.map((data,index)=>{
                                return <tr key={index}>
                                    <td>{index +1 }</td>
                                    <td>{data.name}</td>
                                    <td>INV{data.NoInvoice}</td>
                                    <td>{data.car_brand}</td>
                                    <td>{data.TotalPrice}</td>
                                    <td>
                                        <button  className='butt2' style={{width:"280px"}} onClick={() => handleDetail(data.NoInvoice)}>Details</button>
                                    </td>
                                </tr>})}
                                </tbody>
                                </Table>
                            </Card.Body>

                            <Card.Footer className="text-end bg-white pb-0 pt-3">
                                <Pagination>{items}</Pagination>
                            </Card.Footer>
                        </Card>

                        <Card className={detailDisplay}>
                        
                        <Card.Body >
                            <div className="">
                                <button className="btn btn-info" onClick={() => handleDetailMain()}>Kembali</button>
                                <h5 className="pb-0">Invoice Details</h5>;
                            </div>
                            
                            <Table className="light-table">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Invoice ID</th>
                                    <th>Buy Date</th>
                                    <th>Items</th>
                                    <th>Merek</th>
                                    <th>Tahun</th>
                                    <th>Gambar</th>
                                    <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                {invoiceDetails.map((data,index)=>{
                                return <tr key={index}>
                                    <td>{index +1 }</td>
                                    <td>INV{data.NoInvoice}</td>
                                    <td>{data.BuyDate}</td>
                                    <td>{data.name }</td>
                                    <td>{data.merek }</td>
                                    <td>{data.tahun }</td>
                                    <td><img src={data.srcImage } style={{width: "100px", height: "100px"}}/></td>
                                    <td>Rp. {data.TotalPrice}</td>
                                </tr>})}
                                </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Order;