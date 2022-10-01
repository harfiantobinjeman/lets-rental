import React from 'react';

/* PARTIALS */
import Header from './partials/header.partials';
import Footer from './partials/footer.partials';

function CheckoutItem(){
    return(
        <div>Checkout Item</div>
    )
}
function Checkout(){
    return(
        <div>
            <Header/>
            <CheckoutItem/>
            <Footer/>
        </div>
    )
}

export default Checkout;