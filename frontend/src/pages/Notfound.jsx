import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="-mt-20 pt-20 min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-7xl font-bold text-orange-400 mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Notfound;
