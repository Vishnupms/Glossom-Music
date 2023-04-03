import React from 'react'
import {IoChevronDown} from 'react-icons/io5'

const FilterButtons = ({filterData,flag})=> {
  return (
    <div className="border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400">
       <p
        className="text-base text-white tracking-wide text-textColor flex items-center gap-2 ">
          {flag} <IoChevronDown className={'text-white'} />
        </p>

    
   
  </div>
  )
}

export default FilterButtons