import React, { useState, useEffect } from 'react';

/* PARTIALS */
import Header from './partials/header.partials';
import Footer from './partials/footer.partials';

/*style component */
import {DivComponentAtas} from './partials/style.component';
import { Link, useParams } from 'react-router-dom';
import style from 'styled-components';

import { APIRequest } from '../Axios'

const DivComponentIsi = style.div
    `
        width:90%;
        margin-left:85px;
        padding-top : 20px;
        font-family:"Open Sans", sans-serif;
        font-size: 24px;
    `
const DivIsipertma = style.div
    `
        width:90%;
        padding-bottom : 30px;
        font-family:"Open Sans", sans-serif;
        font-size: 24px;
    `
const DivIsiKedua = style.div
    `
        width:90%;
        height:400px;
        font-family:"Open Sans", sans-serif;
        font-size: 24px;
        overflow:auto;
    `
    const DivRentIsi = style.div
    `
    `
    const DivIsiRent2 = style.div
    `
      width:100%;
      display:flex;
      margin-top:20px;
      margin-bottom:20px;
    `


function Invoice(){
    /** INVOICE STATE */
    const [invoice, SetInvoice]=useState([
        {
            NoInvoice:"",
            BuyDate:"",
            TotalItem:"",
            TotalPrice:"",
            nama:"",
            merek:"",
            tahun:"",
            srcImage:"",
        }
    ]);
    /** GET INVOICE FROM PARAMS */
    const { id } = useParams();
    const onGetDataInvoice = () => {
        //setLoading(true)
        APIRequest({
            method: "get",
            url: "api/product/InvoiceDetailGetData",
            params: {
                invoiceid: id
            }
        }).then((res) => {
            if (res.status === 200) {
                SetInvoice(res.data.map((item) => {
                    console.log(item.car_rental_price,item.total_item)
                    return {
                        NoInvoice: item.invoice_id,
                        BuyDate: item.buy_date,
                        TotalItem: item.total_item,
                        TotalPrice: item.car_rental_price*item.total_item,
                        nama: item.car_brand,
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
    // Use Effet to getData
    useEffect(() => {
        onGetDataInvoice();
    }, [])



    /** RENDER PAGE */
    return(
        <div>
            <Header/>
            <DivComponentAtas>
                <Link style={{textDecoration: "none", color: "inherit"}} to={'/homepage'}>
                   <b>{'Home'}</b></Link>
                    {'> '}
                    <Link style={{textDecoration: "none", color: "inherit"}} to={'/invoice'}>
                    <b>{'Invoice'}</b> </Link>
                    {'> '}
                    <b style={{color:'#517BCE'}}>{'Detail invoice'}</b>
            </DivComponentAtas>

            <DivComponentIsi style={{fontSize:'24px', fontColor:'#4F4F4F'}}>
                <DivIsipertma><b>Invoice Menu</b></DivIsipertma>

                {invoice.map((data,index)=>{
                <DivIsipertma key={index}>
                    <DivIsiRent2>
                        <DivRentIsi style={{width:'200px'}}>
                            No. Invoice :
                        </DivRentIsi>
                        <DivRentIsi>
                            {data.NoInvoice}
                        </DivRentIsi>
                    </DivIsiRent2>

                    <DivIsiRent2>
                        <DivRentIsi style={{width:'200px'}}>
                            Tanggal Beli :
                        </DivRentIsi>
                        <DivRentIsi style={{textAlign:'right'}}>
                            {data.buyDate}
                        </DivRentIsi>
                        <DivRentIsi style={{textAlign:'right',width:'480px'}}>
                            <b>Total Price</b>
                        </DivRentIsi>
                        <DivRentIsi style={{textAlign:'right',width:'284.5px'}}>
                            <b>Rp {data.TotalPrice}</b>
                        </DivRentIsi>
                    </DivIsiRent2>
                </DivIsipertma>
                })}

                <DivIsiKedua>
                    <table id="customers">
                    <tbody>
                    <tr style={{fontFamily:'Open-Sans'}}>
                        <th>No</th>
                        <th>Car Name</th>
                        <th>Type</th>
                        <th>Day Rent</th>
                        <th>Price</th>
                    </tr>
                    {invoice.map((data,index)=>{
                    return <tr key={index}>
                        <td>{index +1 }</td>
                        <td>{data.nama}</td>
                        <td>{data.merek}</td>
                        <td>{data.TotalItem}</td>
                        <td>{data.TotalPrice}</td>
                    </tr>
                    })}
                    </tbody>
                    </table>
                </DivIsiKedua>
            </DivComponentIsi>
            <Footer/>
        </div>
    )
}

export default Invoice;