import React, { useState } from 'react';


/* PARTIALS */
import Header from './partials/header.partials';
import CarouselElement from './partials/carousel.partials';
import GridCategory from './partials/category.partials';
import CardProduct from './partials/product.partials';
import Footer from './partials/footer.partials';

function Homepage(){
  
    

    return (
        <div>
            <Header/>
            <CarouselElement/>
            <GridCategory/>
            <CardProduct/>
            <Footer/>
            
        </div>
    )
}

export default Homepage;