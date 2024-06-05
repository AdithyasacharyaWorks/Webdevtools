import React, { forwardRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = forwardRef((props, ref) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <motion.nav 
      ref={ref} 
      className="sticky top-0 bg-indigo-800 text-white shadow-lg z-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <div className="container mx-auto px-4 py-3 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-extrabold tracking-tight">WEBDEVTOOLS</h1>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {showMenu ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
            </button>
          </div>
        </div>
        <div className="hidden md:flex md:items-center">
          <ul className="md:flex space-x-6">
            <li>
              <NavLink exact to="/" className="text-lg hover:text-indigo-200 transition-colors">Home</NavLink>
            </li>
            <li>
              <NavLink to="/tool" className="text-lg hover:text-indigo-200 transition-colors">Tools</NavLink>
            </li>
            <li>
              <NavLink to="/add-category" className="text-lg hover:text-indigo-200 transition-colors">Add Category</NavLink>
            </li>
            <li>
              <NavLink to="/add-tool" className="text-lg hover:text-indigo-200 transition-colors">Add Tool</NavLink>
            </li>
            <li>
              <NavLink to="/projects" className="text-lg hover:text-indigo-200 transition-colors">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/task" className="text-lg hover:text-indigo-200 transition-colors">Task</NavLink>
            </li>
          </ul>
        </div>
      </div>
      {showMenu && (
        <motion.div 
          className="md:hidden bg-white fixed inset-0 z-20 bg-opacity-50" 
          onClick={closeMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="absolute right-0 top-0 h-full bg-indigo-800 w-64 shadow-lg"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4">
              <ul className="space-y-4">
                <li>
                  <NavLink exact to="/" className="block py-2 text-lg text-white hover:bg-indigo-700 transition-colors" onClick={closeMenu}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/tool" className="block py-2 text-lg text-white hover:bg-indigo-700 transition-colors" onClick={closeMenu}>Tools</NavLink>
                </li>
                <li>
                  <NavLink to="/add-category" className="block py-2 text-lg text-white hover:bg-indigo-700 transition-colors" onClick={closeMenu}>Add Category</NavLink>
                </li>
                <li>
                  <NavLink to="/add-tool" className="block py-2 text-lg text-white hover:bg-indigo-700 transition-colors" onClick={closeMenu}>Add Tool</NavLink>
                </li>
                <li>
                  <NavLink to="/projects" className="block py-2 text-lg text-white hover:bg-indigo-700 transition-colors" onClick={closeMenu}>Projects</NavLink>
                </li>
                <li>
                  <NavLink to="/task" className="block py-2 text-lg text-white hover:bg-indigo-700 transition-colors" onClick={closeMenu}>Task</NavLink>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
});

export default Navbar;
