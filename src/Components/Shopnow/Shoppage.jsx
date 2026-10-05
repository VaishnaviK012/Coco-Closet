import React, { useState } from "react";
import Shopseries from "./Shopseries";
import { useEffect } from "react";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";

import { Link } from "react-router-dom";

// MUI Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import Description from "../Thumbnail/Description";
import Social from "../Thumbnail/Social";
import Newletter from "../Thumbnail/Newletter";

function Shoppage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // SUCCESS POPUP
  const [successOpen, setSuccessOpen] = useState(false);

  // VALIDATION POPUP
  const [validationOpen, setValidationOpen] = useState(false);

  // VALIDATION MESSAGE
  const [validationMessage, setValidationMessage] = useState(
    "Please select both size and color before selecting the product."
  );

  // SELECTED DATA
  const [selectedData, setSelectedData] = useState({
    size: "",
    color: "",
  });

  // SIGN OUT POPUP
  const [signedOut, setSignedOut] = useState(false);

  // CLOSE DRAWER
  const closeDrawer = () => {
    setMenuOpen(false);
  };

  // =====================================================
  // RECEIVE SELECTION FROM SHOPSERIES
  // =====================================================

  const handleSelectionSuccess = (data) => {
    const size = data?.size || "";
    const color = data?.color || "";

    console.log("Received:", {
      size,
      color,
    });

    // NO SIZE + NO COLOR
    if (!size && !color) {
      setValidationMessage(
        "Please select both size and color before selecting the product."
      );

      setValidationOpen(true);
      return;
    }

    // NO SIZE
    if (!size) {
      setValidationMessage(
        "Please select a size before selecting the product."
      );

      setValidationOpen(true);
      return;
    }

    // NO COLOR
    if (!color) {
      setValidationMessage(
        "Please select a color before selecting the product."
      );

      setValidationOpen(true);
      return;
    }

    // VALID
    setSelectedData({
      size,
      color,
    });

    setValidationOpen(false);

    console.log("Selected Product:", {
      size,
      color,
    });

    
    // SUCCESS POPUP
    setSuccessOpen(true);
  };

  // =====================================================
  // SHOP NOW BUTTON
  // =====================================================

  const handleShopNow = () => {
    if (!selectedData.size && !selectedData.color) {
      setValidationMessage(
        "Please select both size and color first."
      );

      setValidationOpen(true);
      return;
    }

    if (!selectedData.size) {
      setValidationMessage(
        "Please select a size first."
      );

      setValidationOpen(true);
      return;
    }

    if (!selectedData.color) {
      setValidationMessage(
        "Please select a color first."
      );

      setValidationOpen(true);
      return;
    }

    // Everything selected
    setSuccessOpen(true);
  };

  // CLOSE SUCCESS
  const closeSuccessPopup = () => {
    setSuccessOpen(false);
  };

  // CLOSE VALIDATION
  const closeValidationPopup = () => {
    setValidationOpen(false);
  };

  // SIGN OUT
  const handleSignOut = () => {
    console.log("User signed out");

    setMenuOpen(false);
    setSignedOut(true);
  };

  
  return (
    <div className="w-full">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <AppBar
        position="sticky"
        elevation={0}
        className="
          !bg-white/95
          !text-black
          !shadow-[0_4px_20px_rgba(0,0,0,0.06)]
          backdrop-blur-md
        "
      >
        <Toolbar
          className="
            mx-auto
            grid
            min-h-16
            w-full
            max-w-7xl
            grid-cols-2
            items-center
            px-3
            sm:px-5
            md:grid-cols-3
            lg:px-8
          "
        >

          {/* LOGO */}

          <div className="flex items-center justify-start gap-2 whitespace-nowrap">

            <Typography
              component="div"
              className="
                !text-base
                !font-bold
                !leading-none
                !text-gray-800
                sm:!text-lg
              "
            >
              Coco-Closet
            </Typography>

            <img
              src="/icons8-bow-tie-100.png"
              alt="Bow tie"
              className="
                -ml-1
                h-8
                w-7
                animate-bounce
                sm:h-7
                sm:w-7
              "
            />

          </div>

          {/* DESKTOP MENU */}

          <nav className="hidden items-center justify-center gap-5 md:flex lg:gap-8">

            <Link
              to="/home"
              className="
                group relative whitespace-nowrap text-sm
                font-medium text-gray-600 no-underline
                transition-colors duration-300
                hover:text-gray-950
              "
            >
              Home

              <span
                className="
                  absolute -bottom-2 left-0 h-px w-0
                  rounded-full bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

          <Link
  to="/shoppage"
  onClick={() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }}
  className="
    group relative whitespace-nowrap text-sm
    font-semibold text-gray-950 no-underline
  "
>
  Shop

  <span
    className="
      absolute -bottom-2 left-0 h-px w-full
      rounded-full bg-gray-900
    "
  />
