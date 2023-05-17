import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { replace, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginValidation } from "../../../helpers/validate";
import { artistActions } from "../../../redux/Slice/ArtistSlice";
import Tilt from "react-parallax-tilt";
import AdminInstance from "../../../Axios/AdminInstance";
import "./Login.css";

function AdminLogin() {
  const navigate = useNavigate();
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {

      await AdminInstance.post("/admin/login", { values })
        .then((res) => {
          let { token } = res.data;
     
          localStorage.setItem("admintoken", token);
          navigate("/admin", { replace: true });
        })
        .catch((error) => {
   
          toast.error(error.response.data.error);
        });

    },
  });
  return (
    <div className="h-screen bg-contain bg-no-repeat bg-[url(https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGFkbWlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60)]">
      <Toaster position="top-center"></Toaster>
      <div className="flex flex-col items-center justify-center bg-black/60 h-screen">
        <Tilt>
          <div className="container h-96 w-96 bg-white bg-opacity-[13%] rounded-2xl shadow-5xl border-white border border-r-0 border-b-0 border-opacity-25 backdrop-filter backdrop-blur-sm">
            <form
              className="h-full flex flex-col justify-evenly items-center"
              onSubmit={Formik.handleSubmit}
            >
              <div className="font-poppins text-white text-4xl">
                Hello Admin
              </div>
              <input
                type="email"
                {...Formik.getFieldProps("email")}
                placeholder="Email"
                className="font-poppins input-text"
              />
              <input
                type="password"
                {...Formik.getFieldProps("password")}
                placeholder="Password"
                className="font-poppins input-text"
              />
              <input
                type="submit"
                className="font-poppins cursor-pointer px-5 py-1 rounded-full bg-white bg-opacity-50 hover:bg-white"
              />
            </form>
           
            
          </div>
        </Tilt>
      </div>
    </div>
  );
}

export default AdminLogin;
