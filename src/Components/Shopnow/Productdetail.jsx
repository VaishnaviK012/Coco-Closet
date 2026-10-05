import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Divider,
  LinearProgress,
  Modal,
  Box,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "react-router-dom";

import Description from "../Thumbnail/Description";
import Social from "../Thumbnail/Social";
import Newletter from "../Thumbnail/Newletter";

function Productdetails() {
  // =========================================================
  // IMAGES
  // =========================================================

  const frock1 =
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80";

  const frock2 =
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80";

  const frock3 =
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80";

  const frock4 =
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=80";

  const frock5 =
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80";

  const frock6 =
    "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=80";

  // =========================================================
  // PRODUCT
  // =========================================================

  const productPrice = 39;

  // =========================================================
  // STATES
  // =========================================================

  const [selectedImage, setSelectedImage] = useState(frock1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // =========================================================
  // IMAGE
  // =========================================================

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  // =========================================================
  // SIZE
  // =========================================================

  const selectSize = (size) => {
    setSelectedSize(size);
    setErrorMessage("");
  };

  // =========================================================
  // COLOR
  // =========================================================

  const selectColor = (color) => {
    setSelectedColor(color);
    setErrorMessage("");
  };

  // =========================================================
  // QUANTITY
  // =========================================================

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateProduct = () => {
    if (!selectedSize && !selectedColor) {
      setErrorMessage("Please select size and color.");
      return false;
    }

    if (!selectedSize) {
      setErrorMessage("Please select a size.");
      return false;
    }

    if (!selectedColor) {
      setErrorMessage("Please select a color.");
      return false;
    }

    if (quantity < 1) {
      setErrorMessage("Please select a valid quantity.");
      return false;
    }

    return true;
  };

  // =========================================================
  // ADD TO CART
  // DATABASE NAHI
  // SIRF CONSOLE + LOCAL STORAGE
  // =========================================================
const addToCart = async () => {
  if (!validateProduct()) {
    return;
  }

  const cartProduct = {
    productId: "frock-001",
    name: "Women's Frock",
    brand: "Coco-closet",
    image: selectedImage,
    price: productPrice,
    size: selectedSize,
    color: selectedColor,
    quantity,
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/cartitem",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartProduct),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    localStorage.setItem(
      "cartProduct",
      JSON.stringify(cartProduct)
    );

    console.log("CART ITEM SAVED:", data);

    setOpenModal(true);
  } catch (error) {
    console.error("CART ITEM ERROR:", error);
  }
};
  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <AppBar
        position="sticky"
        elevation={0}
        className="bg-white/95 text-black shadow-sm backdrop-blur-md"
      >
        <Toolbar
          className="
            mx-auto flex min-h-[78px] w-full max-w-7xl
            justify-between border-b border-gray-100
            px-4 sm:px-6 lg:px-8
          "
        >

          {/* LOGO */}

          <div className="flex items-center gap-2 whitespace-nowrap">
            <Typography
              component="div"
              className="
                !text-base !font-bold !leading-none !text-gray-800
                sm:!text-lg
              "
            >
              Coco-Closet
            </Typography>

            <img
              src="/icons8-bow-tie-100.png"
              alt="Bow tie"
              className="
                -ml-1 h-8 w-7 animate-bounce
                sm:h-7 sm:w-7
              "
            />
          </div>

          {/* NAVIGATION */}

          <nav
            className="
              hidden items-center gap-8
              md:flex lg:gap-11
            "
          >

            <Link
              to="/home"
              className="
                group relative !text-xs !font-medium
                !tracking-wide !text-gray-600
                no-underline transition-colors duration-300
                hover:!text-gray-950 lg:!text-sm
              "
            >
              Home

              <span
                className="
                  absolute -bottom-2 left-0
                  h-px w-0 rounded-full bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

            <Link
              to="/shoppage"
              className="
                group relative !text-xs !font-medium
                !tracking-wide !text-gray-600
                no-underline transition-colors duration-300
                hover:!text-gray-950 lg:!text-sm
              "
            >
              Shop

              <span
                className="
                  absolute -bottom-2 left-0
                  h-px w-0 rounded-full bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

            <Link
              to="/productdetail"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }
              className="
                group relative whitespace-nowrap
                text-sm font-medium text-gray-600
                no-underline transition-colors duration-300
                hover:text-gray-950
              "
            >
              Product

              <span
                className="
                  absolute -bottom-2 left-0
                  h-px w-0 rounded-full bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

            <Link
              to="/contact"
              className="
                group relative whitespace-nowrap
                text-sm font-medium text-gray-600
                no-underline transition-colors duration-300
                hover:text-gray-950
              "
            >
              Contact

              <span
                className="
                  absolute -bottom-2 left-0
                  h-px w-0 rounded-full bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

          </nav>

          {/* RIGHT ICONS */}

          <div className="flex items-center gap-0.5 sm:gap-1">

            <IconButton
              size="small"
              className="
                !rounded-full transition-all duration-300
                hover:!bg-gray-100 hover:!-translate-y-0.5
              "
            >
              <SearchOutlinedIcon
                fontSize="small"
                className="!text-gray-700"
              />
            </IconButton>

            <IconButton
              size="small"
              className="
                !rounded-full transition-all duration-300
                hover:!bg-gray-100 hover:!-translate-y-0.5
              "
            >
              <PersonOutlineOutlinedIcon
                fontSize="small"
                className="!text-gray-700"
              />
            </IconButton>

            <IconButton
              size="small"
              className="
                !rounded-full transition-all duration-300
                hover:!bg-gray-100 hover:!-translate-y-0.5
              "
            >
              <StarBorderOutlinedIcon
                fontSize="small"
                className="!text-gray-700"
              />
            </IconButton>

            <Link
              to="/billingcart"
              className="!no-underline"
            >
              <IconButton
                size="small"
                className="
                  !rounded-full transition-all duration-300
                  hover:!bg-gray-100 hover:!-translate-y-0.5
                "
              >
                <ShoppingBagOutlinedIcon
                  fontSize="small"
                  className="!text-gray-700"
                />
              </IconButton>
            </Link>

          </div>
        </Toolbar>
      </AppBar>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          mx-auto w-full max-w-7xl
          px-5 py-10 lg:px-8 lg:py-12
        "
      >
        <div
          className="
            grid grid-cols-1 gap-10
            lg:grid-cols-[1.05fr_0.95fr] lg:gap-14
          "
        >

          {/* =================================================
              LEFT IMAGES
          ================================================= */}

          <div className="flex gap-3 sm:gap-4">

            <div className="flex w-[52px] flex-col gap-3 sm:w-[65px]">

              <button
                type="button"
                onClick={() => selectImage(frock1)}
                className={`h-[58px] overflow-hidden bg-gray-100 sm:h-[72px] ${
                  selectedImage === frock1
                    ? "border-2 border-black"
                    : "border border-gray-200"
                }`}
              >
                <img
                  src={frock1}
                  alt="Frock 1"
                  className="h-full w-full object-cover"
                />
              </button>

              <button
                type="button"
                onClick={() => selectImage(frock2)}
                className={`h-[58px] overflow-hidden bg-gray-100 sm:h-[72px] ${
                  selectedImage === frock2
                    ? "border-2 border-black"
                    : "border border-gray-200"
                }`}
              >
                <img
                  src={frock2}
                  alt="Frock 2"
                  className="h-full w-full object-cover"
                />
              </button>

              <button
                type="button"
                onClick={() => selectImage(frock3)}
                className={`h-[58px] overflow-hidden bg-gray-100 sm:h-[72px] ${
                  selectedImage === frock3
                    ? "border-2 border-black"
                    : "border border-gray-200"
                }`}
              >
                <img
                  src={frock3}
                  alt="Frock 3"
                  className="h-full w-full object-cover"
                />
              </button>

              <button
                type="button"
                onClick={() => selectImage(frock4)}
                className={`h-[58px] overflow-hidden bg-gray-100 sm:h-[72px] ${
                  selectedImage === frock4
                    ? "border-2 border-black"
                    : "border border-gray-200"
                }`}
              >
                <img
                  src={frock4}
                  alt="Frock 4"
                  className="h-full w-full object-cover"
                />
              </button>

              <button
                type="button"
                onClick={() => selectImage(frock5)}
                className={`h-[58px] overflow-hidden bg-gray-100 sm:h-[72px] ${
                  selectedImage === frock5
                    ? "border-2 border-black"
                    : "border border-gray-200"
                }`}
              >
                <img
                  src={frock5}
                  alt="Frock 5"
                  className="h-full w-full object-cover"
                />
              </button>

              <button
                type="button"
                onClick={() => selectImage(frock6)}
                className={`h-[58px] overflow-hidden bg-gray-100 sm:h-[72px] ${
                  selectedImage === frock6
                    ? "border-2 border-black"
                    : "border border-gray-200"
                }`}
              >
                <img
                  src={frock6}
                  alt="Frock 6"
                  className="h-full w-full object-cover"
                />
              </button>

            </div>

            <div className="flex-1 overflow-hidden bg-gray-100">
              <img
                src={selectedImage}
                alt="Women's Frock"
                className="
                  h-[430px] w-full object-cover
                  sm:h-[550px] lg:h-[590px]
                "
              />
            </div>

          </div>

          {/* =================================================
              RIGHT DETAILS
          ================================================= */}

          <div className="pt-1">

            <p className="mb-2 text-[11px] uppercase tracking-wide text-gray-500">
              Coco-Closet
            </p>

            <div className="flex items-start justify-between gap-5">

              <h1
                className="
                  font-serif text-3xl font-semibold
                  text-gray-900 sm:text-4xl
                "
              >
                Women's Frock
              </h1>

              <IconButton
                onClick={() => setLiked(!liked)}
                className="mt-[-5px] border border-gray-100"
              >
                {liked ? (
                  <FavoriteIcon className="text-red-500" />
                ) : (
                  <FavoriteBorderOutlinedIcon className="text-gray-700" />
                )}
              </IconButton>

            </div>

            {/* RATING */}

            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                <span className="text-sm">★</span>
                <span className="text-sm">★</span>
                <span className="text-sm">★</span>
                <span className="text-sm">★</span>
                <span className="text-sm text-gray-300">★</span>
              </div>

              <span className="text-xs text-gray-500">
                (3)
              </span>
            </div>

            {/* PRICE */}

            <div className="mt-3 flex items-center gap-3">

              <span className="text-xl font-medium text-gray-900">
                $39.00
              </span>

              <span className="text-sm text-gray-400 line-through">
                $59.00
              </span>

              <span
                className="
                  rounded bg-red-500 px-2 py-1
                  text-[9px] font-medium text-white
                "
              >
                SAVE 33%
              </span>

            </div>

            {/* VIEWERS */}

            <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
              <VisibilityOutlinedIcon fontSize="small" />
              <span>
                24 people are viewing this right now
              </span>
            </div>

            {/* SALE */}

            <div
              className="
                mt-5 flex items-center justify-between
                border border-red-100 bg-red-50
                px-3 py-3
              "
            >
              <span className="text-xs text-red-500">
                Hurry up! Sale ends in:
              </span>

              <span className="text-xs font-medium tracking-widest text-red-500">
                00 : 05 : 59 : 47
              </span>
            </div>

            {/* STOCK */}

            <div className="mt-5">

              <p className="mb-2 text-[11px] text-gray-500">
                Only 2 item(s) left in stock!
              </p>

              <LinearProgress
                variant="determinate"
                value={8}
                sx={{
                  height: 3,
                  backgroundColor: "#e5e5e5",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#ef4444",
                  },
                }}
              />

            </div>

            {/* SIZE */}

            <div className="mt-5">

              <p className="mb-2 text-xs font-medium text-gray-800">
                Size:{" "}
                <span
                  className={
                    selectedSize
                      ? "font-normal text-gray-500"
                      : "font-normal text-red-500"
                  }
                >
                  {selectedSize || "Select size"}
                </span>
              </p>

              <div className="flex gap-2">

                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => selectSize(size)}
                    className={`
                      h-8 rounded border text-xs
                      ${
                        size.length > 1
                          ? "w-10"
                          : "w-8"
                      }
                      ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-700"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}

              </div>

            </div>

            {/* COLOR */}

            <div className="mt-5">

              <p className="mb-2 text-xs font-medium text-gray-800">
                Color:{" "}
                <span
                  className={
                    selectedColor
                      ? "font-normal text-gray-500"
                      : "font-normal text-red-500"
                  }
                >
                  {selectedColor || "Select color"}
                </span>
              </p>

              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={() => selectColor("Blue")}
                  aria-label="Blue"
                  className={`
                    h-6 w-6 rounded-full
                    bg-blue-300 ring-offset-2
                    ${
                      selectedColor === "Blue"
                        ? "ring-1 ring-gray-700"
                        : ""
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() => selectColor("Black")}
                  aria-label="Black"
                  className={`
                    h-6 w-6 rounded-full
                    bg-black ring-offset-2
                    ${
                      selectedColor === "Black"
                        ? "ring-1 ring-gray-700"
                        : ""
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() => selectColor("Pink")}
                  aria-label="Pink"
                  className={`
                    h-6 w-6 rounded-full
                    bg-pink-300 ring-offset-2
                    ${
                      selectedColor === "Pink"
                        ? "ring-1 ring-gray-700"
                        : ""
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() => selectColor("White")}
                  aria-label="White"
                  className={`
                    h-6 w-6 rounded-full border
                    border-gray-300 bg-white ring-offset-2
                    ${
                      selectedColor === "White"
                        ? "ring-1 ring-gray-700"
                        : ""
                    }
                  `}
                />

              </div>

            </div>

            {/* QUANTITY */}

            <div className="mt-5">

              <p className="mb-2 text-xs font-medium text-gray-800">
                Quantity
              </p>

              <div className="flex gap-4">

                <div className="flex h-10 items-center border border-gray-200">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="
                      flex h-full w-9 items-center
                      justify-center text-gray-600
                      transition hover:bg-gray-50
                    "
                  >
                    <RemoveIcon fontSize="small" />
                  </button>

                  <span className="w-8 text-center text-xs">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="
                      flex h-full w-9 items-center
                      justify-center text-gray-600
                      transition hover:bg-gray-50
                    "
                  >
                    <AddIcon fontSize="small" />
                  </button>

                </div>

                <Button
                  onClick={addToCart}
                  variant="outlined"
                  className="
                    !h-10 !flex-1
                    !border-gray-500
                    !text-xs !normal-case !text-gray-900
                    hover:!bg-black hover:!text-white
                  "
                >
                  Add to cart
                </Button>

              </div>

              {/* VALIDATION */}

              {errorMessage && (
                <div
                  className="
                    mt-3 rounded-lg
                    border border-red-200
                    bg-red-50 px-3 py-2
                  "
                >
                  <p className="text-xs font-medium text-red-500">
                    {errorMessage}
                  </p>
                </div>
              )}

            </div>

            {/* ACTIONS */}

            <div
              className="
                mt-7 flex flex-wrap items-center
                gap-5 text-[11px] text-gray-600
              "
            >

              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-black"
              >
                <CompareArrowsOutlinedIcon fontSize="small" />
                Compare
              </button>

              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-black"
              >
                <HelpOutlineOutlinedIcon fontSize="small" />
                Ask a question
              </button>

              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-black"
              >
                <ShareOutlinedIcon fontSize="small" />
                Share
              </button>

            </div>

            <Divider className="!my-4" />

            {/* DELIVERY */}

            <div className="space-y-3 text-[11px] text-gray-700">

              <div className="flex items-center gap-2">
                <LocalShippingOutlinedIcon fontSize="small" />

                <span>
                  <strong>Estimated Delivery:</strong>{" "}
                  Aug 25 - Aug 29
                </span>
              </div>

              <div className="flex items-center gap-2">

                <span className="text-base">
                  🚚
                </span>

                <span>
                  <strong>Free Shipping & Returns:</strong>{" "}
                  On all orders over $75
                </span>

              </div>

            </div>

            {/* CHECKOUT */}

            <div className="mt-5 bg-gray-50 px-4 py-5 text-center">

              <div className="flex items-center justify-center gap-2">

                <div className="rounded bg-white px-2 py-1 text-[9px] font-bold text-blue-700 shadow-sm">
                  VISA
                </div>

                <div className="rounded bg-white px-2 py-1 text-[9px] font-bold text-red-500 shadow-sm">
                  MC
                </div>

                <div className="rounded bg-white px-2 py-1 text-[9px] font-bold text-blue-500 shadow-sm">
                  AMEX
                </div>

                <div className="rounded bg-white px-2 py-1 text-[9px] font-bold text-gray-600 shadow-sm">
                  DISC
                </div>

                <div className="rounded bg-white px-2 py-1 text-[9px] font-bold text-blue-700 shadow-sm">
                  PAY
                </div>

              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-700">
                <CreditCardOutlinedIcon fontSize="small" />
                Guarantee safe & secure checkout
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}

      <Description />
      <Social />
      <Newletter />

      {/* =====================================================
          CART MODAL
      ===================================================== */}

      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="cart-modal-title"
      >
        <Box
          className="
            absolute left-1/2 top-1/2
            w-[92%] max-w-[520px]
            -translate-x-1/2
            -translate-y-1/2
            overflow-hidden
            rounded-2xl bg-white
            shadow-2xl outline-none
          "
        >

          {/* HEADER */}

          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

            <div>

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Coco-Closet
              </p>

              <h2
                id="cart-modal-title"
                className="mt-1 text-lg font-semibold text-gray-900"
              >
                Added to Cart
              </h2>

            </div>

            <IconButton
              onClick={closeModal}
              size="small"
              className="!rounded-full hover:!bg-gray-100"
            >
              <CloseIcon fontSize="small" />
            </IconButton>

          </div>

          {/* PRODUCT */}

          <div className="flex gap-4 p-5">

            <div
              className="
                h-28 w-24 shrink-0
                overflow-hidden rounded-xl bg-gray-100
              "
            >
              <img
                src={selectedImage}
                alt="Women's Frock"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  Coco-Closet
                </p>

                <h3 className="mt-1 text-base font-semibold text-gray-900">
                  Women's Frock
                </h3>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  $39.00
                </p>

              </div>

              <div className="mt-3 flex flex-wrap gap-2">

                <span className="rounded-md bg-gray-100 px-3 py-1 text-[11px] text-gray-600">
                  Size: {selectedSize}
                </span>

                <span className="rounded-md bg-gray-100 px-3 py-1 text-[11px] text-gray-600">
                  Color: {selectedColor}
                </span>

                <span className="rounded-md bg-gray-100 px-3 py-1 text-[11px] text-gray-600">
                  Qty: {quantity}
                </span>

              </div>

            </div>
          </div>

          <Divider />

          {/* SUBTOTAL */}

          <div className="flex items-center justify-between px-5 py-4">

            <span className="text-sm text-gray-500">
              Subtotal
            </span>

            <span className="text-lg font-semibold text-gray-900">
              ${(productPrice * quantity).toFixed(2)}
            </span>

          </div>

          {/* BUTTONS */}

          <div className="grid grid-cols-2 gap-3 bg-gray-50 px-5 py-4">

            <Button
              onClick={closeModal}
              variant="outlined"
              className="
                !h-11 !border-gray-300
                !text-xs !normal-case !text-gray-800
              "
            >
              Continue Shopping
            </Button>

            {/* VIEW CART */}

            <Link
              to="/billingcart"
              onClick={closeModal}
              className="no-underline"
            >
              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingBagOutlinedIcon />}
                className="
                  !h-11 !w-full
                  !bg-black !text-xs
                  !normal-case !shadow-none
                  hover:!bg-gray-800
                "
              >
                View Cart
              </Button>
            </Link>

          </div>

        </Box>
      </Modal>

    </div>
  );
}

export default Productdetails;