import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { toast, Toaster } from "react-hot-toast";
import './Login.css';
import { useFormik } from 'formik';
import { siginupValidation } from '../../helpers/validate';
import Instance from '../../Axios/Instance';

function RegisterFan() {
  const navigate =useNavigate()
  const Formik =useFormik({
    initialValues:{
      username:"",
      email:"",
      phone:"",
      password:"",
      cnfpswd:"",
    },
    validate: siginupValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      
      toast.loading("We are processing your request...");
      console.log(values)
      setTimeout(function () {
        toast.dismiss();
      }, 30000)
      await Instance
      .post("/user/sendOtp",{values})
      .then((res)=>{
        toast.success("poli")
        navigate('/otp',{replace:true})
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error)
    });
  },
  })


  return (
    <div className='h-screen bg-cover bg-no-repeat bg-[url(https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)]'>
       <Toaster position="top-center"></Toaster>
      <div className='flex flex-col items-center justify-center bg-black/60 h-screen'>
      <h1 className =" text-white text-3xl mb-4 font-medium">
            Create an account
          </h1>
        <div className="container h-[30rem] w-96 bg-white bg-opacity-10 rounded-2xl shadow-2xl border-white border border-r-0 border-b-0 border-opacity-25 backdrop-filter backdrop-blur-sm">
          <form action='#' className='h-full flex flex-col justify-evenly items-center' onSubmit={Formik.handleSubmit} >
            <input type="text"  {...Formik.getFieldProps("username")} placeholder='Username' className='font-poppins input-text' />
            <input type="email" {...Formik.getFieldProps("email")} placeholder='Email' className='font-poppins input-text'  />
            <input type="tel" {...Formik.getFieldProps("phone")} placeholder='Phone' className='font-poppins input-text' />
            <input type="password" {...Formik.getFieldProps("password")} placeholder='Password' className='font-poppins input-text' />
            <input type="password" {...Formik.getFieldProps("cnfpswd")} placeholder='Confirm Password' className='font-poppins input-text' />

            <input type="submit" className='font-poppins cursor-pointer px-3 py-1 rounded-full bg-white bg-opacity-50 hover:bg-white' />
            <a href='/' className='font-poppins text-white/60'>Already have an account ?</a>
          </form>
        </div>
      </div>  
    </div>
  );
}

export default RegisterFan;