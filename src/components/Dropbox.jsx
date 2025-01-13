import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

// const options = ['Option 1', 'Option 2', 'Option 3']; // Options stored in a constant

function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value); // Default to the first option

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false); // Close dropdown after selecting an option
  };

  return (
    <div className="relative w-full">
      {/* Display the selected option on the button */}
      <button
        className="w-full text-center py-2 border border-2 rounded border-violet-500 hover:bg-violet-500 hover:text-white focus:outline-none"
        onClick={toggleDropdown}
      >
        {selectedOption}
            <div className='absolute text-xs top-4 right-3'>
                <FaChevronDown />
            </div> 
      </button>
      {isOpen && (
        <div className="absolute bg-gray-100 shadow-lg mt-1 w-full z-10">
          {options.map((option, index) => (
            <p
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
