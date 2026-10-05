
import { Button } from "@mui/material";
import React from "react";

function Deals() {
  return (
    <section className="w-full px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-12 lg:py-12 bg-gray-100 shadow-lg">
      
      {/* MAIN CONTAINER */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">

        {/* ================= FIRST COLUMN ================= */}
        <div className="w-full">
          
          <h2 className="text-center text-3xl font-bold text-gray-800 sm:text-4xl md:text-left lg:text-5xl">
            Deals Of The Month
          </h2>

          <p className="mt-3 max-w-lg text-center text-sm leading-7 text-gray-600 sm:text-base md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br className="hidden sm:block" />
            Scelerisque duis ultrices sollicitudin aliquam sem. <br className="hidden sm:block" />
            Scelerisque duis ultrices sollicitudin.
          </p>

          {/* BUTTON */}
      <div className="mt-4 flex justify-center md:justify-start">
  <Button
    className="w-36 rounded-lg bg-black px-5 py-2.5 text-sm font-sans font-semibold text-white shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-xl active:scale-95 sm:w-40 sm:text-md"
  >
    Buy Now
  </Button>
</div>
          {/* ================= COUNTDOWN ================= */}
          <div className="mt-7 w-full max-w-md">
            <div className="grid grid-cols-3 gap-3 sm:gap-5">

              {/* DAYS */}
              <div className="flex flex-col items-center justify-center rounded-lg bg-white p-3 shadow-md sm:p-4">
                <span className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  02
                </span>

                <span className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Days
                </span>
              </div>

              {/* HOURS */}
              <div className="flex flex-col items-center justify-center rounded-lg bg-white p-3 shadow-md sm:p-4">
                <span className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  06
                </span>

                <span className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Hours
                </span>
              </div>

              {/* MINUTES */}
              <div className="flex flex-col items-center justify-center rounded-lg bg-white p-3 shadow-md sm:p-4">
                <span className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  05
                </span>

                <span className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Minutes
                </span>
              </div>

            </div>
          </div>
        </div>


        {/* ================= SECOND COLUMN ================= */}
        <div className="w-full">
          
          <div className="grid w-full grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4">

            {/* IMAGE 1 */}
            <div className="h-72 w-full max-w-xs overflow-hidden bg-gray-100 shadow-lg sm:h-80 md:h-72">
              <img
                src="beautiful-amazing-brunette-woman-with-long-wavy-hairstyle-spring-fall-stylish-urban-outfit-walking-street-red-lips-slim-body-street-fashion-concept.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            {/* IMAGE 2 */}
            <div className="h-72 w-full max-w-xs overflow-hidden bg-gray-100 shadow-lg sm:h-80 md:h-72">
              <img
                src="young-woman-with-shopping-bags-beautiful-dress_1303-17550.avif"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            {/* IMAGE 3 */}
            <div className="h-72 w-full max-w-xs overflow-hidden bg-gray-100 shadow-lg sm:col-span-2 md:col-span-1">
              <img
                src="studio-close-up-portrait-young-fresh-blonde-woman-brown-straw-poncho-wool-black-trendy-hat-round-glasses-looking-camera-green-leather-had-bag_273443-1121.avif"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Deals;

