import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({ title, options, setCategory, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(category || []);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setCategory(selectedOptions);
  }, [selectedOptions, setCategory]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    const optionName = option.name;
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== optionName));
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }
  };

  return (
    <div ref={dropdownRef} className="relative z-50">
      <button
        onClick={handleToggle}
        className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm flex justify-between items-center focus:outline-none"
      >
        <span>{selectedOptions.length > 0 ? selectedOptions.join(', ') : title}</span>
        <FiChevronDown className={`ml-2 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-b-lg shadow-md z-20">
          {options.map((option) => (
            <div
              key={option.name}
              onClick={() => handleSelectOption(option)}
              className={`cursor-pointer px-4 py-2 ${selectedOptions.includes(option.name) ? 'bg-gray-200' : ''}`}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
