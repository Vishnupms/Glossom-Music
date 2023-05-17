import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white font-roboto">
      <h1 className="animate-swing text-5xl sm:text-8xl md:text-9xl font-bold mb-4">
        404
      </h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info text-center max-w-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          We can't find that page
        </h2>
        <p className="text-lg mb-8">
          We're fairly sure that page used to be here, but seems to have gone missing. We do apologize on its behalf.
        </p>
        <Link
          to={window.history.back()}
          className="inline-block uppercase bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
