import React, { useState } from 'react';
import { Link, useNavigate } from "@tanstack/react-router";
import { HiMenuAlt3 } from 'react-icons/hi';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menu = [
    { name: "Orders", path: "/orders" },
    { name: "Add Item", path: "/additem" },
    { name: "Add Promocode", path: "/promocode" },
    { name: "Products", path: "/product" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate({ to: "/" });
  };
 const branch=localStorage.getItem('selectedBranch')
  return (
    <div className='w-full p-5 sticky top-0 bg-white  z-50'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-xl'>{branch} Admin</h1>

        {/* Desktop Menu */}
        <div className='hidden lg:flex gap-4 text-sm font-semibold items-center text-neutral-800'>
          {menu.map((item, index) => (
            <Link to={item.path} key={index}>{item.name}</Link>
          ))}
          <button
            onClick={handleLogout}
            className='font-semibold cursor-pointer text-white px-4 py-2 ml-5 rounded-md bg-black'
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className='lg:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            <HiMenuAlt3 size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className='flex flex-col mt-3 lg:hidden gap-5 text-lg font-semibold text-neutral-800'>
          {menu.map((item, index) => (
            <Link to={item.path} className='text-center pt-6' key={index} onClick={() => setIsOpen(false)}>{item.name}</Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className='font-semibold text-center mt-2 text-white px-4 py-2 rounded-md bg-black'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
