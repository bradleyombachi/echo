import React, {useState, useEffect} from 'react'

const Settings = ({ handleToggleChange, autoPlay }) => {

  return (
    <div className='flex justify-between flex-col gap-3'>
      <div className='flex justify-center font-bold'>Settings</div>
      <div className='flex justify-center gap-3'>
        Autoplay: 
        {/* <input type="checkbox" className="toggle" checked /> */}
        
        <div className="flex items-center justify-center mt-1">
      <label htmlFor="toggle" className="cursor-pointer ">
        <div className={`relative w-10 h-5 rounded-xl transition duration-300 ${autoPlay ? 'bg-green-400' : 'bg-gray-300'}`}>
          <div
            className={`absolute w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${autoPlay ? 'translate-x-5' : 'translate-x-0'} bg-white`}
          ></div>
        </div>
      </label>
      <input
        type="checkbox"
        id="toggle"
        className="hidden"
        checked={autoPlay}
        onChange={handleToggleChange}
      />
    </div>
    </div> 
    </div>
  )
}

export default Settings