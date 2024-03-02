import { Outlet, Navigate } from "react-router-dom";
import {useEffect} from 'react'
import { useSelector } from "react-redux";
import {toast } from 'react-toastify'
const PrivateRoute = () => {
  const privateReload = () => {
    if (currentUser) {
      return toast("🦄 Your Profile", {
        position: "top-center",
        autoClose: 5000,
      });
    } else {
        return  toast("Please Sign In to access profile", {
            position: "top-center",
            autoClose: 5000,
          });
    }
  };

  useEffect(() => {
    privateReload();
  }, []);
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoute;
