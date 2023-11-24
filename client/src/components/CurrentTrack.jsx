import React from 'react'

const CurrentTrack = ({ track }) => {
  return (
    <div>
      <div className='relative'>
          <div className='flex justify-center rounded-lg relative'>
        <img
          src={track.album.images[0].url}
          alt='Your Image'
          width={400}
          height={400}
        />
        
        <div className='flex absolute bg-slate-700 text-white p-2 rounded-xl bottom-1 left-1 bg-opacity-80 '>
          <div >
          <p className='font-bold'>{track.name}</p>
          <p>{track.artists[0].name}</p>
          </div>
         
        </div>
      </div>
    </div>
    </div>
  )
}

export default CurrentTrack