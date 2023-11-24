import React, { useState, useEffect } from 'react'

const Filters = ({ onArtistSelection, onTrackSelection, artistsSelected, tracksSelected}) => {


  return (
    <div className='flex justify-center flex-col items-center'>
      <div className='font-bold'>
        Generate Recommendations Based on:
      </div>
      <div className='flex justify-center items-center gap-10 mt-5'>
        {!tracksSelected ? (
          
          <button className='btn rounded-full bg-transparent text-white hover:bg-white hover:text-slate-900'
          onClick={onTrackSelection}>Top Tracks</button>
        ): (
          
          <button className='btn rounded-full bg-white text-slate-900 hover:bg-white hover:text-slate-900'
          onClick={onTrackSelection}>Top Tracks</button>
          
        )}
        
        {!artistsSelected ? (
          <button className='btn rounded-full bg-transparent text-white hover:bg-white hover:text-slate-900'
          onClick={onArtistSelection}>Top Artists</button>
        ): (
          <button className='btn rounded-full bg-white text-slate-900 hover:bg-white hover:text-slate-900'
          onClick={onArtistSelection}>Top Artists</button>
        )}
        
      </div>
    </div>
  )
}

export default Filters