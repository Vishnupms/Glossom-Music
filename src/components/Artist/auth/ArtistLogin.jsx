import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { replace, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginValidation } from "../../../helpers/validate";
import { artistActions } from "../../../redux/Slice/ArtistSlice";
import Tilt from "react-parallax-tilt";
import ArtistInstance from "../../../Axios/ArtistInstance";
import "./Login.css";

function ArtistLogin() {
  const navigate = useNavigate();
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
      console.log("happy ending");

      await ArtistInstance.post("/artist/login", { values })
        .then((res) => {
          let { token } = res.data;
          console.log(res.data,"datomms")
          localStorage.setItem("artisttoken", token);
          dispatch(
            artistActions.setArtistLogin({
              artist: "artist",
              name: res.data.artist.username,
              email:res.data.artist?.email,
              imgURL: res.data.artist?.imgURL,
              artistToken: res.data.token,
              id: res.data.artist._id,
            })
          );
          navigate("/artist", { replace: true });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.error);
        });

    },
  });
  return (
    <div className="h-screen bg-cover bg-no-repeat bg-[url(https://cdn.pixabay.com/photo/2020/02/06/08/19/band-4823341_960_720.jpg)]">
      <Toaster position="top-center"></Toaster>
      <div className="flex flex-col items-center justify-center bg-black/60 h-screen">
        <Tilt>
          <div className="container h-96 w-96 bg-white bg-opacity-[13%] rounded-2xl shadow-5xl border-white border border-r-0 border-b-0 border-opacity-25 backdrop-filter backdrop-blur-sm">
            <form
              className="h-full flex flex-col justify-evenly items-center"
              onSubmit={Formik.handleSubmit}
            >
              <div className="font-poppins text-white text-4xl">
                Hello There...
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
            <a href="#" className="font-poppins text-white">
              Forgot Password?
            </a>
            <a href="/artist/signup" className="font-poppins text-white ml-12">
              {" "}
              Dont have an account ?
            </a>
          </div>
        </Tilt>
      </div>
    </div>
  );
}

export default ArtistLogin;
