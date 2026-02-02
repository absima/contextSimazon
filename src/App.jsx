// import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HeaderPart from './parts/headerPart';
import HomePage from './parts/homePage';
import HomePart from './parts/homePart';
import SignUp from './parts/signingup';
import SignIn from './parts/signingin';
import Dashboard from './parts/dashboard';
import FooterPart from './parts/footerPart';
import ProductPart from './parts/productPart';
import CartPart from './parts/cartPart';
import SearchPart from './parts/searchPart';

import ProtectedRoute from './components/protectedRout';
import EditProfile from './parts/editProfile';
import Orders from './parts/orders';
import OrderDetails from './parts/orderDetails';
import Checkout from './parts/checkout';
import Support from './components/support';
import Privacy from './components/privacy';

function App() {
  return (
    <div>
      <header>
        <HeaderPart />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<HomePart />} />

          <Route path="/search" element={<SearchPart />} />

          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />

          <Route path="/cart" element={<CartPart />} />
          <Route path="/cart/:id" element={<CartPart />} />

          <Route path="/product/:id" element={<ProductPart />} />
          <Route path="/category/:id" element={<HomePage />} />

          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>

      <footer className="row center">
        <FooterPart />
      </footer>
    </div>
  );
}

export default App;

