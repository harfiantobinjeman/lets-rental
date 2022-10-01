import React, { useState, useEffect, useContext } from 'react';

/* PARTIALS */
import Header from './partials/header.partials';
import Footer from './partials/footer.partials';

/*style component */
import {DivComponentAtas} from './partials/style.component';
import {Link} from 'react-router-dom';
import style from 'styled-components';

import { APIRequest } from '../Axios'

import { loginContext, useLoginContext } from '../context/loginContext';

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
    font-family:"Open Sans", sans-serif;
    font-size: 24px;
    overflow:auto;
    `


function Invoice(){
    const [invoice, SetInvoice] = useState([])
    const loginStatus = useLoginContext();

    const userid = loginStatus.userId;
    const onGetDataInvoice = () => {
        //setLoading(true)
        APIRequest({
            method: "get",
            url: "api/Product/InvoiceGetData",
            params: {
                userid: userid
            }
        }).then((res) => {
            if (res.status === 200) {
                SetInvoice(res.data.map((item) => {
                    return {
                        NoInvoice: item.invoice_id,
                        BuyDate: item.buy_date,
                        TotalItem: item.total_item,
                        TotalPrice: item.total_price
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
                <Link style={{textDecoration: "none", color: "inherit"}} to={'/homepage/'}>
                    <b>{'Home'}</b> </Link>
                    {'>'} <b style={{color:'#517BCE'}}>{'Invoice'}</b>
            </DivComponentAtas>
            <DivComponentIsi style={{fontSize:'24px', fontColor:'#4F4F4F'}}>
                <DivIsipertma><b>Invoice Menu</b></DivIsipertma>
            <DivIsiKedua>
                <table id="customers">
                <tbody>
                <tr style={{fontFamily:'Open-Sans'}}>
                    <th>No</th>
                    <th>No.Invoice</th>
                    <th>Buy Date</th>
                    <th>Total Item</th>
                    <th>Total Price</th>
                    <th>Action</th>
                </tr>
                {invoice.map((data,index)=>{
                return <tr key={index}>
                    <td>{index +1 }</td>
                    <td>{data.NoInvoice}</td>
                    <td>{data.BuyDate}</td>
                    <td>{data.TotalItem}</td>
                    <td>{data.TotalPrice}</td>
                    <td>
                        <Link style={{textDecoration: "none", color: "inherit"}} to={'/detailInvoice/'+data.NoInvoice}>
                            <button  className='butt2' style={{width:"280px"}}>Details</button>
                        </Link>
                    </td>
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