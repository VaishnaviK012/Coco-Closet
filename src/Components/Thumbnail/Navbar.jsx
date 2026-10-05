import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Drawer,
  Link,
} from "@mui/material";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

const slides = [
  {
    bg: "188bbf25-f880-4a11-9955-02f6a903b870.png",
    images: ["/model1.png", "/model2.png", "/model3.png"],
  },
  {
    bg: "images (1).jpg",
    images: ["/model4.png", "/model5.png", "/model6.png"],
  },
  {
    bg: "portrait-of-lovely-beautiful-brunette-woman-sending-air-kiss-at-camera-blowing-mwah-with-palm-near-puckered-lips-and-closed-eyes-standing-over-blue-background-photo.jpg",
    images: ["/model7.png", "/model8.png"],
  },
];

export default function Navbar() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  // =========================
  // SLIDER
  // =========================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // HOME
  // =========================

  const goHome = () => {
    setMenuOpen(false);

    if (window.location.pathname !== "/home") {
      navigate("/home");

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 400);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // =========================
  // SMOOTH SECTION SCROLL
  // =========================

  const scrollToSection = (id) => {
    setMenuOpen(false);

    const scroll = () => {
      const section = document.getElementById(id);

      if (!section) {
        console.log(`Section #${id} not found`);
        return;
      }

      const navbarHeight = 70;

      const sectionTop =
        section.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    };

    // Agar kisi aur page par hai
    if (window.location.pathname !== "/home") {
      navigate("/home");

      // Home render hone ke baad section find karo
      setTimeout(scroll, 500);
    } else {
      scroll();
    }
  };

  // =========================
  // LOGOUT
  // =========================

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setMenuOpen(false);

  window.location.replace("/");
};
  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <AppBar
        position="sticky"
        elevation={0}
        className="
          bg-white/95
          text-black
          shadow-sm
          backdrop-blur-md
        "
      >
        <Toolbar
          className="
            relative mx-auto flex min-h-[64px]
            w-full max-w-7xl
            items-center
            border-b border-gray-100
            px-3
            sm:min-h-[70px] sm:px-5
            md:px-6
            lg:px-8
          "
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <button
            type="button"
            onClick={goHome}
            className="
              group flex shrink-0 cursor-pointer
              items-center gap-1
              border-0 bg-transparent p-0
              text-left
            "
          >
            <Typography
              component="span"
              className="
                !text-base
                !font-extrabold
                !tracking-tight
                !text-gray-900
                sm:!text-lg
                lg:!text-xl
              "
            >
              Coco-Closet
            </Typography>

            <img
              src="/icons8-bow-tie-100.png"
              alt="Bow tie"
              className="
                ml-1
                h-8
                w-7
                animate-bounce
                sm:h-7
                sm:w-7
              "
            />
          </button>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <nav
            className="
              absolute left-1/2 hidden
              -translate-x-1/2
              items-center
              gap-5
              md:flex
              lg:gap-8
              xl:gap-10
            "
          >
            {/* HOME */}

            <Link
              component="button"
              underline="none"
              onClick={goHome}
              className="
                group relative cursor-pointer
                border-0 bg-transparent
                whitespace-nowrap
                !text-xs
                !font-medium
                !text-gray-600
                transition-colors duration-300
                hover:!text-gray-950
                sm:!text-[13px]
                lg:!text-sm
              "
            >
              Home

              <span
                className="
                  absolute -bottom-2 left-0
                  h-px w-0
                  rounded-full
                  bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

            {/* DEALS */}

            <Link
              component="button"
              underline="none"
              onClick={() => scrollToSection("deals")}
              className="
                group relative cursor-pointer
                border-0 bg-transparent
                whitespace-nowrap
                !text-xs
                !font-medium
                !text-gray-600
                transition-colors duration-300
                hover:!text-gray-950
                sm:!text-[13px]
                lg:!text-sm
              "
            >
              Deals

              <span
                className="
                  absolute -bottom-2 left-0
                  h-px w-0
                  rounded-full
                  bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

            {/* NEW ARRIVALS */}

            <Link
              component="button"
              underline="none"
              onClick={() => scrollToSection("new-arrivals")}
              className="
                group relative cursor-pointer
                border-0 bg-transparent
                whitespace-nowrap
                !text-xs
                !font-medium
                !text-gray-600
                transition-colors duration-300
                hover:!text-gray-950
                sm:!text-[13px]
                lg:!text-sm
              "
            >
              New Arrivals

              <span
                className="
                  absolute -bottom-2 left-0
                  h-px w-0
                  rounded-full
                  bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

            {/* Description */}

            <Link
              component="button"
              underline="none"
              onClick={() => scrollToSection("description")}
              className="
                group relative cursor-pointer
                border-0 bg-transparent
                whitespace-nowrap
                !text-xs
                !font-medium
                !text-gray-600
                transition-colors duration-300
                hover:!text-gray-950
                sm:!text-[13px]
                lg:!text-sm
              "
            >
              Description

              <span
                className="
                  absolute -bottom-2 left-0
                  h-px w-0
                  rounded-full
                  bg-gray-900
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>

            {/* social */}
              <Link
                component="button"
                underline="none"
                onClick={() => scrollToSection("social")}
                className="
                  group relative cursor-pointer
                  border-0 bg-transparent
                  whitespace-nowrap
                  !text-xs
                  !font-medium
                  !text-gray-600
                  transition-colors duration-300
                  hover:!text-gray-950
                  sm:!text-[13px]
                  lg:!text-sm
                "
              >
                Social

                <span
                  className="
                    absolute -bottom-2 left-0
                    h-px w-0
                    rounded-full
                    bg-gray-900
                    transition-all duration-300
                    group-hover:w-full
                  "
                />
              </Link>

              {/* Newletter */}
              <Link
                component="button"
                underline="none"
                onClick={() => scrollToSection("newsletter")}
                className="
                  group relative cursor-pointer
                  border-0 bg-transparent
                  whitespace-nowrap
                  !text-xs
                  !font-medium
                  !text-gray-600
                  transition-colors duration-300
                  hover:!text-gray-950
                  sm:!text-[13px]
                  lg:!text-sm
                "
              >
                Newsletter

                <span
                  className="
                    absolute -bottom-2 left-0
                    h-px w-0
                    rounded-full
                    bg-gray-900
                    transition-all duration-300
                    group-hover:w-full
                  "
                />
              </Link>
          </nav>

          {/* =================================================
              DESKTOP LOGOUT
          ================================================= */}

          <div className="ml-auto hidden shrink-0 md:block">
            <Button
              onClick={handleLogout}
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
                sm:!text-[12px]
              "
            >
              Sign Out
            </Button>
          </div>

          {/* =================================================
              MOBILE MENU
          ================================================= */}

          <IconButton
            onClick={() => setMenuOpen(true)}
            className="
              !ml-auto
              !shrink-0
              !rounded-full
              !border
              !border-gray-200
              !p-2
              transition-all duration-300
              hover:!border-gray-300
              hover:!bg-gray-50
              md:!hidden
            "
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          className: "!bg-white",
        }}
      >
        <div
          className="
            flex min-h-full
            w-[82vw]
            max-w-[320px]
            flex-col
            p-4
            sm:w-[300px]
            sm:p-5
          "
        >
          {/* HEADER */}

          <div
            className="
              mb-6
              flex items-center justify-between
              border-b border-gray-100
              pb-5
            "
          >
            <button
              type="button"
              onClick={goHome}
              className="
                flex items-center gap-1
                border-0 bg-transparent p-0
              "
            >
              <Typography
                component="span"
                className="
                  !text-lg
                  !font-extrabold
                  !tracking-tight
                  !text-gray-900
                "
              >
                Coco-Closet
              </Typography>

              <img
                src="/icons8-bow-tie-100.png"
                alt="Coco Closet"
                className="h-7 w-7 object-contain animate-bounce"
              />
            </button>

            <IconButton
              onClick={() => setMenuOpen(false)}
              className="
                !rounded-full
                hover:!bg-gray-50
              "
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          {/* MENU */}

          <div className="flex flex-col gap-2">
            {/* HOME */}

            <Link
              component="button"
              underline="none"
              onClick={goHome}
              className="
                group flex w-full items-center gap-3
                rounded-xl
                border border-transparent
                px-4 py-3
                text-left
                !text-sm
                !font-medium
                !text-gray-700
                transition-all duration-300
                hover:!border-gray-100
                hover:!bg-gray-50
                hover:!text-gray-900
              "
            >
              <HomeOutlinedIcon className="!text-[19px] !text-gray-500" />

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Home
              </span>
            </Link>

            {/* DEALS */}

            <Link
              component="button"
              underline="none"
              onClick={() => scrollToSection("deals")}
              className="
                group flex w-full items-center gap-3
                rounded-xl
                border border-transparent
                px-4 py-3
                text-left
                !text-sm
                !font-medium
                !text-gray-700
                transition-all duration-300
                hover:!border-gray-100
                hover:!bg-gray-50
                hover:!text-gray-900
              "
            >
              <LocalOfferOutlinedIcon className="!text-[19px] !text-gray-500" />

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Deals
              </span>
            </Link>

            {/* NEW ARRIVALS */}

            <Link
              component="button"
              underline="none"
              onClick={() => scrollToSection("new-arrivals")}
              className="
                group flex w-full items-center gap-3
                rounded-xl
                border border-transparent
                px-4 py-3
                text-left
                !text-sm
                !font-medium
                !text-gray-700
                transition-all duration-300
                hover:!border-gray-100
                hover:!bg-gray-50
                hover:!text-gray-900
              "
            >
              <FiberNewOutlinedIcon className="!text-[19px] !text-gray-500" />

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                New Arrivals
              </span>
            </Link>

            {/* Description */}

            <Link
              component="button"
              underline="none"
              onClick={() => scrollToSection("description")}
              className="
                group flex w-full items-center gap-3
                rounded-xl
                border border-transparent
                px-4 py-3
                text-left
                !text-sm
                !font-medium
                !text-gray-700
                transition-all duration-300
                hover:!border-gray-100
                hover:!bg-gray-50
                hover:!text-gray-900
              "
            >
              <Inventory2OutlinedIcon className="!text-[19px] !text-gray-500" />

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Description
              </span>
            </Link>

            {/* Social */}
            <Link
              component="button"
              underline="none"
              onClick={() => scrollToSection("social")}
              className="
                group flex w-full items-center gap-3
                rounded-xl
                border border-transparent
                px-4 py-3
                text-left
                !text-sm
                !font-medium
                !text-gray-700
                transition-all duration-300
                hover:!border-gray-100
                hover:!bg-gray-50
                hover:!text-gray-900
              "
            >
              <Inventory2OutlinedIcon className="!text-[19px] !text-gray-500" />

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Social
              </span>
            </Link>

            {/* newsletter */}
            <Link
              component="button"
              underline="none"
              onClick={() => scrollToSection("newsletter")}
              className="
                group flex w-full items-center gap-3
                rounded-xl
                border border-transparent
                px-4 py-3
                text-left
                !text-sm
                !font-medium
                !text-gray-700
                transition-all duration-300
                hover:!border-gray-100
                hover:!bg-gray-50
                hover:!text-gray-900
              "
            >
              <Inventory2OutlinedIcon className="!text-[19px] !text-gray-500" />

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Newletter
              </span>
            </Link>
          </div>

          {/* LOGOUT */}

          <div className="mt-auto border-t border-gray-100 pt-5">
            <Button
              fullWidth
              onClick={handleLogout}
              endIcon={<LogoutOutlinedIcon className="!text-[16px]" />}
              className="
                !h-10
                !rounded-full
                !bg-linear-to-r
                !from-pink-500
                !via-purple-500
                !to-blue-500
                !px-5
                !text-[11px]
                !font-semibold
                !normal-case
                !tracking-wide
                !text-white
                !shadow-md
                transition-all duration-300
                hover:!-translate-y-0.5
                hover:!shadow-lg
              "
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Drawer>

      {/* =====================================================
          HERO
      ===================================================== */}

      <main
        className="
          mx-auto mt-4
          w-full max-w-7xl
          px-3
          sm:mt-5 sm:px-5
          lg:px-8
        "
      >
        <section
          className="
            relative overflow-hidden
            rounded-[22px]
            bg-linear-to-br
            from-pink-50
            via-white
            to-blue-50
            p-3
            shadow-xl
            sm:rounded-[28px]
            sm:p-5
            lg:p-7
          "
        >
          {/* BLUR */}

          <div
            className="
              pointer-events-none
              absolute -left-20 -top-20
              h-44 w-44
              rounded-full
              bg-pink-200/40
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute -bottom-20 -right-20
              h-52 w-52
              rounded-full
              bg-blue-200/40
              blur-3xl
            "
          />

          <div
            className="
              relative grid
              grid-cols-1
              gap-5
              md:grid-cols-3
              md:gap-4
              lg:gap-6
            "
          >
            {/* LEFT */}

            <div className="flex justify-center">
              <div
                className="
                  group relative overflow-hidden
                  rounded-[20px]
                  shadow-xl
                  h-[360px]
                  w-full
                  max-w-[280px]
                  sm:h-[430px]
                  sm:max-w-[300px]
                  md:h-[430px]
                  md:max-w-[230px]
                  lg:h-[520px]
                  lg:max-w-[330px]
                "
              >
                <img
                  src="/istockphoto-1365603421-2048x2048-ezremove.png"
                  alt="Fashion"
                  className="
                    h-full w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </div>

            {/* CENTER */}

            <div
              className="
                flex min-h-[360px]
                flex-col items-center
                justify-between
                text-center
                sm:min-h-[430px]
                lg:min-h-[520px]
              "
            >
              {/* TOP */}

              <div
                className="
                  group relative overflow-hidden
                  rounded-[20px]
                  shadow-xl
                  h-[105px]
                  w-full
                  max-w-[280px]
                  sm:h-[125px]
                  sm:max-w-[300px]
                  md:max-w-[230px]
                  lg:h-[140px]
                  lg:max-w-[330px]
                "
              >
                <img
                  src="/cheerful-girls-shopping-mall_23-2147670007.avif"
                  alt="Shopping"
                  className="
                    h-full w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent" />
              </div>

              {/* CONTENT */}

              <div
                className="
                  flex flex-1
                  flex-col
                  items-center
                  justify-center
                  px-2
                  py-3
                  sm:py-4
                "
              >
                <p
                  className="
                    mb-1
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-pink-500
                    sm:text-[10px]
                  "
                >
                  New Collection
                </p>

                <h2
                  className="
                    m-0
                    text-2xl
                    font-medium
                    leading-none
                    tracking-[0.08em]
                    text-gray-700
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  ULTIMATE
                </h2>

                <h1
                  className="
                    m-0 mt-1
                    text-4xl
                    font-black
                    leading-none
                    tracking-tight
                    text-transparent
                    sm:text-5xl
                    lg:text-6xl
                  "
                  style={{
                    WebkitTextStroke: "1.5px #111827",
                  }}
                >
                  SALE
                </h1>

                <p
                  className="
                    mt-2
                    max-w-[220px]
                    text-[10px]
                    leading-relaxed
                    text-gray-500
                    sm:max-w-[240px]
                    sm:text-[11px]
                  "
                >
                  Discover timeless pieces designed to elevate your
                  style.
                </p>

                <Button
                   onClick={() => {
    setMenuOpen(false);
    navigate("/shoppage");
  }}
                  className="
                    group
                    !mt-3
                    !h-9
                    !w-32
                    !rounded-full
                    !bg-linear-to-r
                    !from-pink-500
                    !via-purple-500
                    !to-blue-500
                    !px-4
                    !text-[10px]
                    !font-bold
                    !normal-case
                    !tracking-[0.1em]
                    !text-white
                    !shadow-md
                    transition-all
                    duration-300
                    hover:!-translate-y-0.5
                    hover:!shadow-xl
                    sm:!h-10
                    sm:!w-36
                  "
                >
                  <span className="flex items-center gap-2">
                    SHOP NOW

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Button>
              </div>

              {/* BOTTOM */}

              <div
                className="
                  group relative mt-2 
                  overflow-hidden
                  rounded-[20px]
                  shadow-xl
                  h-[105px]
                  w-full
                  max-w-[280px]
                  sm:h-[125px]
                  sm:max-w-[300px]
                  md:max-w-[230px]
                  lg:h-[120px]
                  lg:max-w-[330px]
                "
              >
                <img
                  src="/images (1).jpg"
                  alt="Collection"
                  className="
                    h-full w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                    
                  "
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent" />
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex justify-center">
              <div
                className="
                  group relative overflow-hidden
                  rounded-[20px]
                  shadow-xl
                  h-[360px]
                  w-full
                  max-w-[280px]
                  sm:h-[430px]
                  sm:max-w-[300px]
                  md:h-[430px]
                  md:max-w-[230px]
                  lg:h-[520px]
                  lg:max-w-[330px]
                "
              >
                <img
                  src="/teenage-girl-looks-left-side-sitting-white-modern-chair-one-leg-raise-up-beautiful-yellow-sweater-blue-je-jeans-179907312.webp"
                  alt="Fashion Model"
                  className="
                    h-full w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          BRAND MARQUEE
      ===================================================== */}

      <section className="mt-5 w-full overflow-hidden sm:mt-6">
        <div className="flex w-max animate-marquee items-center">
          <div className="flex shrink-0 items-center gap-8 px-5 sm:gap-12 sm:px-8 lg:gap-20 lg:px-12">
            <img
              src="/images (1).png"
              alt="Louis Vuitton"
              className="h-10 w-24 object-contain mix-blend-multiply sm:h-14 sm:w-32 lg:h-16 lg:w-40"
            />

            <img
              src="/Prada-Logo.jpg"
              alt="Prada"
              className="h-10 w-20 object-contain mix-blend-multiply sm:h-14 sm:w-28 lg:h-16 lg:w-36"
            />

            <img
              src="/images (2).png"
              alt="Dior"
              className="h-9 w-20 object-contain mix-blend-multiply sm:h-14 sm:w-28 lg:h-16 lg:w-32"
            />

            <img
              src="/Symbol-Gucci.png"
              alt="Gucci"
              className="h-10 w-24 object-contain mix-blend-multiply sm:h-14 sm:w-32 lg:h-16 lg:w-40"
            />
          </div>

          <div className="flex shrink-0 items-center gap-8 px-5 sm:gap-12 sm:px-8 lg:gap-20 lg:px-12">
            <img
              src="/images (1).png"
              alt="Louis Vuitton"
              className="h-10 w-24 object-contain mix-blend-multiply sm:h-14 sm:w-32 lg:h-16 lg:w-40"
            />

            <img
              src="/Prada-Logo.jpg"
              alt="Prada"
              className="h-10 w-20 object-contain mix-blend-multiply sm:h-14 sm:w-28 lg:h-16 lg:w-36"
            />

            <img
              src="/images (2).png"
              alt="Dior"
              className="h-9 w-20 object-contain mix-blend-multiply sm:h-14 sm:w-28 lg:h-16 lg:w-32"
            />

            <img
              src="/Symbol-Gucci.png"
              alt="Gucci"
              className="h-10 w-24 object-contain mix-blend-multiply sm:h-14 sm:w-32 lg:h-16 lg:w-40"
            />
          </div>
        </div>
      </section>
    </>
  );
}