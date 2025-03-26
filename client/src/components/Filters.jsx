import React from 'react';
import Dropdown from './Dropdown';

const Filters = ({
  onArtistSelection,
  onTrackSelection,
  artistsSelected,
  tracksSelected,
  handleLongTerm,
  handleShortTerm,
  handleMediumTerm,
}) => {
  return (
    <div className='flex flex-col justify-center items'>
      <div className='flex font-bold justify-center'>
        Generate Recommendations Based on:
      </div>
      <div className='flex justify-center items-center gap-10 mt-5'>
        {!tracksSelected ? (
          <button className='btn rounded-full bg-transparent text-white hover:bg-white hover:text-slate-900' onClick={onTrackSelection}>
            Your Top Tracks
          </button>
        ) : (
          <button className='btn rounded-full bg-white text-slate-900 hover:bg-white hover:text-slate-900' onClick={onTrackSelection}>
            Your Top Tracks
          </button>
        )}

        {!artistsSelected ? (
          <button className='btn rounded-full bg-transparent text-white hover:bg-white hover:text-slate-900' onClick={onArtistSelection}>
            Your Top Artists
          </button>
        ) : (
          <button className='btn rounded-full bg-white text-slate-900 hover:bg-white hover:text-slate-900' onClick={onArtistSelection}>
            Your Top Artists
          </button>
        )}
      </div>
      <div className='flex justify-between'>
        <div>
          {tracksSelected ? (
            <Dropdown shortTerm={handleShortTerm} mediumTerm={handleMediumTerm} longTerm={handleLongTerm} />
          ) : null}
        </div>
        <div>
          {artistsSelected ? (
            <Dropdown shortTerm={handleShortTerm} mediumTerm={handleMediumTerm} longTerm={handleLongTerm} />
          ) : null}
        </div>
      </div>
      <div className='flex items-center mt-4'>
          <hr className='flex-1 opacity-20' />
          <div className='mx-4'>OR</div>
          <hr className='flex-1 opacity-20' />
        </div>

        <div className='flex flex-col items-center justify-center mt-5 overflow-auto'>
        <button className='btn rounded-full bg-transparent  hover:bg-white text-white hover:text-slate-900 w-28'>
            Search (coming soon)
          </button>

          </div>

    </div>
  );
};

export default Filters;
