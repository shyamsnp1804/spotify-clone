import React from "react";

const Login = ({ setToggle }) => {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="w-95 bg-black text-white p-10 rounded-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
            className="w-12"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Log in to Spotify
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email or username"
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1db954]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1db954]"
          />

          <button
            type="submit"
            className="w-full bg-[#1db954] hover:bg-[#1ed760] text-black font-bold py-3 rounded-full transition"
          >
            LOG IN
          </button>
        </form>

        {/* Forgot password */}
        <p className="text-sm text-center mt-5 underline cursor-pointer">
          Forgot your password?
        </p>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Signup */}
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => setToggle((prev) => !prev)}
            className="text-[#1db954] cursor-pointer font-semibold"
          >
            Sign up for Spotify
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
