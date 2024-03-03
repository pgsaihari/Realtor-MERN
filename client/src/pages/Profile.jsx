import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { updateUserSuccess, deleteUserSuccess,signOutSuccess } from "../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/api/users/update/${currentUser._id}`,
        formData
      );
      if (data.success === false) {
        setLoading(false);
        return toast.info(data.message);
      }

      dispatch(updateUserSuccess(data));
      setLoading(false);
      toast.success("successfully updated");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      return toast.error("Updating Failed");
    }
  };
  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      await alert("Do you want to Delete the account?");
      const { data } = await axios.delete(
        `/api/users/delete/${currentUser._id}`
      );
      if (data.success === false) {
        setLoading(false);
        return toast.error(data.message);
      }
      setLoading(false);
      dispatch(deleteUserSuccess());
      return toast.info(" 🗑️ account deleted, We'll miss you!");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      return toast.error("Deletion Failed");
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  // signOut function
  const handleSignOut=async()=>{
    try {
      setLoading(true)
      const {data}=await axios.get('/api/users/sign-out')
      if(data.success===false){
        setLoading(false)
        return toast.info("Signout failed")
      }
      setLoading(false)
      dispatch(signOutSuccess()) 
      return toast("Logged Out👋 Bye...") 
    } catch (error) {
      setLoading(false)
      console.log(false)
      return toast.error("Sign Out failed")
    }
  }

  // * page loader
  const pageReload = () => {
    if (!currentUser) {
      return toast("Please Sign In with your account", {
        position: "top-center",
        autoClose: 5000,
      });
    } else {
      return toast(" 🙏 Profile page", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    pageReload();
  }, []);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
