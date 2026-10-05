import { Button, Card } from '@mui/material'
import React from 'react'

function Newletter() {
    return (
        <div>
            {/* Newsletter Section */}
            <div className="mt-20 grid grid-cols-1 items-center gap-2 bg-gray-50 px-4 py-6 shadow-xl md:grid-cols-3 md:px-0 lg:px-0">

                {/* Left Image */}
                <div className="flex justify-center">
                    <img
                        src="man-woman-are-posing-photo_1030707-656.jpg"
                        alt=""
                        className="h-52 w-40 object-cover sm:h-60 sm:w-44 md:h-72 md:w-52 lg:h-80 lg:w-60"
                    />
                </div>

                {/* Newsletter Card */}
               <div>
 <Card className="mt-8 w-full max-w-4xl px-4 py-2 shadow-xl bg-white sm:mt-10 md:mt-12 lg:mt-15">
    <div>
      <h2 className="pt-8 text-center text-xl font-semibold font-serif sm:text-2xl lg:ml-2 lg:pt-10 lg:text-left">
        Subscribe To Our Newsletter
      </h2>

      <span>
        <p className="mt-3 text-center text-xs text-gray-500 sm:px-0 lg:ml-4 lg:px-0 lg:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Scelerisque duis <br className="hidden sm:block" />
          ultrices sollicitudin aliquam sem.
          Scelerisque duis ultrices sollicitudin.
        </p>
      </span>

      <span>
        <p className="pb-6 pt-8 text-center text-gray-400 lg:ml-4 lg:pt-13 lg:text-left">
          vaishnavik1286@gmail.com
        </p>
      </span>
    </div>
  </Card>

  <div className="mt-5 flex justify-center">
    <Button
      className="w-48 rounded-sm bg-black px-2 py-3 text-xs text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-purple-700 hover:text-white sm:text-sm"
    >
      Subscribe Now
    </Button>
  </div>
</div>

                {/* Right Image */}
                <div className="flex justify-center">
                    <img
                        src="looking-perfect-together-attractive-welldressed-couple-posing-studio-isolated-grey_386167-2391.jpg"
                        alt=""
                        className="h-52 w-40 object-cover mt-4 lg:mt-0 sm:h-60 sm:w-44 md:h-72 md:w-52 lg:h-80 lg:w-60"
                    />
                </div>

            </div>

            {/* Footer */}
            <div className="mt-8 grid grid-cols-1 gap-6 px-6 md:grid-cols-2 md:px-10 lg:px-16">

                <div className="text-center md:text-left">
                    <h2 className="font-serif text-xl font-semibold text-gray-600">
                        Coco-Closet
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-600 md:justify-end">
                    <h2 className="cursor-pointer hover:text-black">Support Center</h2>
                    <h2 className="cursor-pointer hover:text-black">Invocing</h2>
                    <h2 className="cursor-pointer hover:text-black">Contract</h2>
                    <h2 className="cursor-pointer hover:text-black">Careers</h2>
                    <h2 className="cursor-pointer hover:text-black">Blog</h2>
                    <h2 className="cursor-pointer hover:text-black">FAQs</h2>
                </div>

            </div>

            <div className="mt-8 border-t border-gray-200 py-6 text-center text-sm text-gray-600">
               Copyright © 2026 Coco-Closet. All Rights Reserved.
            </div>

        </div>

    )
}

export default Newletter