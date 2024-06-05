import React from 'react'
import { FiSearch } from 'react-icons/fi';

function Search() {
  return (
    
<div className="flex items-center justify-center p-5">
  <div className="rounded-lg bg-gray-200 p-5">
    <div className="flex">
      <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-3">
        <FiSearch className="text-gray-500 w-6 h-6" />
      </div>
      <input type="text" className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0" placeholder="" id="" />
      <input type="button" value="Search" className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors" />
    </div>
  </div>
</div>

  )
}

export default Search