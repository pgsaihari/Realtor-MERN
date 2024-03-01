import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";  
import {useDispatch,useSelector} from "react-redux"

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading}=useSelector((state)=>state.user)
 const dispatch=useDispatch()
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const { data } = await axios.post("/api/users/sign-in", formData);
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure())
        toast.error(data.message);
        return;
      }
      dispatch(signInSuccess(data))
      toast.success("😊");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong , try again later!");
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