</Link>

            <Link
              to="/productdetail"
              className="
                group relative whitespace-nowrap text-sm
                font-medium text-gray-600 no-underline
                transition-colors duration-300
                hover:text-gray-950
              "
            >
              Product

              <span
                className="
                  absolute -bottom-2 left-0 h-px w-0
                  rounded-full bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

            <Link
              to="/contact"
              className="
                group relative whitespace-nowrap text-sm
                font-medium text-gray-600 no-underline
                transition-colors duration-300
                hover:text-gray-950
              "
            >
              Contact

              <span
                className="
                  absolute -bottom-2 left-0 h-px w-0
                  rounded-full bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

          </nav>

          {/* MOBILE MENU */}

          <div className="flex items-center justify-end md:hidden">

            <IconButton
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="
                !rounded-xl
                !text-gray-700
                hover:!bg-gray-100
              "
            >
              <MenuIcon />
            </IconButton>

          </div>

        </Toolbar>
      </AppBar>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={closeDrawer}
        PaperProps={{
          className: "!w-[300px] sm:!w-[340px]",
        }}
      >

        <div className="flex min-h-full flex-col bg-white">

          {/* DRAWER HEADER */}

          <div
            className="
              flex items-center justify-between
              border-b border-gray-100
              px-5 py-5
            "
          >

            <Link
              to="/home"
              onClick={closeDrawer}
              className="flex items-center no-underline"
            >

              <Typography
                component="div"
                className="
                  !text-lg
                  !font-bold
                  !leading-none
                  !tracking-tight
                  !text-gray-900
                "
              >
                Coco-Closet
              </Typography>

              <img
                src="/icons8-bow-tie-100.png"
                alt="Bow tie"
                className="
                  ml-1 h-8 w-7 animate-bounce
                  sm:h-7 sm:w-7
                "
              />

            </Link>

            <IconButton
              onClick={closeDrawer}
              size="small"
              aria-label="Close menu"
              className="
                !rounded-xl
                !text-gray-500
                transition
                hover:!bg-gray-100
                hover:!text-black
              "
            >
              <CloseIcon fontSize="small" />
            </IconButton>

          </div>

          {/* NAVIGATION */}

          <div className="flex flex-col gap-1 px-3 py-5">

            <Link
              to="/home"
              onClick={closeDrawer}
              className="
                group flex items-center gap-3
                rounded-xl px-4 py-3
                text-sm font-medium text-gray-700
                no-underline transition-all duration-200
                hover:bg-gray-100 hover:text-black
              "
            >
              <HomeOutlinedIcon
                fontSize="small"
                className="
                  !text-gray-500
                  transition
                  group-hover:!text-black
                "
              />

              <span>Home</span>
            </Link>

            <Link
              to="/shoppage"
              onClick={closeDrawer}
              className="
                group flex items-center gap-3
                rounded-xl bg-gray-100 px-4 py-3
                text-sm font-semibold text-black
                no-underline
              "
            >
              <LocalOfferOutlinedIcon
                fontSize="small"
                className="!text-black"
              />

              <span>Shop</span>
            </Link>

            <Link
              to="/productdetail"
              onClick={closeDrawer}
              className="
                group flex items-center gap-3
                rounded-xl px-4 py-3
                text-sm font-medium text-gray-700
                no-underline transition-all duration-200
                hover:bg-gray-100 hover:text-black
              "
            >
              <Inventory2OutlinedIcon
                fontSize="small"
                className="
                  !text-gray-500
                  transition
                  group-hover:!text-black
                "
              />

              <span>Product</span>
            </Link>

            <Link
              to="/contact"
              onClick={closeDrawer}
              className="
                group flex items-center gap-3
                rounded-xl px-4 py-3
                text-sm font-medium text-gray-700
                no-underline transition-all duration-200
                hover:bg-gray-100 hover:text-black
              "
            >
              <ContactSupportOutlinedIcon
                fontSize="small"
                className="
                  !text-gray-500
                  transition
                  group-hover:!text-black
                "
              />

              <span>Contact</span>
            </Link>

          </div>

          {/* SIGN OUT */}

          <div className="mt-auto border-t border-gray-100 px-4 py-5">

            <Button
              fullWidth
              variant="contained"
              onClick={handleSignOut}
              startIcon={<LogoutOutlinedIcon fontSize="small" />}
              className="
                !h-9
                !min-w-[100px]
                !rounded-full
                !bg-linear-to-r
                !from-pink-500
                !via-purple-500
                !to-blue-500
                !px-4
                !text-[10px]
                !font-semibold
                !normal-case
                !tracking-wide
                !text-white
                !shadow-md
                transition-all duration-300
                hover:!-translate-y-0.5
                hover:!shadow-lg
                active:!translate-y-0
                sm:!min-w-[110px]
                sm:!px-5
                sm:!text-[11px]
              "
            >
              Sign Out
            </Button>

            <p className="mt-3 text-center text-[10px] text-gray-400">
              Coco-Closet • Fashion & Style
            </p>

          </div>

        </div>

      </Drawer>

      {/* =====================================================
          SHOP CONTENT
      ===================================================== */}

      <Shopseries
        onSelectionSuccess={handleSelectionSuccess}
      />

      {/* =====================================================
          SHOP NOW BUTTON
          IMPORTANT: THIS IS OUTSIDE ALL DIALOGS
      ===================================================== */}

    
      <Description />

      <Social />

      <Newletter />

      {/* =====================================================
          VALIDATION POPUP
      ===================================================== */}

      <Dialog
        open={validationOpen}
        onClose={closeValidationPopup}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          className: "!mx-4 !rounded-3xl",
        }}
      >

        <DialogContent className="!px-6 !py-8 text-center">

          <div
            className="
              mx-auto flex h-16 w-16
              items-center justify-center
              rounded-full bg-orange-50
            "
          >
            <span className="text-3xl">⚠️</span>
          </div>

          <Typography
            className="
              !mt-5
              !text-xl
              !font-bold
              !text-gray-900
            "
          >
            Select Your Options
          </Typography>

          <Typography
            className="
              !mt-2
              !text-sm
              !leading-6
              !text-gray-500
            "
          >
            {validationMessage}
          </Typography>

          <Button
            fullWidth
            onClick={closeValidationPopup}
            className="
              !mt-6
              !rounded-full
              !bg-black
              !py-3
              !text-sm
              !font-semibold
              !normal-case
              !text-white
              hover:!bg-gray-800
            "
          >
            Okay, Got It
          </Button>

        </DialogContent>

      </Dialog>

      {/* =====================================================
          SUCCESS POPUP
      ===================================================== */}

      <Dialog
        open={successOpen}
        onClose={closeSuccessPopup}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          className: "!mx-4 !rounded-3xl",
        }}
      >

        <DialogContent className="!px-6 !py-8 text-center">

          <div
            className="
              mx-auto mb-5 flex h-16 w-16
              items-center justify-center
              rounded-full bg-green-50
            "
          >

            <span
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-full bg-green-500
                text-2xl font-bold text-white
              "
            >
              ✓
            </span>

          </div>

          <Typography
            className="
              !mb-2
              !text-xl
              !font-bold
              !text-gray-900
            "
          >
            Product Selected Successfully!
          </Typography>

          <Typography
            className="
              !mb-6
              !text-sm
              !leading-6
              !text-gray-500
            "
          >
            Your selected size and color have been saved successfully.
          </Typography>

          <div
            className="
              mb-6
              rounded-2xl
              bg-gray-50
              p-4
              text-left
            "
          >

            <div className="flex items-center justify-between">

              <span className="text-sm text-gray-600">
                Selected Size:
              </span>

              <span className="font-semibold text-gray-900">
                {selectedData.size}
              </span>

            </div>

            <div className="mt-3 flex items-center justify-between">

              <span className="text-sm text-gray-600">
                Selected Color:
              </span>

              <span className="font-semibold text-gray-900">
                {selectedData.color}
              </span>

            </div>

          </div>

          <Button
            fullWidth
            onClick={closeSuccessPopup}
            className="
              !rounded-full
              !bg-black
              !py-3
              !text-sm
              !font-semibold
              !normal-case
              !text-white
              hover:!bg-gray-800
            "
          >
            Continue Shopping
          </Button>

        </DialogContent>

      </Dialog>

      {/* =====================================================
          SIGN OUT POPUP
      ===================================================== */}

      <Dialog
        open={signedOut}
        onClose={() => setSignedOut(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          className: "!mx-4 !rounded-3xl",
        }}
      >

        <DialogContent className="!px-6 !py-8 text-center">

          <div
            className="
              mx-auto flex h-14 w-14
              items-center justify-center
              rounded-full bg-gray-100
            "
          >
            <span className="text-xl font-bold text-gray-700">
              ✓
            </span>
          </div>

          <Typography
            className="
              !mt-4
              !text-lg
              !font-bold
              !text-gray-900
            "
          >
            Signed Out
          </Typography>

          <Typography
            className="
              !mt-2
              !text-sm
              !text-gray-500
            "
          >
            You have been signed out successfully.
          </Typography>

          <Button
            fullWidth
            onClick={() => setSignedOut(false)}
            className="
              !mt-5
              !rounded-full
              !bg-black
              !py-3
              !text-sm
              !font-semibold
              !normal-case
              !text-white
              hover:!bg-gray-800
            "
          >
            Done
          </Button>

        </DialogContent>

      </Dialog>

    </div>
  );
}

export default Shoppage;