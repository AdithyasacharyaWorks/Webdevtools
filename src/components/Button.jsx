import React from 'react';

const Button = ({ name, color, onClick }) => {
  return (
    <button 
      className={`px-3 py-4 rounded-2xl border-0 bg-${color}-600 text-white text-sm font-semibold tracking-wide shadow-lg hover:shadow-md  focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-opacity-50 transition-all duration-300 hover:bg-${color}-600 hover:text-white hover:font-bold hover:scale-110  active:shadow-none active:scale-95`}
      onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
