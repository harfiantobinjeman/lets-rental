import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Responsive.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/login.component';
import Detail from './components/detail.component';
import Signup from './components/signup.component';
import Homepage from './components/homepage.component';
import Cart from './components/cart.component';
import List from './components/list.component';
import Invoice from './components/invoice.component';
import Seller from './seller/dashboard.seller'
import SellerRegister from "./seller/signup.seller"
import SellerLogin from './seller/login.seller'
import SellerProduct from './seller/product.seller'
import SellerOrder from './seller/order.seller'
import DetailInvoice from './components/detailInvoice.component';
import Verification from './components/verification.component';
import Verification_seller from './seller/verification.seller'
import Search from './components/search.component';
import { RecoilRoot } from 'recoil';
import { LoginProvider } from './context/loginContext';
function App() {
  // const location = useLocation();
  return (
    <LoginProvider>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            {/* //ini panggil Cart// */}
            <Route path="/cart" element={<Cart />} />
            {/* pemanggilan List */}
            <Route path="/category" element={<List />} />
            <Route path="/category/:id" element={<List />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verification/:verifToken" element={<Verification />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/product/:name/:year" element={<Detail />} />
            <Route path="/product" element={<Detail />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/detailInvoice" element={<Invoice />} />
            <Route path="/detailInvoice/:id" element={<DetailInvoice />} />
            {/* {window.location.pathname == "/detailInvoice" || window.location.pathname == "/detailinvoice/" ? <Navigate to="/invoice" /> : null} */}
            <Route path="/search/:search" element={<Search />} />
            <Route path="/search" element={<Search />} />
            {/* Seller */}
            <Route path="/seller/signup" element={<SellerRegister />} />
            <Route path="/seller/login" element={<SellerLogin />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/seller/statistic" element={<Seller />} />
            <Route path="/seller/product" element={<SellerProduct />} />
            <Route path="/seller/order" element={<SellerOrder />} />
            <Route path="/seller/verification/:verifToken" element={<Verification_seller />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </LoginProvider>
  )
}
export default App