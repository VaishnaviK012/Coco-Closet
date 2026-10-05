import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

function Billingcart() {
  const navigate = useNavigate();

  const [cartProduct, setCartProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // BILLING
  // =====================================================

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // =====================================================
  // PAYMENT
  // =====================================================

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  // =====================================================
  // ERRORS
  // =====================================================

  const [errors, setErrors] = useState({});

  // =====================================================
  // GET PRODUCT FROM LOCAL STORAGE
  // =====================================================

  useEffect(() => {
  const savedProduct = localStorage.getItem("cartProduct");

  if (savedProduct) {
    setCartProduct(JSON.parse(savedProduct));
  }

  setLoading(false);
}, []);

  // =====================================================
  // PRICE
  // =====================================================

  const subtotal = cartProduct
    ? Number(cartProduct.price) *
      Number(cartProduct.quantity)
    : 0;

  const shipping = 0;

  const total = subtotal + shipping;

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    // FULL NAME

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName =
        "Full name must contain at least 3 characters.";
    }

    // EMAIL

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    // ADDRESS

    if (!address.trim()) {
      newErrors.address = "Address is required.";
    } else if (address.trim().length < 10) {
      newErrors.address =
        "Please enter a complete address.";
    }

    // CARD

    if (paymentMethod === "card") {
      const cleanCardNumber = cardNumber.replace(/\s/g, "");

      if (!cleanCardNumber) {
        newErrors.cardNumber =
          "Card number is required.";
      } else if (!/^\d{16}$/.test(cleanCardNumber)) {
        newErrors.cardNumber =
          "Card number must contain 16 digits.";
      }

      if (!expiry.trim()) {
        newErrors.expiry =
          "Expiry date is required.";
      } else if (
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)
      ) {
        newErrors.expiry =
          "Use MM/YY format.";
      }

      if (!cvv.trim()) {
        newErrors.cvv = "CVV is required.";
      } else if (!/^\d{3}$/.test(cvv)) {
        newErrors.cvv =
          "CVV must contain 3 digits.";
      }
    }

    // UPI

    if (paymentMethod === "upi") {
      if (!upiId.trim()) {
        newErrors.upiId =
          "UPI ID is required.";
      } else if (
        !/^[\w.-]+@[\w.-]+$/.test(upiId)
      ) {
        newErrors.upiId =
          "Enter a valid UPI ID.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // CARD NUMBER
  // =====================================================

  const handleCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    value = value.slice(0, 16);

    value = value.replace(
      /(.{4})/g,
      "$1 "
    );

    setCardNumber(value.trim());

    if (errors.cardNumber) {
      setErrors({
        ...errors,
        cardNumber: "",
      });
    }
  };

  // =====================================================
  // EXPIRY
  // =====================================================

  const handleExpiry = (e) => {
    let value = e.target.value.replace(
      /\D/g,
      ""
    );

    value = value.slice(0, 4);

    if (value.length >= 3) {
      value =
        value.substring(0, 2) +
        "/" +
        value.substring(2);
    }

    setExpiry(value);

    if (errors.expiry) {
      setErrors({
        ...errors,
        expiry: "",
      });
    }
  };

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handlePlaceOrder = async () => {
  if (!cartProduct) {
    alert("Cart is empty.");
    return;
  }

  const valid = validateForm();

  if (!valid) {
    return;
  }

  const billingData = {
    productId: cartProduct.productId,
    productName: cartProduct.name,
    brand: cartProduct.brand,
    image: cartProduct.image,
    price: Number(cartProduct.price),
    size: cartProduct.size,
    color: cartProduct.color,
    quantity: Number(cartProduct.quantity),

    fullName: fullName.trim(),
    email: email.trim(),
    address: address.trim(),

    paymentMethod,

    subtotal,
    shipping,
    total,
    currency: "INR",
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/billingitem",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billingData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Billing failed");
    }

    console.log("BILLING ITEM SAVED:", data);

    alert("Order placed successfully! 🎉");

    localStorage.removeItem("cartProduct");

    navigate("/contact", {
      replace: true,
    });
  } catch (error) {
    console.error("BILLING ERROR:", error);
    alert("Unable to place order.");
  }
};

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">
          Loading cart...
        </p>
      </div>
    );
  }

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (!cartProduct) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5">

        <div className="w-full max-w-md text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBagOutlinedIcon />
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please add a product to your cart first.
          </p>

          <Link
            to="/shoppage"
            className="
              mt-6 inline-block rounded-lg
              bg-black px-6 py-3 text-sm
              font-medium text-white no-underline
              transition hover:bg-gray-800
            "
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  // =====================================================
  // INPUT CLASS
  // =====================================================

  const inputClass = (error) =>
    `w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
      error
        ? "border-red-400 bg-red-50"
        : "border-gray-200 bg-white focus:border-black"
    }`;

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-5 sm:py-10">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-6 sm:mb-8">

          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 sm:text-xs">
            Coco-Closet
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
            Checkout
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Complete your details to place your order.
          </p>

        </div>

        {/* GRID */}

        <div className="grid gap-5 lg:grid-cols-[1fr_380px] lg:gap-8">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-5">

            {/* PRODUCT */}

            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">

              <h2 className="mb-5 text-lg font-semibold sm:text-xl">
                Your Product
              </h2>

              <div className="flex gap-4">

                <img
                  src={cartProduct.image}
                  alt={cartProduct.name}
                  className="
                    h-28 w-24 shrink-0 rounded-xl
                    object-cover sm:h-36 sm:w-28
                  "
                />

                <div className="min-w-0 flex-1">

                  <p className="text-[10px] uppercase tracking-widest text-gray-400">
                    {cartProduct.brand || "FASCO"}
                  </p>

                  <h2 className="mt-1 truncate text-base font-semibold text-gray-900 sm:text-xl">
                    {cartProduct.name}
                  </h2>

                  <p className="mt-2 text-base font-medium sm:text-lg">
                    ${Number(cartProduct.price).toFixed(2)}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    <span className="rounded-md bg-gray-100 px-3 py-1.5 text-xs">
                      Size: {cartProduct.size || "N/A"}
                    </span>

                    <span className="rounded-md bg-gray-100 px-3 py-1.5 text-xs">
                      Color: {cartProduct.color || "N/A"}
                    </span>

                    <span className="rounded-md bg-gray-100 px-3 py-1.5 text-xs">
                      Qty: {cartProduct.quantity}
                    </span>

                  </div>

                </div>
              </div>
            </div>

            {/* BILLING */}

            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">

              <h2 className="mb-5 text-lg font-semibold sm:text-xl">
                Billing Details
              </h2>

              <div className="space-y-4">

                {/* NAME */}

                <div>

                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);

                      if (errors.fullName) {
                        setErrors({
                          ...errors,
                          fullName: "",
                        });
                      }
                    }}
                    placeholder="Enter your full name"
                    className={inputClass(errors.fullName)}
                  />

                  {errors.fullName && (
                    <p className="mt-1 text-[11px] text-red-500">
                      {errors.fullName}
                    </p>
                  )}

                </div>

                {/* EMAIL */}

                <div>

                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);

                      if (errors.email) {
                        setErrors({
                          ...errors,
                          email: "",
                        });
                      }
                    }}
                    placeholder="you@example.com"
                    className={inputClass(errors.email)}
                  />

                  {errors.email && (
                    <p className="mt-1 text-[11px] text-red-500">
                      {errors.email}
                    </p>
                  )}

                </div>

                {/* ADDRESS */}

                <div>

                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Delivery Address
                  </label>

                  <textarea
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);

                      if (errors.address) {
                        setErrors({
                          ...errors,
                          address: "",
                        });
                      }
                    }}
                    placeholder="Enter your complete delivery address"
                    rows={4}
                    className={`${inputClass(
                      errors.address
                    )} resize-none`}
                  />

                  {errors.address && (
                    <p className="mt-1 text-[11px] text-red-500">
                      {errors.address}
                    </p>
                  )}

                </div>

              </div>
            </div>

            {/* PAYMENT */}

            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-lg font-semibold sm:text-xl">
                  Payment Method
                </h2>

                <LockOutlinedIcon
                  className="text-gray-400"
                  fontSize="small"
                />

              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                {/* CARD */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`
                    flex items-center gap-3
                    rounded-xl border p-3
                    text-left transition
                    ${
                      paymentMethod === "card"
                        ? "border-black bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    }
                  `}
                >
                  <CreditCardOutlinedIcon />

                  <div>
                    <p className="text-xs font-semibold">
                      Card
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      Credit / Debit
                    </p>
                  </div>
                </button>

                {/* UPI */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`
                    flex items-center gap-3
                    rounded-xl border p-3
                    text-left transition
                    ${
                      paymentMethod === "upi"
                        ? "border-black bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    }
                  `}
                >
                  <AccountBalanceWalletOutlinedIcon />

                  <div>
                    <p className="text-xs font-semibold">
                      UPI
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      Google Pay / UPI
                    </p>
                  </div>
                </button>

                {/* COD */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`
                    flex items-center gap-3
                    rounded-xl border p-3
                    text-left transition
                    ${
                      paymentMethod === "cod"
                        ? "border-black bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    }
                  `}
                >
                  <LocalAtmOutlinedIcon />

                  <div>
                    <p className="text-xs font-semibold">
                      Cash
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      Cash on Delivery
                    </p>
                  </div>
                </button>

              </div>

              {/* CARD FORM */}

              {paymentMethod === "card" && (
                <div className="mt-5 space-y-4">

                  <div>

                    <label className="mb-1.5 block text-xs font-medium">
                      Card Number
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={handleCardNumber}
                      placeholder="1234 5678 9012 3456"
                      className={inputClass(errors.cardNumber)}
                    />

                    {errors.cardNumber && (
                      <p className="mt-1 text-[11px] text-red-500">
                        {errors.cardNumber}
                      </p>
                    )}

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="mb-1.5 block text-xs font-medium">
                        Expiry
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        value={expiry}
                        onChange={handleExpiry}
                        placeholder="MM/YY"
                        className={inputClass(errors.expiry)}
                      />

                      {errors.expiry && (
                        <p className="mt-1 text-[11px] text-red-500">
                          {errors.expiry}
                        </p>
                      )}

                    </div>

                    <div>

                      <label className="mb-1.5 block text-xs font-medium">
                        CVV
                      </label>

                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => {
                          const value =
                            e.target.value.replace(
                              /\D/g,
                              ""
                            );

                          setCvv(value);

                          if (errors.cvv) {
                            setErrors({
                              ...errors,
                              cvv: "",
                            });
                          }
                        }}
                        placeholder="•••"
                        className={inputClass(errors.cvv)}
                      />

                      {errors.cvv && (
                        <p className="mt-1 text-[11px] text-red-500">
                          {errors.cvv}
                        </p>
                      )}

                    </div>

                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">

                    <LockOutlinedIcon
                      fontSize="small"
                      className="text-gray-500"
                    />

                    <p className="text-[10px] text-gray-500">
                      Your payment information is secure.
                    </p>

                  </div>

                </div>
              )}

              {/* UPI */}

              {paymentMethod === "upi" && (
                <div className="mt-5">

                  <label className="mb-1.5 block text-xs font-medium">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);

                      if (errors.upiId) {
                        setErrors({
                          ...errors,
                          upiId: "",
                        });
                      }
                    }}
                    placeholder="example@upi"
                    className={inputClass(errors.upiId)}
                  />

                  {errors.upiId && (
                    <p className="mt-1 text-[11px] text-red-500">
                      {errors.upiId}
                    </p>
                  )}

                </div>
              )}

              {/* COD */}

              {paymentMethod === "cod" && (
                <div className="mt-5 rounded-xl bg-gray-50 p-4">

                  <p className="text-sm font-medium">
                    Cash on Delivery
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Pay when your order is delivered
                    to your address.
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

          <div
            className="
              h-fit rounded-2xl bg-white
              p-5 shadow-sm sm:p-6
              lg:sticky lg:top-6
            "
          >

            <h2 className="text-lg font-semibold sm:text-xl">
              Order Summary
            </h2>

            <div className="mt-5 flex gap-3 border-b border-gray-100 pb-5">

              <img
                src={cartProduct.image}
                alt={cartProduct.name}
                className="
                  h-20 w-16 shrink-0
                  rounded-lg object-cover
                "
              />

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium">
                  {cartProduct.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {cartProduct.size || "N/A"} /{" "}
                  {cartProduct.color || "N/A"}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Qty: {cartProduct.quantity}
                </p>

              </div>

              <span className="shrink-0 text-sm font-medium">
                $
                {(
                  Number(cartProduct.price) *
                  Number(cartProduct.quantity)
                ).toFixed(2)}
              </span>

            </div>

            <div className="mt-5 space-y-3">

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  ${subtotal.toFixed(2)}
                </span>

              </div>

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="font-medium text-green-600">
                  Free
                </span>

              </div>

            </div>

            <div className="my-5 border-t border-gray-100" />

            <div className="flex justify-between text-lg font-semibold">

              <span>Total</span>

              <span>
                ${total.toFixed(2)}
              </span>

            </div>

            {/* PLACE ORDER */}

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="
                mt-6 flex w-full
                items-center justify-center gap-2
                rounded-xl bg-black py-3.5
                text-sm font-medium text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-gray-800
                hover:shadow-lg
              "
            >
              <ShoppingBagOutlinedIcon fontSize="small" />
              Place Order
            </button>

            <p className="mt-4 text-center text-[10px] leading-4 text-gray-400">
              By placing your order, you agree to our
              terms and conditions.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 border-t border-gray-100 pt-5">

              <span className="rounded bg-gray-50 px-2 py-1 text-[9px] font-bold text-blue-600">
                VISA
              </span>

              <span className="rounded bg-gray-50 px-2 py-1 text-[9px] font-bold text-red-500">
                MASTER
              </span>

              <span className="rounded bg-gray-50 px-2 py-1 text-[9px] font-bold text-blue-500">
                AMEX
              </span>

              <span className="rounded bg-gray-50 px-2 py-1 text-[9px] font-bold text-gray-600">
                UPI
              </span>

              <span className="rounded bg-gray-50 px-2 py-1 text-[9px] font-bold text-gray-700">
                COD
              </span>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Billingcart;