import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      const { data } = await axios.get("/api/users/user/sign-out");
      if (data.success === false) {
        return toast.info("Sign-out failed");
      }
      navigate("/sign-in");
      dispatch(signOutSuccess());
      return toast("Logged Out👋 Bye...");
    } catch (error) {
      console.log(error);
      return toast.error("Sign Out failed");
    }
  };
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Clear</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onClick={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              <i className="bi bi-house-door-fill"></i> Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              <i className="bi bi-file-person-fill"></i> About
            </li>
          </Link>
          {currentUser ? (
            <>
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  className="rounded-full h-7 w-7 object-cover"
                  alt="profile"
                />
              </Link>
              <li
                className="hidden sm:inline text-slate-700 hover:underline"
                onClick={handleSignOut}
              >
                <i className="bi bi-box-arrow-right"></i> Sign out
              </li>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <li className=" text-slate-700 hover:underline"> Sign In</li>
              </Link>
              <Link to="/sign-up">
                <li className=" text-slate-700 hover:underline"> Sign Up</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
