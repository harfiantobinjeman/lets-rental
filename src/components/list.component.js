import React from 'react';

/* PARTIALS */
import Header from './partials/header.partials';
import Footer from './partials/footer.partials';

/* Style Component */
import { Link } from 'react-router-dom';
import { Divbutton, Inputan } from './partials/style.component';
import './partials/desain.css';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useParams, useNavigate } from 'react-router-dom';
import { APIRequest } from '../Axios';

const image = "";

function CategoryList() {

    const params = useParams();
    const searching = params.id
    //console.log("params.id", searching)
    const [search, setSearch] = useState("")

    //Button Sorting Type
    const [sortType, setSortType] = useState("Newest")

    //Navigate 
    const navigate = useNavigate();

    //Range Price//
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(99999999)

    //state data awal//
    const [listData, setListData] = useState([
        // {
        //     nama: "Honda Brio",
        //     tahun: 2016,
        //     harga: 300000,
        //     srcImage: image,
        //     merek: "Honda",
        //     car_id: 7,
        //     keyWord: "mobil Honda brio 2016"
        // }
    ]);

    const getStorageCategory = () => {
        const getCategory = localStorage.getItem("kategori") ? JSON.parse(localStorage.getItem("kategori")) : {};
        return getCategory.category
    }

    const onGetCarCategory = (tipeMobil = params.id, Sort = sortType, MinPrice = min, MaxPrice = max) => {
        //Axios
        APIRequest({
            method: "get",
            url: "api/Product/CategoryPageGetData",
            params: {
                category: tipeMobil,
                sort: Sort,
                minPrice: MinPrice,
                maxPrice: MaxPrice
            }

        }).then((res) => {
            if (res.status === 200) {
                setListData(res.data.map((item) => {
                    return {
                        nama: item.product_name,
                        tahun: item.car_years,
                        harga: item.car_rental_price,
                        srcImage: item.car_image,
                        merek: item.car_variant,
                        car_id: item.car_id,
                        keyWord: item.keywords
                    }

                }))
            }
            //console.log("API res data", res.data)
        }).catch((e) => {
            console.log("error", e.response.data)
        }).finally(() => {

        })

    }
    //useEffect get Data
    useEffect(() => {
        onGetCarCategory(params.id, sortType, min, max);
        //console.log(params.id);
    }, []);

    //state data
    //pencarian hrader//


    //Use Effect Search
    useEffect(() => {
        setSearch(searching)
    }, [searching])



    useEffect(() => {
        //setListData([])
        setTimeout(() => {
            //searching ? setListData(listData?.filter(arr => arr.keyWord.toLowerCase().includes(searching.toLowerCase()))) : setListData(listData)
        }, 200)
    }, [search])
    //selesai pencarian header//

    //Button newest//
    const dataButton = ["Newest", "Older", "High Price", 'Low Price']
    const handleClickSort = (val) => {
        setSortType(val)
        onGetCarCategory(params.id, val, min, max);
        // let m = listData.sort((a, b) => {
        //     if (val === "Newest") {
        //         return b.car_id.localeCompare(a.car_id)
        //     } else if (val === "Older") {
        //         return a.car_id.localeCompare(b.car_id)
        //     } else if (val === "High Price") {
        //         return b.harga.localeCompare(a.harga)
        //     } else if (val === "Low Price") {
        //         return a.harga.localeCompare(b.harga)
        //     }
        // })
        // setListData([])
        setTimeout(() => {
            //setListData(m)

        }, 100)
    }
    //Akhir Button newest//



    const handleMin = (e) => {
        setMin(e.target.value)
        //setListData(listData.filter(p => p.harga >= min && p.harga <= max))

    }
    const handleMax = (e) => {
        setMax(e.target.value)
        //min < 0 ? setListData(listData.filter(p => p.harga >= min && p.harga <= max)) : setListData(listData.filter(p => p.harga <= max))
    }

    const filterRangeHarga = () => {
        onGetCarCategory(params.id, sortType, min, max);
        // let temp = listData
        //setListData(temp.filter(p => p.harga >= min && p.harga <= max))
    }
    // Batas Range Price//

    return (
        <div>
            <Header />
            <Box sx={(theme) => ({
                marginTop: '120px',
                marginLeft: '7%',
                marginRight: '7%',
                width: '86%',
                [theme.breakpoints.down('sm')]: {
                    marginTop: '150px',
                    marginLeft: '5%',
                    marginRight: '5%',
                    width: '90%',
                },
            })}>
                <Link style={{ textDecoration: "none", color: "inherit" }} to={'/homepage'}>
                    <b>{'Home'}</b></Link>
                {'>'} <b style={{ color: '#517BCE' }}>{params.id}</b>
            </Box>
            <Box sx={(theme) => ({
                marginTop: '3%',
                padding: '20px',
                marginLeft: '7%',
                marginRight: '7%',
                width: 'auto',
                border: '2px solid #e9ecef',
                borderRadius: '10px',
                [theme.breakpoints.down('sm')]: {
                    marginTop: '3%',
                    padding: '0px',
                    marginLeft: '5%',
                    marginRight: '5%',
                    width: '100%',
                    border: 'none',
                    borderRadius: 'none',

                },
            })}>
                <Box sx={(theme) => ({
                    display: 'flex',
                    width: '100%',
                    [theme.breakpoints.down('sm')]: {
                        overflowX: 'scroll',
                        overflowY: 'hidden',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        webkitScrollBar: {
                            width: '0',
                        },
                    },
                })}>
                    <Box sx={(theme) => ({
                        width: '50%',
                        [theme.breakpoints.down('sm')]: {
                            display: 'none',
                        },
                    })}>
                        Sort
                        <Divbutton>
                            {dataButton.map((item, index) => {
                                return <button key={index} onClick={() => handleClickSort(item)} className='butt'>{item}</button>
                            })}

                        </Divbutton>
                    </Box>
                    <Box sx={(theme) => ({
                        [theme.breakpoints.down('sm')]: {
                            overflowX: 'scroll',
                            overflowY: 'hidden',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            webkitScrollBar: {
                                width: '0',
                            },
                        },
                    })}>
                        <Box className='buttunFilter' sx={(theme) => ({
                            marginLeft: '7%',
                            marginRight: '7%',
                            width: '50%',
                            [theme.breakpoints.down('sm')]: {
                                marginLeft: '0%',
                                marginRight: '0%',
                                padding: '10px',
                                width: '30%',
                                border: '2px solid #e9ecef',
                                borderRadius: '10px',
                                textAlign: 'center',
                            },
                        })}>
                            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/homepage'}>
                                <FilterAltIcon sx={(theme) => ({
                                    textDecoration: "none",
                                    color: "inherit",
                                    color: '#517BCE',
                                    [theme.breakpoints.up('sm')]: {
                                        display: 'none',
                                    },
                                })} /> Filter
                            </Link>
                            <Box sx={(theme) => ({
                                marginTop: '3%',
                                width: '380px',
                                border: '2px solid #e9ecef',
                                [theme.breakpoints.down('sm')]: {
                                    marginTop: '3%',
                                    padding: '0px',
                                    marginLeft: '5%',
                                    marginRight: '5%',
                                    width: '90%',
                                    border: 'none',
                                    borderRadius: 'none',
                                },
                            })}>
                                <Box sx={(theme) => ({
                                    width: '100%',
                                    paddingLeft: '10px',
                                    [theme.breakpoints.down('sm')]: {
                                        display: 'none',
                                    },
                                })}>
                                    <b>Range Price</b>
                                </Box>
                                <Box sx={(theme) => ({
                                    paddingLeft: '10px',
                                    width: '100%',
                                    display: 'flex',
                                    [theme.breakpoints.down('sm')]: {
                                        display: 'none',
                                    },
                                })}>
                                    <Box sx={(theme) => ({

                                        width: '50%',
                                        marginTop: '20px',
                                        [theme.breakpoints.down('sm')]: {
                                            display: 'none',
                                        },
                                    })}>
                                        Min
                                        <Inputan placeholder='Rp' type="number" value={min} onChange={handleMin}></Inputan>
                                        <button style={{ marginTop: '25px' }} className="btn btn-light py-0 px-3 bg-transparent border-0 text-secondary" >Clear</button>

                                    </Box>
                                    <Box sx={(theme) => ({

                                        width: '50%',
                                        marginTop: '20px',
                                        [theme.breakpoints.down('sm')]: {
                                            display: 'none',
                                        },
                                    })}>
                                        Max
                                        <Inputan placeholder='Rp' type="number" value={max} onChange={handleMax}></Inputan>
                                        <button className='butt' onClick={filterRangeHarga}>Apply</button>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                        {dataButton.map((item, index) => {
                            return <Box key={index} className='buttunFilter' sx={(theme) => ({
                                marginLeft: '10px',
                                marginRight: '0%',
                                padding: '10px',
                                width: '100px',
                                border: '2px solid #e9ecef',
                                borderRadius: '10px',
                                textAlign: 'center',
                                display: 'inline-block',
                                [theme.breakpoints.up('sm')]: {
                                    display: 'none',
                                },
                            })}>
                                {item}
                            </Box>
                        })}
                    </Box>
                </Box>
                <Box sx={(theme) => ({
                    width: '100%',
                    height: '45',
                    marginTop: '50px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                    },
                })}>
                    {listData.map((data, index) => {
                        // console.log("list data map", data)
                        return (

                            <Box key={index} onClick={() => { navigate(`/product/${data.nama}/${data.tahun}`) }} sx={(theme) => ({
                                width: '90%',
                                height: '45',
                                margin: '10px',
                                border: '2px solid #e9ecef',
                                borderRadius: '10px',
                                [theme.breakpoints.down('sm')]: {
                                    width: '90%',
                                    height: '300px',
                                    marginTop: '20px',
                                },
                            })}>
                                <CardMedia
                                    style={{width:"100%",height:"300px"}}
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

                        )

                    })}
                </Box>
            </Box>
            <Footer />
        </div>
    )
}

export default CategoryList;