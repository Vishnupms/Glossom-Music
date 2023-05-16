import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Instance from "../../Axios/Instance";

function Otp() {
 
const navigate = useNavigate()
const [otpvalue,setOtpvalue] = useState("")
const [counter,setCounter] = useState(50)

useEffect(() => {
  counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
}, [counter]);

const verifyOtp = (e)=>{
    e.preventDefault()
    
    Instance.post("/user/signup",{otpvalue}).then(()=>{
        navigate('/login' ,{replace:true})
    })
}

const resendOtp = ()=>{
 
 try{
   toast.success("Resending OTP")
 
  Instance.get('/resendOtp').then((response)=>{

  if(response){

    toast.success('OTP resend successfully')
    setCounter(60)
  } else{
    toast.error("Something Went Wrong")
  }
  
})
} catch(error){
  toast.error(error.response.data.error)
}
}
  
  return (
    <div className='h-screen bg-cover bg-no-repeat bg-[url(https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)]'>
      <Toaster position="top-center"></Toaster>
  <div className='flex flex-col items-center justify-center bg-black/60 h-screen'>
        <p className='text-white/90  mb-2 text-md'>An OTP has been sent to your email address.</p>
    <div className="container h-40 w-96 bg-white bg-opacity-[15%] rounded-2xl shadow-5xl border-white border border-r-0 border-b-0 border-opacity-25 backdrop-filter backdrop-blur-sm">
      <form action={verifyOtp} className='h-40 flex flex-col  justify-evenly items-center'>

        <div className='flex space-x-5'>
        <input id="otp" value={otpvalue}  onChange={(e)=>{setOtpvalue(e.target.value)}} type="number" placeholder='Enter OTP' className='font-poppins text-center input-text' /> 
        


        <button type="submit" className='font-poppins cursor-pointer px-5 py-1 rounded-full bg-white bg-opacity-50 hover:bg-white mt-2' onClick={verifyOtp}> Verify</button>
        

        </div>  
        {counter?(<p className="text-md text-white/70"> {counter} Sec</p>):
        <p className="text-sm text-white/70  ">
                  Didn't get OTP ? &nbsp;  
        <button type="submit" className='font-poppins cursor-pointer px-5 py-1 rounded-full bg-white bg-opacity-10 hover:bg-black mt-2' onClick={resendOtp}> Resend OTP</button></p>
}
        

      </form>

    </div>

  </div>
</div>
  
  )

    
}

export default Otp