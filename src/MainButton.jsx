import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function MainButton() {
  const navigate = useNavigate();

const API_URL = "https://coco-closet.onrender.com";

  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      if (!data.token) {
        setError("Token not received from server");
        return;
      }

      // Save login
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Login successful!");

      // IMPORTANT
      // Directly go to home
      navigate("/home", { replace: true });

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        "Cannot connect to backend. Make sure server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SIGNUP
  // =========================

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Name, email and password are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      if (!data.token) {
        setError("Token not received from server");
        return;
      }

      // Save signup login
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Account created successfully!");

      // IMPORTANT
      // Directly go to home
      navigate("/home", { replace: true });

    } catch (err) {
      console.error("SIGNUP ERROR:", err);

      setError(
        "Cannot connect to backend. Make sure server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SWITCH
  // =========================

  const switchMode = () => {
    setIsSignup((prev) => !prev);

    setName("");
    setEmail("");
    setPassword("");

    setError("");
    setSuccess("");
  };

  // =========================
  // ENTER
  // =========================

  const handlePasswordKeyDown = (event) => {
    if (event.key === "Enter") {
      if (isSignup) {
        handleSignup();
      } else {
        handleLogin();
      }
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div
      className="
        flex min-h-screen w-full
        items-center justify-center
        bg-gradient-to-br
        from-pink-100
        via-purple-100
        to-blue-100
        px-3 py-4
        sm:px-5
        md:px-6
        lg:px-8
      "
    >
      <div
        className="
          grid w-full max-w-5xl
          grid-cols-1
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
          sm:rounded-3xl
          lg:grid-cols-2
        "
      >
        {/* ================= LEFT ================= */}

        <div
          className="
            relative flex min-h-[330px]
            flex-col justify-between
            overflow-hidden
            bg-gradient-to-br
            from-pink-500
            via-purple-500
            to-blue-500
            px-6 py-7
            text-white
            sm:min-h-[380px]
            sm:px-8 sm:py-9
            md:min-h-[420px]
            md:px-10
            lg:min-h-[680px]
            lg:px-12 lg:py-12
          "
        >
          <div
            className="
              absolute -right-10 -top-10
              h-28 w-28
              rounded-full
              bg-white/10
              sm:h-36 sm:w-36
              lg:h-44 lg:w-44
            "
          />

          <div
            className="
              absolute -bottom-12 -left-12
              h-36 w-36
              rounded-full
              bg-white/10
              sm:h-44 sm:w-44
              lg:h-52 lg:w-52
            "
          />

          <div
            className="
              relative z-10
              flex items-center gap-2
            "
          >
            <span className="text-xl sm:text-2xl">
              🎀
            </span>

            <span
              className="
                text-[9px]
                font-bold
                tracking-[0.18em]
                sm:text-xs
              "
            >
              COCO-CLOSET
            </span>
          </div>

          <div
            className="
              relative z-10
              mt-12
              max-w-sm
              sm:mt-16
              lg:mt-0
            "
          >
            <p
              className="
                mb-2
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-white/70
                sm:text-[9px]
              "
            >
              Your Style. Your Story.
            </p>

            <h1
              className="
                text-3xl
                font-bold
                leading-[1.05]
                sm:text-4xl
                md:text-5xl
              "
            >
              Dress
              <br />

              <span className="text-white/75">
                Beautifully.
              </span>
            </h1>

            <p
              className="
                mt-3
                max-w-xs
                text-[10px]
                leading-5
                text-white/75
                sm:text-xs
              "
            >
              Discover fashion that feels like you.
            </p>
          </div>

          <p
            className="
              relative z-10
              mt-8
              text-[8px]
              text-white/60
              sm:text-[9px]
            "
          >
            Curated fashion for every moment ✨
          </p>
        </div>

        {/* ================= RIGHT ================= */}

        <div
          className="
            flex
            min-h-[520px]
            items-center
            justify-center
            bg-white
            px-5 py-9
            sm:min-h-[560px]
            sm:px-8
            md:px-12
            lg:min-h-[680px]
            lg:px-14
          "
        >
          <div className="w-full max-w-[360px]">

            {/* HEADER */}

            <div className="mb-6">
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-purple-500
                "
              >
                {isSignup ? "Join Us" : "Welcome"}
              </p>

              <h2
                className="
                  mt-2
                  text-xl
                  font-bold
                  text-gray-900
                  sm:text-2xl
                "
              >
                {isSignup
                  ? "Create your account."
                  : "Find your style."}
              </h2>

              <p
                className="
                  mt-2
                  text-[10px]
                  leading-5
                  text-gray-400
                  sm:text-[11px]
                "
              >
                {isSignup
                  ? "Create an account and start exploring."
                  : "Sign in to explore your closet."}
              </p>
            </div>

            {/* FORM */}

            <div className="space-y-4">

              {/* NAME */}

              {isSignup && (
                <TextField
                  fullWidth
                  size="small"
                  label="Full Name"
                  value={name}
                  disabled={loading}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              {/* EMAIL */}

              <TextField
                fullWidth
                size="small"
                label="Email"
                type="email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* PASSWORD */}

              <TextField
                fullWidth
                size="small"
                label="Password"
                type="password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
              />

              {/* ERROR */}

              {error && (
                <div
                  className="
                    rounded-lg
                    border
                    border-red-100
                    bg-red-50
                    px-3 py-2
                    text-center
                    text-[10px]
                    font-medium
                    text-red-500
                  "
                >
                  {error}
                </div>
              )}

              {/* SUCCESS */}

              {success && (
                <div
                  className="
                    rounded-lg
                    border
                    border-green-100
                    bg-green-50
                    px-3 py-2
                    text-center
                    text-[10px]
                    font-medium
                    text-green-600
                  "
                >
                  {success}
                </div>
              )}

              {/* LOGIN BUTTON */}

              <Button
                onClick={
                  isSignup
                    ? handleSignup
                    : handleLogin
                }
                disabled={loading}
                fullWidth
                className="
                  !h-11
                  !rounded-xl
                  !bg-gradient-to-r
                  !from-pink-500
                  !via-purple-500
                  !to-blue-500
                  !font-bold
                  !tracking-[0.15em]
                  !text-white
                  !shadow-md
                  hover:!shadow-lg
                  disabled:!opacity-60
                "
              >
                {loading
                  ? "PLEASE WAIT..."
                  : isSignup
                  ? "CREATE ACCOUNT"
                  : "SIGN IN"}
              </Button>

              {/* SWITCH */}

              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-[9px] text-gray-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <Button
                onClick={switchMode}
                disabled={loading}
                fullWidth
                variant="outlined"
                className="
                  !h-11
                  !rounded-xl
                  !border-gray-200
                  !text-[10px]
                  !font-bold
                  !tracking-[0.15em]
                  !text-gray-700
                  hover:!border-purple-400
                  hover:!bg-purple-50
                "
              >
                {isSignup
                  ? "BACK TO SIGN IN"
                  : "CREATE ACCOUNT"}
              </Button>
            </div>

            <p
              className="
                mt-6
                text-center
                text-[9px]
                text-gray-400
              "
            >
              Simple fashion. Effortless style. 💕
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MainButton;