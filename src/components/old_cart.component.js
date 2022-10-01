import React from 'react'
import style from 'styled-components';
import Header from './partials/header.partials';
import Footer from './partials/footer.partials';


import Box from '@mui/material/Box';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import { APIRequest, setAuthToken } from '../Axios';

function Cart() {

 
  const onGetCart = () => {
 //Axios
 

  }


  const [daftarKeranjang, setDaftarKeranjang] = useState([
    {
      nama: "Honda",
      merek: "Honda Brio",
      tahun: "2016",
      srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
      harga: "500.000"
    },
    {
      nama: "BMW",
      merek: "BMW X1",
      tahun: "2020",
      srcImage: "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/BMW-X1-25i-my20-tw-12x8-%2816%291.jpg",
      harga: "900.000",
    },
  ])
  const [listData, setListData] = useState([
    {
      nama: "Honda",
      merek: "Honda Brio",
      tahun: "2016",
      srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
      harga: "500.000",
    },
    {
      nama: "Honda1",
      merek: "Honda Brio",
      tahun: "2016",
      srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
      harga: "500.000",
    },
    {
      nama: "Honda2",
      merek: "Honda Brio",
      tahun: "2016",
      srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
      harga: "500.000",
    },
    {
      nama: "Honda3",
      merek: "Honda Brio",
      tahun: "2016",
      srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
      harga: "500.000",
    },
    {
      nama: "Honda4",
      merek: "Honda Brio",
      tahun: "2016",
      srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
      harga: "500.000",
    }
  ]);


  return (
    <>
      <Header />
      <Box sx={(theme) => ({
        marginTop: '120px',
        marginLeft: '7%',
        marginRight: '7%',
        width: '60%',
        borderBottom: 'outset',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
          marginTop: '150px',
          marginLeft: '5%',
          marginRight: '5%',
          width: '90%',
        },
      })}>
        <Box sx={(theme) => ({
          width: '95%',

        })}>
          <FormControlLabel label="Select All" control={
            <Checkbox />
          } />
        </Box>
        <Box sx={(theme) => ({
          width: '5%',

        })}>
          <DeleteIcon sx={{ color: 'red', margin: '10px' }} />
        </Box>
      </Box>
      {listData.map((data, index) => {
        return <Box key={index} sx={(theme) => ({
          marginTop: '10px',
          marginLeft: '7%',
          marginRight: '7%',
          width: '60%',
          display: 'flex',
          borderBottom: 'outset',
          [theme.breakpoints.down('sm')]: {
            marginTop: '0px',
            marginLeft: '5%',
            marginRight: '5%',
            width: '90%',
          },
        })}>
          <Box sx={(theme) => ({
            width: '30%',
            padding: '10px',
            [theme.breakpoints.down('sm')]: {
              width: '90%',
            }
          })}>
            <FormControlLabel label={
              <>
                {<CardMedia
                  component="img"
                  alt="green iguana"
                  maxHeight="100%"
                  image={data.srcImage}
                />
                }
              </>
            }
              control={
                <Checkbox />
              }
            />
          </Box>
          <Box sx={(theme) => ({
            width: '30%',
          })}>
            <Typography gutterBottom component="div">
              {data.nama}
            </Typography>
            <Box style={{ paddingTop: '25px' }}>
              <Typography gutterBottom component="div">
                {data.tahun}
              </Typography>
              <Typography gutterBottom component="div">
                Rp {data.harga}
              </Typography>
            </Box>
          </Box>
          <Box sx={(theme) => ({
            width: '30%',
            textAlign: 'center',
          })}>
            <div className="fw-bold fs-4 text-secondary d-inline-block">Days</div><p />
            <button className="btn btn-light py-0 px-3 bg-transparent border-0 fs-3 text-secondary fw-bold" style={{ marginTop: "-8px", marginLeft: "10px" }}>-</button>
            <input className="form-control d-inline border-0 bg-transparent fs-5 text-primary fw-bold text-center" style={{ width: "40px" }} value={1} onChange={() => { }} />
            <button className="btn btn-light py-0 px-3 bg-transparent border-0 fs-3 text-secondary fw-bold" style={{ marginTop: "-8px" }}>+</button>
          </Box>
          <Box sx={(theme) => ({
            width: '5%',

          })}>
            <DeleteIcon sx={{ color: 'red', marginTop: '50px' }} />
          </Box>
        </Box>
      })}
      <Box sx={(theme) => ({
        position: 'fixed',
        left: '70%',
        top: '130px',
        width: '25%',
        padding: '20px',
        border: '2px solid #e9ecef',
        borderRadius: '10px',
        color: 'black',
        display: 'grid',
        gridTemplateColumns: '150px 1fr',
        backgroundColor: "white",
        [theme.breakpoints.down('sm')]: {
          marginTop: '150px',
          marginLeft: '5%',
          marginRight: '5%',
          left: '0%',
          top: '325px',
          width: '90%',
          height: '220px',
          backgroundColor: '#517BCE',
          color: 'white',
        },
      })}>
        <Box sx={(theme) => ({
          width: '100%',
          gridColumn: '1 / span 2',
          marginBottom: '10px',
        })}>
          <b></b>
        </Box>
        <Box sx={(theme) => ({
          width: '100%',
        })}>
          Days
        </Box>
        <Box sx={(theme) => ({
          width: '100%',
          textAlign: 'right',
        })}>
          2
        </Box>
        <Box sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '150px 1fr',
          marginTop: '20px',
          borderTop: '1px solid black',
          width: '100%',
          gridColumn: '1 / span 2',
          paddingTop: '20px',
        })}>
          <Box sx={(theme) => ({
            width: '100%',
          })}>
            <b>Total Rent</b>
          </Box>
          <Box sx={(theme) => ({
            width: '100%',
            textAlign: 'right',
          })}>
            <b>Rp 1.150.000</b>
          </Box>
        </Box>
        <Box sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '150px 1fr',
          marginTop: '10px',
          width: '100%',
          gridColumn: '1 / span 2',
          paddingTop: '10px',
        })}>
          <Link style={{ textDecoration: "none", color: "inherit" }} to={'../invoice'}>
            <button className='butt' style={{ width: "260px", color: 'white' }}>Rent Now</button>
          </Link>
        </Box>
      </Box>
      <Box sx={(theme) => ({
        marginTop: '20px',
        width: '86%',
        height: '45',
        display: 'grid',
        marginLeft: '7%',
        marginRight: '7%',
        backgroundColor: '#517BCE',
        border: '2px solid #e9ecef',
        borderRadius: '10px',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        [theme.breakpoints.down('sm')]: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          marginLeft: '5%',
          marginRight: '5%',
          width: '95%',
        },
      })}>
        {listData.map((data, index) => {
          return <Box key={index} sx={(theme) => ({
            width: '90%',
            paddingTop: '5px',
            backgroundColor: 'white',
            height: '45',
            margin: '10px',
            marginTop: '50px',
            border: '2px solid #e9ecef',
            borderRadius: '10px',
            [theme.breakpoints.down('sm')]: {
              width: '90%',
              height: '300px',
              marginTop: '20px',
            },
          })}>
            <CardMedia
              component="img"
              alt="green iguana"
              maxHeight="100%"
              image={data.srcImage}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                {data.nama}
              </Typography>
              <Typography gutterBottom component="div">
                {data.merek}
              </Typography>
              <Box style={{ paddingTop: '20px' }}>
                <Typography gutterBottom component="div">
                  {data.tahun}
                </Typography>
                <Typography gutterBottom component="div">
                  Rp {data.harga}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        })}
      </Box>
      <Footer />
    </>
  )
}

export default Cart