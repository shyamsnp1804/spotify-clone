import React from "react";

const Register = ({ setToggle }) => {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="w-100 bg-black text-white p-10 rounded-lg">
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
          Sign up for Spotify
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1db954]"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1db954]"
          />

          <input
            type="password"
            placeholder="Create password"
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1db954]"
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1db954]"
          />

          {/* Checkbox */}
          <div className="flex items-start gap-2 text-sm text-gray-400">
            <input type="checkbox" className="mt-1 accent-[#1db954]" />
            <p>
              I agree to the{" "}
              <span className="text-[#1db954] cursor-pointer">Terms</span> and{" "}
              <span className="text-[#1db954] cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#1db954] hover:bg-[#1ed760] text-black font-bold py-3 rounded-full transition"
          >
            SIGN UP
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Login Link */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => setToggle((prev) => !prev)}
            className="text-[#1db954] cursor-pointer font-semibold"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
