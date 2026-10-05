import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

function NewArrivals() {
  return (
    <>
      <div className='mt-3 bg-gray-50 shadow-2xl'>
        <div className=' pt-4 text-3xl text-gray-700 text-center font-semibold '>
          <h2>New Arrivals</h2>
        </div>
        <div>
          <p className="mt-3 text-gray-600 text-center ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Scelerisque duis <br /> ultrices sollicitudin aliquam sem.
            Scelerisque duis ultrices sollicitudin.
          </p>
        </div>

        {/* First-grid */}

     
<div className="mt-4 grid grid-cols-1 gap-2 px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-8 lg:px-20">

  {/* first */}
  <div className="flex justify-center">
    <Button
      className="mt-2 w-full max-w-xs rounded-sm bg-gray-300 px-3 py-2.5 text-xs text-gray-500 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:text-gray-800 hover:shadow-2xl sm:text-sm"
    >
      Men's Fashion
    </Button>
  </div>

  {/* second */}
  <div className="flex justify-center">
    <Button
      className="mt-2 w-full max-w-xs rounded-sm bg-black px-2 py-3 text-xs text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-purple-700 hover:text-white hover:shadow-2xl sm:text-sm"
    >
      Women's Fashion
    </Button>
  </div>

  {/* third */}
  <div className="flex justify-center">
    <Button
      className="mt-2 w-full max-w-xs rounded-sm bg-gray-300 px-2 py-3 text-xs text-gray-500 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:text-gray-800 hover:shadow-2xl sm:text-sm"
    >
      Women's accessories
    </Button>
  </div>

  {/* fourth */}
  <div className="flex justify-center">
    <Button
      className="mt-2 w-full max-w-xs rounded-sm bg-gray-300 px-2 py-3 text-xs text-gray-500 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:text-gray-800 hover:shadow-2xl sm:text-sm"
    >
      Men's accessories
    </Button>
  </div>

  {/* fifth */}
  <div className="flex justify-center">
    <Button
      className="mt-2 w-full max-w-xs rounded-sm bg-gray-300 px-2 py-3 text-xs text-gray-500 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:text-gray-800 hover:shadow-2xl sm:text-sm"
    >
      Discount Deals
    </Button>
  </div>

</div>



        {/* second-col */}
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

    {/* CARD 1 */}
    <Card className="w-full overflow-hidden rounded-xl pt-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardMedia
        className="mx-2 h-56 rounded-lg sm:h-60"
        image="WhatsApp Image 2026-08-11 at 5.03.12 PM.jpeg"
        title="Shiny Dress"
      />

      <CardContent>
        <Typography component="div">

          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold sm:text-lg">
              Shiny Dress
            </h3>

            <span className="shrink-0 text-xs tracking-wide text-yellow-500 sm:text-sm">
              ★★★★★
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-700">
            Al Karam
          </p>

          <p className="mt-6 text-sm text-gray-500">
            (4.1k) Customer Reviews
          </p>

          <div className="mt-5 flex items-center justify-between gap-2">
            <p className="text-xl font-medium sm:text-2xl">
              $95.50
            </p>

            <p className="text-right text-xs text-red-600 sm:text-sm">
              Almost sold out
            </p>
          </div>

        </Typography>
      </CardContent>
    </Card>


    {/* CARD 2 */}
    <Card className="w-full overflow-hidden rounded-xl pt-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardMedia
        className="mx-2 h-56 rounded-lg sm:h-60"
        image="WhatsApp Image 2026-08-11 at 5.02.07 PM.jpeg"
        title="Beach Dress"
      />

      <CardContent>
        <Typography component="div">

          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold sm:text-lg">
              Beach Dress
            </h3>

            <span className="shrink-0 text-xs tracking-wide text-yellow-500 sm:text-sm">
              ★★★★★
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-700">
            Al Karam
          </p>

          <p className="mt-6 text-sm text-gray-500">
            (4.1k) Customer Reviews
          </p>

          <div className="mt-5 flex items-center justify-between gap-2">
            <p className="text-xl font-medium sm:text-2xl">
              $95.50
            </p>

            <p className="text-right text-xs text-red-600 sm:text-sm">
              Almost sold out
            </p>
          </div>

        </Typography>
      </CardContent>
    </Card>


    {/* CARD 3 */}
    <Card className="w-full overflow-hidden rounded-xl pt-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardMedia
        className="mx-2 h-56 rounded-lg sm:h-60"
        image="IMG-20260811-WA0003.jpg"
        title="Full Sweater"
      />

      <CardContent>
        <Typography component="div">

          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold sm:text-lg">
              Full Sweater
            </h3>

            <span className="shrink-0 text-xs tracking-wide text-yellow-500 sm:text-sm">
              ★★★★★
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-700">
            Al Karam
          </p>

          <p className="mt-6 text-sm text-gray-500">
            (4.1k) Customer Reviews
          </p>

          <div className="mt-5 flex items-center justify-between gap-2">
            <p className="text-xl font-medium sm:text-2xl">
              $95.50
            </p>

            <p className="text-right text-xs text-red-600 sm:text-sm">
              Almost sold out
            </p>
          </div>

        </Typography>
      </CardContent>
    </Card>


    {/* CARD 4 */}
    <Card className="w-full overflow-hidden rounded-xl pt-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardMedia
        className="mx-2 h-56 rounded-lg sm:h-60"
        image="IMG-20260811-WA0006.jpg"
        title="White Dress"
      />

      <CardContent>
        <Typography component="div">

          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold sm:text-lg">
              White Dress
            </h3>

            <span className="shrink-0 text-xs tracking-wide text-yellow-500 sm:text-sm">
              ★★★★★
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-700">
            Al Karam
          </p>

          <p className="mt-6 text-sm text-gray-500">
            (4.1k) Customer Reviews
          </p>

          <div className="mt-5 flex items-center justify-between gap-2">
            <p className="text-xl font-medium sm:text-2xl">
              $95.50
            </p>

            <p className="text-right text-xs text-red-600 sm:text-sm">
              Almost sold out
            </p>
          </div>

        </Typography>
      </CardContent>
    </Card>


    {/* CARD 5 */}
    <Card className="w-full overflow-hidden rounded-xl pt-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardMedia
        className="mx-2 h-56 rounded-lg sm:h-60"
        image="IMG-20260811-WA0007.jpg"
        title="Long Dress"
      />

      <CardContent>
        <Typography component="div">

          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold sm:text-lg">
              Long Dress
            </h3>

            <span className="shrink-0 text-xs tracking-wide text-yellow-500 sm:text-sm">
              ★★★★★
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-700">
            Al Karam
          </p>

          <p className="mt-6 text-sm text-gray-500">
            (4.1k) Customer Reviews
          </p>

          <div className="mt-5 flex items-center justify-between gap-2">
            <p className="text-xl font-medium sm:text-2xl">
              $95.50
            </p>

            <p className="text-right text-xs text-red-600 sm:text-sm">
              Almost sold out
            </p>
          </div>

        </Typography>
      </CardContent>
    </Card>


    {/* CARD 6 */}
    <Card className="w-full overflow-hidden rounded-xl pt-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardMedia
        className="mx-2 h-56 rounded-lg sm:h-60"
        image="HD-wallpaper-pretty-girl-face-wind-city-ultra-girls-girl-style-beautiful-portrait-woman-design-human-background-young-wind-face-female-urban-beauty-model-fashion-look-pretty-vogue-person-red.jpg"
        title="Crop Dress"
      />

      <CardContent>
        <Typography component="div">

          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold sm:text-lg">
              Crop Dress
            </h3>

            <span className="shrink-0 text-xs tracking-wide text-yellow-500 sm:text-sm">
              ★★★★★
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-700">
            Al Karam
          </p>

          <p className="mt-6 text-sm text-gray-500">
            (4.1k) Customer Reviews
          </p>

          <div className="mt-5 flex items-center justify-between gap-2">
            <p className="text-xl font-medium sm:text-2xl">
              $95.50
            </p>

            <p className="text-right text-xs text-red-600 sm:text-sm">
              Almost sold out
            </p>
          </div>

        </Typography>
      </CardContent>
    </Card>

  </div>
</div>
           <div className='flex justify-center'>
            <Button
              className="w-50 mt-0 mb-5 rounded-sm text-white bg-black  px-2 py-3 text-xs shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-purple-700 hover:text-white hover:shadow-2xl sm:text-md"
            >
                View More
            </Button>
        </div>
      </div>
     
    </>
  )
}

export default NewArrivals