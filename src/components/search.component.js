import React from 'react';

/* PARTIALS */
import Header from './partials/header.partials';
import Footer from './partials/footer.partials';
import { useParams } from 'react-router-dom';

/* Style Component */
import { Link } from 'react-router-dom';
import { DivContainer, DivComponentAtas, DivComponentIsi, Divbutton, DivFilter, DivFilterIsi, Inputan, Rekomendasi, IsiRokemendasi, Imag, IsiCard } from './partials/style.component';
import './partials/desain.css';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { APIRequest } from '../Axios';


const dataProduct = [
    {
        nama: "BMW",
        merek: "BMW",
        tahun: "2018",
        srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
        harga: "500000",
        tgglInputan: "06/28/2022",
        keyWord: "BMW Murah"
    },
    {
        nama: "Mitsubhisi",
        merek: "Mitsubishi",
        tahun: "2011",
        srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
        harga: "300000",
        tgglInputan: "06/30/2022",
        keyWord: "Mitsubhisi Murah"
    },
    {
        nama: "Honda",
        merek: "Honda",
        tahun: "2021",
        srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
        harga: "170000",
        tgglInputan: "08/02/2022",
        keyWord: "Honda Murah"
    },
    {
        nama: "Toyota",
        merek: "Toyota",
        tahun: "2022",
        srcImage: "https://foto.kontan.co.id/llzZnL4G3_MvS7fPXSnRpg--F_I=/smart/2021/04/13/1637778880p.jpg",
        harga: "150000",
        tgglInputan: "07/08/2022",
        keyWord: "Toyota Murah"
    }
]

