import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
const Oauth = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post("/api/users/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      if (data.success === false) {
        return toast.error("google sign-in failed");
      }
      toast.success("signed in");
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      console.log("failed to connect to google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className=" bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 "
    >
      Continue with google
    </button>
  );
};

export default Oauth;
