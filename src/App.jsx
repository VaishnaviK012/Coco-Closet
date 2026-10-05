import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainButton from "./MainButton";

import Navbar from "./Components/Thumbnail/Navbar";
import Deals from "./Components/Thumbnail/Deals";
import NewArrivals from "./Components/Thumbnail/NewArrivals";
import Description from "./Components/Thumbnail/Description";
import Social from "./Components/Thumbnail/Social";
import Newletter from "./Components/Thumbnail/Newletter";

import Shoppage from "./Components/Shopnow/Shoppage";
import ProductDetails from "./Components/Shopnow/Productdetail";
import Billingcart from "./Components/Shopnow/Billingcart";
import Contact from "./Components/Shopnow/Contact";

function Home() {
  return (
    <>
     <Navbar />

<section id="deals" className="scroll-mt-24">
  <Deals />
</section>

<section id="new-arrivals" className="scroll-mt-24">
  <NewArrivals />
</section>

<section id="description" className="scroll-mt-24">
  <Description />
</section>

<section id="social" className="scroll-mt-24">
  <Social />
</section>

<section id="newsletter" className="scroll-mt-24">
  <Newletter />
</section>
    </>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>

      {/* LOGIN */}

      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/home" replace />
          ) : (
            <MainButton />
          )
        }
      />

      {/* HOME */}

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* SHOP */}

      <Route
        path="/shoppage"
        element={
          <ProtectedRoute>
            <Shoppage />
          </ProtectedRoute>
        }
      />

      {/* PRODUCT */}

      <Route
        path="/productdetail"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />

      {/* CART */}

      <Route
        path="/billingcart"
        element={
          <ProtectedRoute>
            <Billingcart />
          </ProtectedRoute>
        }
      />

      {/* CONTACT */}

      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />

      {/* INVALID */}

      <Route
        path="*"
        element={
          <Navigate
            to={token ? "/home" : "/"}
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;