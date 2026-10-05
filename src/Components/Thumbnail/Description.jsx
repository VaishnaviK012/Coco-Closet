import { Button } from '@mui/material'
import React from 'react'
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
function Description() {
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 shadow-2xl'>
        <div>
          <img src="7dfd02ed-c264-42f4-b839-9127a13902cb.png" alt="" className='h-full' />
        </div>
        <div className="bg-gray-300 px-6 py-8 sm:px-10">
          <div className="flex flex-col gap-5 px-4 sm:px-10 py-6">

            <p className="text-sm uppercase tracking-wide">Women Collection</p>

            <h2 className="text-3xl font-bold">Peaky Blinders</h2>

            <h5 className="text-lg font-semibold underline">Description</h5>

            <p className="leading-7 text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              Scelerisque duis ultrices sollicitudin aliquam sem.
              <br />
              Scelerisque duis ultrices sollicitudin.
            </p>

            <div className="flex items-center gap-3">
              <p className="font-medium">Size:</p>
              <span className="rounded border bg-black text-white border-black px-3 py-1">M</span>
            </div>

            <p className="text-2xl font-bold">$100.00</p>

            <Button
              className="w-40 rounded-sm justify-items-center bg-black px-2 py-3 text-xs text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-purple-700 hover:text-white sm:text-md"
            >
              View More
            </Button>

          </div>
        </div>
      </div>

      {/* second-col */}


<div className="grid w-full grid-cols-1 place-items-center gap-6 bg-gray-100 px-4 py-8 sm:grid-cols-2 md:px-8 lg:grid-cols-4 lg:gap-6 lg:px-10 lg:py-10">

  {/* High Quality */}
  <div className="flex w-full max-w-65 items-center gap-4">
    <img
      src="https://img.icons8.com/ios/100/prize.png"
      alt="High Quality"
      className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
    />
    <div className="min-w-0">
      <h2 className="whitespace-nowrap text-base font-semibold sm:text-lg">
        High Quality
      </h2>
      <p className="whitespace-nowrap text-xs text-gray-600 sm:text-sm">
        Crafted from top materials
      </p>
    </div>
  </div>

  {/* Warranty */}
  <div className="flex w-full max-w-65 items-center gap-4">
    <img
      src="https://img.icons8.com/ios/100/security-checked.png"
      alt="Warranty"
      className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
    />
    <div className="min-w-0">
      <h2 className="whitespace-nowrap text-base font-semibold sm:text-lg">
        Warranty Protection
      </h2>
      <p className="whitespace-nowrap text-xs text-gray-600 sm:text-sm">
        Over 2 years
      </p>
    </div>
  </div>

  {/* Shipping */}
  <div className="flex w-full max-w-65 items-center gap-4">
    <img
      src="https://img.icons8.com/ios/100/delivery.png"
      alt="Free Shipping"
      className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
    />
    <div className="min-w-0">
      <h2 className="whitespace-nowrap text-base font-semibold sm:text-lg">
        Free Shipping
      </h2>
      <p className="whitespace-nowrap text-xs text-gray-600 sm:text-sm">
        Order over $150
      </p>
    </div>
  </div>

  {/* Support */}
  <div className="flex w-full max-w-65 items-center gap-4">
    <img
      src="https://img.icons8.com/ios/100/headset.png"
      alt="Support"
      className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
    />
    <div className="min-w-0">
      <h2 className="whitespace-nowrap text-base font-semibold sm:text-lg">
        24 / 7 Support
      </h2>
      <p className="whitespace-nowrap text-xs text-gray-600 sm:text-sm">
        Dedicated support
      </p>
    </div>
  </div>

</div>






    </div>
  )
}

export default Description