import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const Home = () => {
  const homePageReload = () => {
    return toast('🦄 welcome to clear estate', {
      position: 'top-center',
      autoClose: 5000,
    
    });
  };

  useEffect(() => {
    homePageReload();
  }, []);

  return <div>Home</div>;
};

export default Home;
