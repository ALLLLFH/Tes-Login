// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginBgImage from "./assets/login-bg.webp";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // State untuk dark mode (mobile-first)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      !localStorage.getItem("theme"))
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((p) => !p);

  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { username, password });
      setUser(response.data.user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Logout failed");
    }
  };

  //VIEWS
  if (!user) {
    return (
      <div className="relative min-h-screen flex flex-col md:flex-row 
                bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 
                dark:from-indigo-950 dark:via-gray-900 dark:to-blue-950">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          aria-pressed={isDarkMode}
          aria-label="Toggle dark mode"
          className="absolute top-4 right-4 z-40 px-3 py-2 rounded-full 
                   bg-white/40 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20
                   text-gray-800 dark:text-gray-200 shadow-sm hover:scale-105 transform transition"
        >
          {isDarkMode ? "🌞 Light" : "🌙 Dark"}
        </button>

        {/* Left: hero image (hidden on mobile) */}
        <div
          className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${LoginBgImage})` }}
          role="img"
          aria-label="Decorative background"
        >
          <div className="bg-black/30 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-8 m-6 max-w-sm">
            <h3 className="text-white text-2xl font-semibold mb-2">Welcome</h3>
            <p className="text-white/90 text-sm">
              Securely login to access your dashboard — Mwehehehe !!!
            </p>
          </div>
        </div>

        {/* Right: login form */}
        <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen p-6 md:p-12">
          <div className="w-full max-w-md">
            <div
              className="relative z-10 p-8 rounded-2xl shadow-2xl border border-white/20
             bg-white/30 dark:bg-gray-800/40
             backdrop-blur-lg backdrop-saturate-150
             transition-all duration-500"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                Login to Your Account
              </h2>

              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-2 rounded-md border border-indigo-300/40 dark:border-indigo-700/40
                             bg-white/50 dark:bg-indigo-950/40 backdrop-blur-sm text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-2 rounded-md border border-indigo-300/40 dark:border-indigo-700/40
                             bg-white/50 dark:bg-indigo-950/40 backdrop-blur-sm text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>

                {error && (
                  <p className="text-sm text-center text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 font-medium text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300
    ${isLoading
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700"
                      }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-5 h-5 mr-2 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Logging in...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>

                {/* <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Register here
                  </a>
                </p> */}
              </form>
            </div>

            {/* mobile footer */}
            <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              <p>By logging in you agree to our terms and privacy policy.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden 
                  bg-gradient-to-br from-indigo-100 via-white to-blue-100 
                  dark:from-indigo-950 dark:via-gray-900 dark:to-blue-950 
                  text-gray-900 dark:text-gray-100 transition-all duration-700">

      {/* Floating bubbles background */}
      <div className="absolute top-16 left-12 w-72 h-72 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-20 right-16 w-64 h-64 bg-purple-400/30 dark:bg-purple-700/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 px-3 py-2 rounded-full 
                 bg-white/40 dark:bg-gray-800/50 
                 backdrop-blur-md border border-white/20 
                 text-gray-800 dark:text-gray-200 shadow-md 
                 hover:bg-white/60 dark:hover:bg-gray-700/60 
                 transition-all duration-300"
      >
        {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* 🩵 Welcome Card */}
      <div className="relative z-10 p-10 text-center rounded-2xl shadow-2xl border border-white/30 
                    bg-gradient-to-br from-white/30 via-indigo-100/20 to-purple-100/30 
                    dark:from-gray-800/40 dark:via-indigo-900/30 dark:to-gray-800/40 
                    backdrop-blur-2xl transition-all duration-500 max-w-md w-[90%]">
        <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-sm">
          Welcome, {user.username}!
        </h1>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          You have successfully logged in.
        </p>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 mt-8 font-medium text-white 
                   bg-gradient-to-r from-red-500 via-pink-500 to-red-600 
                   hover:from-red-600 hover:via-pink-600 hover:to-red-700 
                   rounded-md shadow-md focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-red-400 
                   transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );

}

export default App;
