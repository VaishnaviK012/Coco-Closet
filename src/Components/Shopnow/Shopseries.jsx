import React, { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TuneIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { Button, Slider } from "@mui/material";

function Shopseries() {
  // =====================================================
  // API
  // =====================================================

  const API_URL = "http://localhost:5000";

  // =====================================================
  // FILTER STATES
  // =====================================================

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCollection, setSelectedCollection] =
    useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Price is ONLY for filtering
  const [price, setPrice] = useState(10000);

  // =====================================================
  // PRODUCT STATES
  // =====================================================

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // =====================================================
  // LOADING / ERROR
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // PAGINATION
  // =====================================================

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

  // =====================================================
  // LIKED PRODUCTS
  // =====================================================

  const [likedProducts, setLikedProducts] = useState({});

  // =====================================================
  // MOBILE FILTER
  // =====================================================

  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  // =====================================================
  // POPUP
  // =====================================================

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  // =====================================================
  // FILTER OPTIONS
  // =====================================================

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const colors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Pink",
    "Purple",
    "Orange",
    "Brown",
    "Gray",
    "Navy",
  ];

  const brands = [
    "Nike",
    "Adidas",
    "Zara",
    "H&M",
    "Levi's",
  ];

  const collections = [
    "New Arrivals",
    "Summer",
    "Winter",
    "Sale",
  ];

  const tags = [
    "New",
    "Trending",
    "Best Seller",
    "Sale",
  ];

  // =====================================================
  // POPUP
  // =====================================================

  const showPopup = (type, message) => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/product`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch products"
          );
        }

        const productList = Array.isArray(data)
          ? data
          : data.products ||
            data.product ||
            data.data ||
            [];

        setProducts(
          Array.isArray(productList)
            ? productList
            : []
        );
      } catch (error) {
        console.error(
          "FETCH PRODUCTS ERROR:",
          error
        );

        setError(
          "Unable to load products. Check backend."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // FILTER VALIDATION
  // =====================================================

  // Filters are NOT mandatory for Shop Now
  const validateFilters = () => {
    return true;
  };

  // =====================================================
  // PRODUCT VALIDATION
  // =====================================================

  const validateProduct = () => {
    if (!selectedProduct) {
      showPopup(
        "error",
        "Please select a product first."
      );

      return false;
    }

    return true;
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

 const addToCart = async (item) => {
  try {
    if (!item) {
      showPopup("error", "Please select a product first.");
      return;
    }

    const productId = item._id || item.id;

    if (!productId) {
      showPopup("error", "Product ID is missing.");
      return;
    }

    if (!item.name) {
      showPopup("error", "Product name is missing.");
      return;
    }

    if (item.price === undefined || item.price === null) {
      showPopup("error", "Product price is missing.");
      return;
    }

    if (!item.image) {
      showPopup("error", "Product image is missing.");
      return;
    }

    // IMPORTANT:
    // Backend maximum price maang raha hai.
    const maxPrice = Number(price);

    if (!maxPrice || maxPrice < 500) {
      showPopup("error", "Please select a valid maximum price.");
      return;
    }

    const response = await fetch(`${API_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: String(productId),
        name: String(item.name),

        // Product ki actual price
        price: Number(item.price),

        image: String(item.image),

        quantity: 1,

        // Selected filters
        size: selectedSize,
        color: selectedColor,

        brand: selectedBrand || item.brand || "",

        collection:
          selectedCollection ||
          item.collection ||
          "",

        tag:
          selectedTag ||
          item.tag ||
          "",

        // IMPORTANT - backend expects this
        maxPrice: maxPrice,
      }),
    });

    const data = await response.json();

    console.log("CART API RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to store product"
      );
    }

    showPopup(
      "success",
      "Product added to cart successfully!"
    );
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);

    showPopup(
      "error",
      error.message || "Product cart mein save nahi hua."
    );
  }
};

  // =====================================================
  // SELECT PRODUCT
  // =====================================================

  const selectProduct = (product) => {
    if (!product) {
      showPopup(
        "error",
        "Product not found."
      );

      return;
    }

    setSelectedProduct(product);

    showPopup(
      "success",
      "Product selected successfully."
    );
  };

  // =====================================================
  // CENTER SHOP NOW
  // =====================================================

  const handleShopNow = () => {
    if (!validateFilters()) {
      return;
    }

    if (!validateProduct()) {
      return;
    }

    addToCart(selectedProduct);
  };

  // =====================================================
  // DIRECT ADD TO CART
  // =====================================================

  const handleAddToCart = (product) => {
    if (!product) {
      showPopup(
        "error",
        "Product not found."
      );

      return;
    }

    setSelectedProduct(product);

    addToCart(product);
  };

  // =====================================================
  // HEART
  // =====================================================

  const toggleHeart = (id) => {
    if (!id) return;

    setLikedProducts((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSelectedSize("");
    setSelectedColor("");
    setSelectedBrand("");
    setSelectedCollection("");
    setSelectedTag("");

    // Reset maximum filter price
    setPrice(10000);

    setSelectedProduct(null);

    setCurrentPage(1);

    showPopup(
      "success",
      "All filters have been cleared."
    );
  };

  // =====================================================
  // FILTER HELPER
  // =====================================================

  const normalizeArray = (value) => {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts = products.filter(
    (product) => {
      const productPrice =
        Number(product.price) || 0;

      // PRICE FILTER ONLY
      if (productPrice > price) {
        return false;
      }

      // SIZE
      if (selectedSize) {
        const sizesArray =
          normalizeArray(
            product.sizes
          );

        if (
          sizesArray.length > 0 &&
          !sizesArray.some(
            (size) =>
              String(size).toLowerCase() ===
              selectedSize.toLowerCase()
          )
        ) {
          return false;
        }
      }

      // COLOR
      if (selectedColor) {
        const colorsArray =
          normalizeArray(
            product.colorNames ||
              product.colors
          );

        if (
          colorsArray.length > 0 &&
          !colorsArray.some(
            (color) =>
              String(color).toLowerCase() ===
              selectedColor.toLowerCase()
          )
        ) {
          return false;
        }
      }

      // BRAND
      if (
        selectedBrand &&
        product.brand &&
        String(product.brand)
          .toLowerCase() !==
          selectedBrand.toLowerCase()
      ) {
        return false;
      }

      // COLLECTION
      if (
        selectedCollection &&
        product.collection &&
        String(product.collection)
          .toLowerCase() !==
          selectedCollection.toLowerCase()
      ) {
        return false;
      }

      // TAG
      if (
        selectedTag &&
        product.tag &&
        String(product.tag)
          .toLowerCase() !==
          selectedTag.toLowerCase()
      ) {
        return false;
      }

      return true;
    }
  );

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        productsPerPage
    )
  );

  const startIndex =
    (currentPage - 1) *
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  // =====================================================
  // FILTER SETTERS
  // =====================================================

  const handleSize = (size) => {
    setSelectedSize(
      selectedSize === size ? "" : size
    );

    setCurrentPage(1);
  };

  const handleColor = (color) => {
    setSelectedColor(
      selectedColor === color ? "" : color
    );

    setCurrentPage(1);
  };

  const handleBrand = (brand) => {
    setSelectedBrand(
      selectedBrand === brand ? "" : brand
    );

    setCurrentPage(1);
  };

  const handleCollection = (collection) => {
    setSelectedCollection(
      selectedCollection === collection
        ? ""
        : collection
    );

    setCurrentPage(1);
  };

  const handleTag = (tag) => {
    setSelectedTag(
      selectedTag === tag ? "" : tag
    );

    setCurrentPage(1);
  };

  // =====================================================
  // FILTER COMPONENT
  // =====================================================

  const FilterContent = () => {
    return (
      <>
        {/* SIZE */}

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-800">
            Size
          </h3>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() =>
                  handleSize(size)
                }
                className={`rounded-lg border px-3 py-2 text-sm transition ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* COLOR */}

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-800">
            Color
          </h3>

          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                type="button"
                key={color}
                onClick={() =>
                  handleColor(color)
                }
                className={`rounded-lg border px-1 py-2 text-[10px] transition ${
                  selectedColor === color
                    ? "border-black bg-black font-bold text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE */}

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-800">
            Price
          </h3>

         <Slider
  value={price}
  onChange={(_, value) => {
    setPrice(Array.isArray(value) ? value[0] : value);
    setCurrentPage(1);
  }}
  min={500}
  max={10000}
  step={500}
  valueLabelDisplay="auto"
/>

          <div className="flex justify-between text-xs text-gray-500">
            <span>₹500</span>

            <span>
              ₹
              {Number(price).toLocaleString(
                "en-IN"
              )}
            </span>
          </div>
        </div>

        {/* BRAND */}

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-800">
            Brand
          </h3>

          {brands.map((brand) => (
            <label
              key={brand}
              className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="radio"
                name="brand"
                checked={
                  selectedBrand === brand
                }
                onChange={() =>
                  handleBrand(brand)
                }
                className="accent-black"
              />

              {brand}
            </label>
          ))}
        </div>

        {/* COLLECTION */}

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-800">
            Collection
          </h3>

          {collections.map(
            (collection) => (
              <button
                type="button"
                key={collection}
                onClick={() =>
                  handleCollection(
                    collection
                  )
                }
                className={`mb-2 block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  selectedCollection ===
                  collection
                    ? "bg-black text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {collection}
              </button>
            )
          )}
        </div>

        {/* TAG */}

        <div>
          <h3 className="mb-3 font-semibold text-gray-800">
            Tags
          </h3>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() =>
                  handleTag(tag)
                }
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  selectedTag === tag
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =================================================
          POPUP
      ================================================= */}

      {popup.show && (
        <div className="fixed right-5 top-5 z-[9999] max-w-[calc(100%-40px)]">
          <div
            className={`flex items-center gap-3 rounded-xl px-5 py-3 text-white shadow-xl ${
              popup.type === "success"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {popup.type === "success" ? (
              <CheckCircleIcon />
            ) : (
              <ErrorIcon />
            )}

            <span className="text-sm font-medium">
              {popup.message}
            </span>

            <button
              type="button"
              onClick={() =>
                setPopup({
                  show: false,
                  type: "",
                  message: "",
                })
              }
              className="ml-2"
            >
              <ClearIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}

      {/* =================================================
          MOBILE FILTER BUTTON
      ================================================= */}

      <div className="mx-auto flex max-w-7xl justify-end px-5 pt-5 md:hidden">
        <Button
          startIcon={<TuneIcon />}
          variant="outlined"
          onClick={() =>
            setMobileFilterOpen(
              !mobileFilterOpen
            )
          }
          className="!rounded-full !border-gray-300 !text-gray-800 !normal-case"
        >
          Filters
        </Button>
      </div>

      {/* =================================================
          MOBILE FILTER
      ================================================= */}

      {mobileFilterOpen && (
        <div className="mx-5 mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:hidden">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              Filters
            </h2>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-pink-500"
            >
              Clear All
            </button>
          </div>

          <FilterContent />

        </div>
      )}

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="mx-auto flex max-w-7xl gap-6 px-5 py-8">

        {/* =================================================
            DESKTOP SIDEBAR
        ================================================= */}

        <aside className="sticky top-24 hidden h-fit w-64 shrink-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:block">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              Filters
            </h2>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-pink-500 transition hover:text-pink-700"
            >
              Clear All
            </button>
          </div>

          <FilterContent />

        </aside>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        <main className="min-w-0 flex-1">

          {/* TOP BAR */}

          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm font-medium text-pink-500">
                Collection
              </p>

              <h1 className="text-3xl font-bold text-gray-900">
                Women's Fashion
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {filteredProducts.length}{" "}
                products
              </p>
            </div>

            <div className="text-sm font-medium text-gray-500">
              Page {currentPage} /{" "}
              {totalPages}
            </div>

          </div>

          {/* SELECTED FILTER SUMMARY */}

          <div className="mb-6 flex flex-wrap gap-2">

            {selectedSize && (
              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs text-white">
                Size: {selectedSize}
              </span>
            )}

            {selectedColor && (
              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs text-white">
                Color: {selectedColor}
              </span>
            )}

            {selectedBrand && (
              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs text-white">
                Brand: {selectedBrand}
              </span>
            )}

            {selectedCollection && (
              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs text-white">
                {selectedCollection}
              </span>
            )}

            {selectedTag && (
              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs text-white">
                Tag: {selectedTag}
              </span>
            )}

            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
              Max ₹
              {Number(price).toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (
            <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-white shadow-sm">

              <div className="text-center">

                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-pink-500" />

                <p className="text-gray-600">
                  Loading products...
                </p>

              </div>

            </div>

          ) : error ? (

            /* =================================================
                ERROR
            ================================================= */

            <div className="flex min-h-[500px] items-center justify-center">

              <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

                <ErrorIcon className="mb-3 !text-5xl !text-red-500" />

                <h2 className="text-xl font-bold text-gray-800">
                  {error}
                </h2>

                <p className="mt-2 text-gray-500">
                  Make sure your backend and MongoDB
                  are running.
                </p>

                <Button
                  onClick={() =>
                    window.location.reload()
                  }
                  variant="contained"
                  className="!mt-5 !rounded-full !bg-black !px-6 !py-2 !normal-case"
                >
                  Retry
                </Button>

              </div>

            </div>

          ) : products.length === 0 ? (

            /* =================================================
                NO PRODUCTS
            ================================================= */

            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

              <h2 className="text-xl font-semibold text-gray-800">
                No products found
              </h2>

              <p className="mt-2 text-gray-500">
                Add products to MongoDB first.
              </p>

            </div>

          ) : filteredProducts.length === 0 ? (

            /* =================================================
                NO FILTERED PRODUCTS
            ================================================= */

            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

              <h2 className="text-xl font-semibold text-gray-800">
                No products match your filters
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your filters.
              </p>

              <Button
                onClick={clearFilters}
                variant="contained"
                className="!mt-5 !rounded-full !bg-black !px-6 !normal-case"
              >
                Clear Filters
              </Button>

            </div>

          ) : (

            <>
              {/* =================================================
                  PRODUCT GRID
              ================================================= */}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {currentProducts.map(
                  (product) => {

                    const productId =
                      product._id ||
                      product.id;

                    const isLiked =
                      likedProducts[
                        productId
                      ];

                    const selectedId =
                      selectedProduct?._id ||
                      selectedProduct?.id;

                    const isSelected =
                      String(selectedId) ===
                      String(productId);

                    const productColors =
                      normalizeArray(
                        product.colors ||
                          product.colorNames
                      );

                    return (
                      <div
                        key={productId}
                        className={`group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                          isSelected
                            ? "ring-2 ring-pink-500"
                            : ""
                        }`}
                      >

                        {/* IMAGE */}

                        <div className="relative h-[330px] overflow-hidden bg-gray-100">

                          {product.image ? (
                            <img
                              src={product.image}
                              alt={
                                product.name ||
                                "Product"
                              }
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}

                          {/* HEART */}

                          <button
                            type="button"
                            onClick={() =>
                              toggleHeart(
                                productId
                              )
                            }
                            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:scale-110"
                          >
                            {isLiked ? (
                              <FavoriteIcon className="!text-pink-500" />
                            ) : (
                              <FavoriteBorderIcon className="!text-gray-700" />
                            )}
                          </button>

                        </div>

                        {/* CONTENT */}

                        <div className="p-4">

                          <h3 className="line-clamp-1 font-semibold text-gray-900">
                            {product.name ||
                              "Unnamed Product"}
                          </h3>

                          {/* ACTUAL PRODUCT PRICE */}

                          <p className="mt-1 text-lg font-bold text-gray-900">
                            ₹
                            {Number(
                              product.price || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          {product.brand && (
                            <p className="mt-1 text-xs text-gray-500">
                              {product.brand}
                            </p>
                          )}

                          {/* COLORS */}

                          {productColors.length >
                            0 && (
                            <div className="mt-3 flex flex-wrap gap-2">

                              {productColors.map(
                                (
                                  color,
                                  index
                                ) => (
                                  <span
                                    key={index}
                                    title={String(
                                      color
                                    )}
                                    className="rounded-full border border-gray-300 bg-gray-100 px-2 py-1 text-[10px] text-gray-600"
                                  >
                                    {String(
                                      color
                                    )}
                                  </span>
                                )
                              )}

                            </div>
                          )}

                          {/* SELECT PRODUCT */}

                          <button
                            type="button"
                            onClick={() =>
                              selectProduct(
                                product
                              )
                            }
                            className={`mt-4 w-full rounded-xl py-2.5 text-sm font-semibold transition ${
                              isSelected
                                ? "bg-pink-500 text-white"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {isSelected
                              ? "Selected ✓"
                              : "Select Product"}
                          </button>

                          {/* ADD TO CART */}

                          <Button
                            onClick={() =>
                              handleAddToCart(
                                product
                              )
                            }
                            fullWidth
                            variant="contained"
                            className="!mt-2 !rounded-xl !bg-black !py-2.5 !normal-case hover:!bg-gray-800"
                          >
                            Add to Cart
                          </Button>

                        </div>
                      </div>
                    );
                  }
                )}

              </div>

              {/* =================================================
                  ONLY ONE CENTER SHOP NOW BUTTON
              ================================================= */}

              <div className="mt-10 flex justify-center">

                <Button
                  onClick={handleShopNow}
                  variant="contained"
                  className="!rounded-full !bg-gradient-to-r !from-pink-500 !via-purple-500 !to-blue-500 !px-12 !py-3 !font-semibold !normal-case !shadow-lg transition duration-300 hover:!-translate-y-0.5 hover:!shadow-xl"
                >
                  Shop Now
                </Button>

              </div>

              {/* =================================================
                  PAGINATION
              ================================================= */}

              {totalPages > 1 && (
                <div className="mt-8 flex flex-wrap justify-center gap-2">

                  {/* PREVIOUS */}

                  <button
                    type="button"
                    disabled={
                      currentPage === 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          page - 1
                      )
                    }
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {/* PAGE NUMBERS */}

                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) =>
                      index + 1
                  ).map((page) => (
                    <button
                      type="button"
                      key={page}
                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }
                      className={`h-10 w-10 rounded-lg text-sm transition ${
                        currentPage ===
                        page
                          ? "bg-black text-white"
                          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* NEXT */}

                  <button
                    type="button"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          page + 1
                      )
                    }
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>

                </div>
              )}

            </>
          )}

        </main>
      </div>
    </div>
  );
}

export default Shopseries;