function SearchPage() {

    //Axios

    const onSearchGetData = (Keywords, Sort, Category = checkedToString(), MinPrice = 0, MaxPrice = 999999999) => {
        if (typeof (MinPrice) == "string") {
            MinPrice = MinPrice ? Number(MinPrice) : 0;
        }
        if (typeof (MaxPrice) == "string") {
            MaxPrice = MaxPrice ? Number(MaxPrice) : 999999999;
        }
        APIRequest({
            method: "get",
            url: 'api/Product/SearchPageGetData',
            params: {
                keywords: Keywords,
                sort: Sort,
                category: Category,
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
        }).catch((res) => {
            console.log("error" + res.response.data)

        }).finally(() => {

        })
    }
    const checkedToString = () => {
        let result = "";
        for (const [key, value] of Object.entries(checked)) {
            //console.log(`${key}: ${value}`);
            if (value == true) {
                if (result) {
                    result += "," + key
                } else {
                    result += key
                }
            }

        }
        //console.log(checked,result)
        return result.toLowerCase();
    }

    //state data awal//
    const [listData, setListData] = useState([]);
    //state data
    //pencarian hrader//
    const params = useParams()
    const searching = params.search
    const [parameterParams , setParameterParams] = useState(searching);
    const [search, setSearch] = useState("")

    useEffect(() => {
        onSearchGetData(searching, sortType, checkedToString(), min, max);
        setSearch(searching)
    }, [searching])

    useEffect(() => {
        //kenapa di null kan
        //setListData([])
        let copy = JSON.parse(JSON.stringify(dataProduct))
        setTimeout(() => {
            //searching ? setListData(copy?.filter(arr => arr.keyWord.toLowerCase().includes(searching.toLowerCase()))) : setListData(copy)
        }, 200)
    }, [search])
    //selesai pencarian header//

    //select merek//
    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState({
        Mitsubishi: false,
        Honda: false,
        BMW: false,
        Toyota: false
    });

    const toggleCheck = (inputName) => {
        setChecked((prevState) => {
            const newState = { ...prevState };
            newState[inputName] = !prevState[inputName];
            return newState;
        });
    };
    const selectAll = (value) => {
        setCheckedAll(value);
        setChecked((prevState) => {
            const newState = { ...prevState };
            for (const inputName in newState) {
                newState[inputName] = value;
            }
            return newState;
        });
    };
    //logick select merek//

    useEffect(() => {
        let objs = Object.keys(checked)
        let namas = ""
        for (const datas of objs) {
            if (checked[datas]) {
                namas += datas
            }
        }
        //setListData([])
        setTimeout(() => {
            //setListData(dataProduct?.filter(arr => namas.includes(arr.merek)))

        }, 200)

        const handleClickSort = (val) => {
            let objs = Object.keys(checked)
            let namas = ""
            for (const datas of objs) {
                if (checked[datas]) {
                    namas += datas
                }
            }
            //setListData([])
            setTimeout(() => {
                //setListData(dataProduct?.filter(arr => namas.includes(arr.merek)))

            }, 200)
        }
        //Akhir logick select merek//
    }, [JSON.stringify(checked)])

    useEffect(() => {
        let allChecked = true;
        for (const inputName in checked) {
            if (checked[inputName] === false) {
                allChecked = false;
            }
        }
        if (allChecked) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }, [checked]);
    //Akhir select merek//

    //Button newest//
    const dataButton = ["Newest", "Older", "High Price", 'Low Price']
    const [sortType, setSortType] = useState("Newest");


    const handleClickSort = (val) => {
        setSortType(val);
        onSearchGetData(searching, val, checkedToString(), min, max);
        // let m = listData.sort((a, b) => {
        //     if (val === "Newest") {
        //         return b.tgglInputan.localeCompare(a.tgglInputan)
        //     } else if (val === "Older") {
        //         return a.tgglInputan.localeCompare(b.tgglInputan)
        //     } else if (val === "High Price") {
        //         return b.harga.localeCompare(a.harga)
        //     } else if (val === "Low Price") {
        //         return a.harga.localeCompare(b.harga)
        //     }
        // })
        //setListData([])
        // setTimeout(() => {
        //    //setListData(m)

        // }, 100)
    }
    const handleClickCategory = () => {
        setTimeout(() => {
            onSearchGetData(searching, sortType, checkedToString(), min, max);
        }, 50);

    }
    //Akhir Button newest//

    //Range Price//
    const [min, setMin] = useState("")
    const [max, setMax] = useState("")

    const handleMin = (e) => {
        setMin(e.target.value)
        //setListData(listData.filter(p => p.harga >= min && p.harga <= max))

    }
    const handleMax = (e) => {
        setMax(e.target.value)
        //min < 0 ? setListData(listData.filter(p => p.harga >= min && p.harga <= max)) : setListData(listData.filter(p => p.harga <= max))
    }

    const filterRangeHarga = () => {
        onSearchGetData(searching, sortType, checkedToString(), min, max);


        //let temp = dataProduct
        //setListData(temp.filter(p => p.harga >= min && p.harga <= max))
    }
    // Batas Range Price//

    return (
        <div>
            <Header />
            <Box sx={(theme) => ({
                marginTop: '120px',
                marginLeft: '4%',
                marginRight: '4%',
                width: '86%',
                [theme.breakpoints.down('sm')]: {
                    marginTop: '150px',
                    marginLeft: '5%',
                    marginRight: '5%',
                    width: '90%',
                },
            })}>
                <b>{'Result:'}</b>
                <b style={{ color: '#517BCE' }}>{`     ${searching ? searching:"all"}`}</b>
            </Box>
            <Box sx={(theme) => ({
                marginTop: '3%',
                padding: '2%',
                marginLeft: '4%',
                marginRight: '4%',
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
                        width: '25%',
                        marginRight: '70px',
                        fontSize: '24px',
                        [theme.breakpoints.down('sm')]: {
                            display: 'none',
                        },
                    })}>
                        Sort
                        <Divbutton>
                            {dataButton.map((item) => {
                                return <button onClick={() => handleClickSort(item)} className='butt'>{item}</button>
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
                            marginLeft: '10%',
                            marginRight: '10%',
                            width: '100%',
                            fontSize: '24px',
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
                                    color: '#517BCE',
                                    [theme.breakpoints.up('sm')]: {
                                        display: 'none',
                                    },
                                })} /> Filter
                            </Link>
                            <Box sx={(theme) => ({
                                marginTop: '3%',
                                width: '100%',
                                display: 'flex',
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
                                    display: 'grid',
                                    border: '2px solid #e9ecef',
                                    gridTemplateColumns: '150px 1fr',
                                    padding: '10px',
                                    marginTop: '10px',
                                    marginRight: '5px',
                                    [theme.breakpoints.down('sm')]: {
                                        display: 'none',
                                    },
                                })}>
                                    <Box style={{ gridColumn: '1 / span 2' }} >
                                        Category
                                    </Box>
                                    <FormControlLabel label="All Category" control={
                                        <Checkbox
                                            onChange={(event) => selectAll(event.target.checked)}
                                            checked={checkedAll} />
                                    }
                                    />
                                    <FormControlLabel
                                        label="Mitsubishi"
                                        onChange={() => toggleCheck("Mitsubishi")}
                                        checked={checked["Mitsubishi"]}
                                        control={
                                            <Checkbox />
                                        }
                                    />
                                    <FormControlLabel
                                        label="Honda"
                                        onChange={() => toggleCheck("Honda")}
                                        checked={checked["Honda"]}
                                        control={
                                            <Checkbox />
                                        }
                                    />
                                    <FormControlLabel
                                        label="BMW"
                                        onChange={() => toggleCheck("BMW")}
                                        checked={checked["BMW"]}
                                        control={
                                            <Checkbox />
                                        }
                                    />
                                    <FormControlLabel
                                        style={{ gridColumn: '1 / span 2' }}
                                        onChange={() => toggleCheck("Toyota")}
                                        checked={checked["Toyota"]}
                                        label="Toyota" control={
                                            <Checkbox />
                                        }
                                    />
                                    <button className="btn btn-light py-0 px-3 bg-transparent border-0 text-secondary" >Clear</button>
                                    <button className='butt' onClick={() => handleClickCategory()}>Apply</button>
                                </Box>
                            </Box>
                        </Box>
                        {dataButton.map((item) => {
                            return <Box className='buttunFilter' sx={(theme) => ({
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
                    <Box sx={(theme) => ({
                        marginLeft: '10%',
                        marginTop: '55px',
                        marginBottom: '45px',
                        width: '33%',
                        border: '2px solid #e9ecef',
                        gridTemplateColumns: '50% 1fr',
                        display: 'grid',
                        [theme.breakpoints.down('sm')]: {
                            display: 'none',
                        },
                    })}>
                        <Box sx={(theme) => ({
                            paddingLeft: '10px',
                            width: '100%',
                            gridColumn: '1 / span 2',
                            [theme.breakpoints.down('sm')]: {
                                display: 'none',
                            },
                        })}>
                            <b>Range Price</b>
                        </Box>
                        <Box sx={(theme) => ({
                            paddingLeft: '10px',
                            width: '100%',
                            marginTop: '20px',
                            [theme.breakpoints.down('sm')]: {
                                display: 'none',
                            },
                        })}>
                            Min
                            <Inputan placeholder='Rp' type='number' value={min} onChange={handleMin}></Inputan>
                            <button style={{ marginTop: '25px' }} className="btn btn-light py-0 px-3 bg-transparent border-0 text-secondary" >Clear</button>

                        </Box>
                        <Box sx={(theme) => ({
                            width: '100%',
                            marginTop: '20px',
                            [theme.breakpoints.down('sm')]: {
                                display: 'none',
                            },
                        })}>
                            Max
                            <Inputan placeholder='Rp' type='number' value={max} onChange={handleMax}></Inputan>
                            <button className='butt' onClick={filterRangeHarga}>Apply</button>
                        </Box>
                    </Box>
                </Box>
                <Box sx={(theme) => ({
                    width: '100%',
                    height: '45',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                    },
                })}>
                    {listData.map((data, index) => {
                        return <Link style={{ textDecoration: "none", color: "inherit" }} state={data} to={`/product/${data.nama}/${data.tahun}`} >
                            <Box key={index} sx={(theme) => ({
                                width: '90%',
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
                                    style={{width:"100%",height:"300px"}}
                                    className='images'
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
                        </Link>
                    })}
                </Box>
            </Box>
            <Footer />
        </div>
    )
}

export default SearchPage;