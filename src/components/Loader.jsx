import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
      <img src="/assets/logo.png" alt="Ziara Logo" className="h-11" />
      <div className="absolute animate-spin rounded-full h-36 w-36 border-b-2 border-[#C5B358]"></div>
    </div>
  );
};

export default Loader;
