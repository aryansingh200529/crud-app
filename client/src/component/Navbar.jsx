import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg flex items-center justify-between px-8 sticky top-0 z-50">
      
      <div className="text-white text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer">
        LOGO
      </div>

      
      <ul className="flex gap-8 items-center">
        <li className="text-white text-md font-medium hover:text-yellow-300 hover:underline transition-all duration-300 cursor-pointer">
          HOME
        </li>
        <li className="text-white text-md font-medium hover:text-yellow-300 hover:underline transition-all duration-300 cursor-pointer">
          ABOUT
        </li>
        <li className="text-white text-md font-medium hover:text-yellow-300 hover:underline transition-all duration-300 cursor-pointer">
          CONTACT
        </li>
      </ul>
    </div>
  );
};

export default Navbar;






