import React from 'react';
import { Link } from 'react-router-dom';
import './auth/Login.css';


function Choice() {
  return (
    <div className='bg-cover bg-no-repeat bg-[url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80)]'>
      <div className='flex flex-col md:flex-row h-screen'>
        <div className="flex-grow flex flex-col items-center justify-center bg-black/60 md:w-1/2">
          <h1 className="text-white text-3xl md:text-3xl mb-4 ">I am an Artist</h1>
          <Link
            to={'/artist/signup'}
            className="h-64 md:h-80 w-64 md:w-80 bg-opacity-10 rounded-2xl shadow-5xl border-white border border-r-0 border-b-0 border-opacity-25 bg-no-repeat bg-cover bg-center link-zoom artist"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1575285113814-f770cb8c796e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBhcnRpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)",
            }}
          ></Link>
        </div>
        <div className="flex-grow flex items-center justify-center bg-black/60">
          <h1 className="text-white-300 text-3xl md:text-3xl mx-4 "><i>OR</i></h1>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center bg-black/60 md:w-1/2">
          <h1 className="text-white text-3xl md:text-3xl mb-4">I am a Fan</h1>
          <Link
            to={'/register'}
            className="h-64 md:h-80 w-64 md:w-80 bg-white bg-opacity-10 rounded-2xl shadow-5xl border-white border border-r-0 border-b-0 border-opacity-25 bg-cover bg-top link-zoom "
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)",
            }}
          ></Link>
        </div>
      </div>
    </div>
  );
}

export default Choice;

