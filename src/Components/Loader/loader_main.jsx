import React from 'react';

const Loader_main = ({ fullPage = false, className = "" }) => {
  return (
    <div className={`${fullPage ? 'fixed inset-0 z-50' : 'w-full py-20'} flex items-center justify-center bg-[#f4f4f4]/50 backdrop-blur-sm ${className}`}>
      <div className="relative">
        <div className="loader"></div>

        <div className="absolute inset-0 flex items-center justify-center">
        </div>
      </div>
    </div>
  );
};

export default Loader_main;