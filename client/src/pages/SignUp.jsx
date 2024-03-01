import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import axios from "axios";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      

      const { data } = await axios.post("/api/users/sign-up", formData);
      console.log(data)
      if (data.success === false) {
        setLoading(false);
        return toast.warning(data.message);
      }
      toast.success("successfully registered");
      setLoading(false);
      console.log(data);
      navigate('/sign-in')
    } catch (error) {
      toast.error("Something went wrong try again later")
      setLoading(true)
      return console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          required
          onChange={handleChange}
        />
        
        

        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
         {loading? "Loading" : "SignUp"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className="text-blue-700">Sign in</span>
          
         
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
