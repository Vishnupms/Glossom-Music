import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik"; 
import { loginValidation } from '../../helpers/validate';
import Tilt from "react-parallax-tilt";
import Instance from '../../Axios/Instance';
import './Login.css'
import { userActions } from '../../redux/Slice/UserSlice';
import { useDispatch } from 'react-redux';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {

      await Instance.post('/user/login',{values}).then((res)=>{
        
      let { token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId',res.data.user._id)
        console.log(res.data.user.email)
        dispatch(
          userActions.setLogin({
            user: "user",
            name: res.data.user.username,
            token: res.data.token,
            id: res.data.user._id,
            email:res.data.user.email,
            imgURL: res.data?.imgURL,
          })
        );
        navigate('/home',{replace:true})
      }).catch((error)=>{
        console.log(error)
        toast.error(error.response.data.error)
      }) 
  }});
  return (
    <div className='bg-cover bg-no-repeat bg-center bg-[url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80)]'>
  <Toaster position="top-center"></Toaster>
  <div className='flex flex-col items-center justify-center bg-black/60 h-screen'>
    <Tilt>
      <div className="container mx-auto h-96 w-80 md:w-96 bg-white bg-opacity-[13%] rounded-2xl shadow-5xl border-white border border-r-0 border-b-0 border-opacity-25 backdrop-filter backdrop-blur-sm">
        <form className='h-full flex flex-col justify-evenly items-center' onSubmit={Formik.handleSubmit}>
          <div className='font-poppins text-white text-3xl md:text-4xl'>Hello There...</div>
          <input type="email" {...Formik.getFieldProps('email')} placeholder='Email' className='font-poppins input-text text-lg md:text-xl'  />
          <input type="password"  {...Formik.getFieldProps('password')} placeholder='Password' className='font-poppins input-text text-lg md:text-xl'/>
          <input type="submit" className='font-poppins cursor-pointer px-4 py-2 rounded-full bg-white bg-opacity-50 hover:bg-white text-lg md:text-xl' />
        </form>
        <div className="flex justify-between px-4 md:px-6 pb-4">
          <a href='#' className='font-poppins text-white text-sm md:text-base'>Forgot Password?</a>
          <a href='/register' className='font-poppins text-white text-sm md:text-base'>Don't have an account?</a>
        </div>
      </div>
    </Tilt>
  </div>
</div>

  )
}

export default Login