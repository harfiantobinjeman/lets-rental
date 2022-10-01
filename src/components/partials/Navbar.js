import React from 'react';
import Box from '@mui/material/Box';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import './partials/desain.css';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
  return (
    <Box sx={(theme)=>({
        backgroundColor:'#517BCE',
        width:'auto',
        padding:'15px',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        display:'flex',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#517BCE',
            padding:'15px',
          },
    })}>
        <Box >
            <DirectionsCarIcon style={{color:'white', height:'40px',width:'45px'}}/>
        </Box>
        <Box sx={(theme)=>({
            fontSize:'28px',
            color:'white',
            marginLeft:'10px',
            marginTop:'7px',
            marginRight:'50px',
            [theme.breakpoints.down('sm')]: {
            fontSize:'25px',
            marginTop:'7px',
          },
    })}>
            <b>Lets Rental</b>
        </Box>
        <Box sx={(theme)=>({
            [theme.breakpoints.down('sm')]: {
            fontSize:'25px',
          },
         })}>
            <input type="text" placeholder="search" class="search" />
        </Box>
            <Box sx={(theme)=>({
              width:'355px',
              [theme.breakpoints.down('sm')]: {
                width:'30px',
          },
      })} >
                <SearchIcon 
                sx={(theme)=>({
                    position:'absolute',
                    left:'655px',
                    top:'21px',
                    width:'40px',
                    height:'30px',
                    backgroundColor:'#517BCE',
                    borderRadius:'5px',
                    [theme.breakpoints.down('sm')]: {
                        position:'absolute',
                        left:'280px',
                        top:'20px',
                        width:'35px',
                        height:'35px',
                        backgroundColor:'white',
                        color:'#517BCE',
                },
            })}/>
            </Box>
            <Box sx={(theme)=>({
              width:'70px',
              height:'35px',
              borderRight:'1px solid #4F4F4F',
            [theme.breakpoints.down('sm')]: {
              borderRight:'2px solid #517BCE',
        },
    })}>
              <MenuIcon sx={(theme)=>({
                      position:'absolute',
                      left:'330px',
                      top:'20px',
                      width:'35px',
                      height:'35px',
                      color:'white',
                    [theme.breakpoints.up('sm')]: {
                      display:'none',
                },
            })} />
            <ShoppingCartIcon sx={(theme)=>({
                      left:'330px',
                      top:'20px',
                      width:'35px',
                      height:'35px',
                      color:'white',
                    [theme.breakpoints.down('sm')]: {
                      position:'absolute',
                      left:'325px',
                      top:'100px',
                      borderRadius:'50px',
                      padding:'5px',
                      backgroundColor:'#517BCE',
                },
            })} />
            </Box>
            <Box sx={(theme)=>({
            color:'white',
            marginLeft:'25px',
            marginTop:'7px',
            [theme.breakpoints.down('sm')]: {
            display:'none',
          },
    })}>
            <b>Sign Up</b>
        </Box>
        <Box sx={(theme)=>({
            color:'#517BCE',
            backgroundColor:'white',
            marginLeft:'25px',
            marginTop:'2px',
            top:'50%',
            paddingTop:'6px',
            marginBottom:'8px',
            width:'70px',
            textAlign:'center',
            borderRadius:'5px',
            [theme.breakpoints.down('sm')]: {
            display:'none',
          },
    })} >
          <b>Login</b>
        </Box>
    </Box>
  )
}

export default Navbar