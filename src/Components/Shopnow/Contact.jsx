import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FavoriteOutlined,
  Star,
  SendOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

function Contact() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!rating || !feedback.trim()) {
      alert("Please select a rating and enter your feedback.");
      return;
    }

    const feedbackData = {
      rating: rating,
      feedback: feedback.trim(),
      submittedAt: new Date().toISOString(),
    };

    console.log("Feedback Data:", feedbackData);

    alert("Thank you for your feedback!");

    setRating(0);
    setFeedback("");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white">

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

        {/* =================================================
            LEFT - THANK YOU
        ================================================= */}

        <div className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-white px-6 py-10 lg:min-h-screen lg:px-16">

          {/* Decorative */}

          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-pink-300/30 blur-3xl" />

          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />

          <div className="relative max-w-lg">

            {/* Icon */}

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">

              <FavoriteOutlined
                sx={{ fontSize: 32 }}
                className="!text-pink-500"
              />

            </div>

            {/* Small Heading */}

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.35em] text-pink-500">
              Coco-Closet
            </p>

            {/* Main Heading */}

            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl">

              Thank You

              <span className="block text-pink-500">
                for your order!
              </span>

            </h1>

            {/* Description */}

            <p className="mt-5 max-w-md text-sm leading-6 text-gray-500">

              Your order has been successfully placed.
              We truly appreciate your support and hope
              you enjoy your new favorite style.

            </p>

            {/* Welcome */}

            <div className="mt-7 max-w-md rounded-2xl border border-white bg-white/70 p-4 backdrop-blur-sm">

              <p className="text-xs font-semibold text-gray-800">
                Welcome to the Coco-Closet family ♡
              </p>

              <p className="mt-1 text-[11px] leading-5 text-gray-500">
                Keep exploring our latest collections and
                discover something beautiful for your next look.
              </p>

            </div>

            {/* Button */}

            <Link
              to="/home"
              className="mt-7 inline-block no-underline"
            >

              <button
                type="button"
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  bg-gray-900
                  px-6
                  text-xs
                  font-semibold
                  text-white
                  shadow-lg
                  transition
                  hover:-translate-y-0.5
                  hover:bg-purple-700
                "
              >

                <ShoppingBagOutlined sx={{ fontSize: 17 }} />

                Continue Shopping

              </button>

            </Link>

          </div>

        </div>

        {/* =================================================
            RIGHT - FEEDBACK
        ================================================= */}

        <div className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 px-6 py-10 lg:min-h-screen lg:px-16">

          {/* Decorative circles */}

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10" />

          <div className="relative w-full max-w-md">

            {/* Heading */}

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
              We'd Love Your Feedback
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
              How was your experience?
            </h2>

            <p className="mt-3 text-xs leading-5 text-white/75">
              Your feedback helps us improve Coco-Closet
              and create a better shopping experience for you.
            </p>

            {/* Feedback Card */}

            <div className="mt-7 rounded-3xl bg-white p-5 shadow-2xl sm:p-6">

              {/* Rating */}

              <p className="text-center text-xs font-semibold text-gray-800">
                Rate your experience
              </p>

              <div className="mt-4 flex justify-center gap-2">

                {[1, 2, 3, 4, 5].map((star) => (

                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="
                      border-0
                      bg-transparent
                      p-1
                      transition
                      hover:scale-110
                    "
                  >

                    <Star
                      sx={{ fontSize: 29 }}
                      className={
                        star <= rating
                          ? "!text-amber-400"
                          : "!text-gray-300"
                      }
                    />

                  </button>

                ))}

              </div>

              {/* Selected Rating */}

              {rating > 0 && (
                <p className="mt-2 text-center text-[10px] text-gray-400">
                  You selected {rating} out of 5
                </p>
              )}

              {/* Textarea */}

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={4}
                className="
                  mt-5
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-3
                  text-xs
                  text-gray-700
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-fuchsia-400
                  focus:bg-white
                  focus:ring-2
                  focus:ring-fuchsia-100
                "
              />

              {/* Submit */}

              <button
                type="button"
                onClick={handleSubmit}
                className="
                  mt-4
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-500
                  to-pink-500
                  text-xs
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-pink-100
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-xl
                "
              >

                <SendOutlined sx={{ fontSize: 16 }} />

                Submit Feedback

              </button>

            </div>

            {/* Small text */}

            <p className="mt-5 text-center text-[10px] text-white/60">
              Thank you for helping us grow ♡
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;