import React from 'react';

const Placeholders = ({ numPlaceholders }) => {
  const placeholders = [];

  for (let i = 0; i < numPlaceholders; i++) {
    placeholders.push(
      <li key={i}>
        <div className='bg-slate-700 flex flex-row items-center rounded-xl p-3 gap-5 hover:cursor-pointer justify-between transition w-full hover:bg-slate-600 active:bg-slate-500 mb-3'>
          <div className='flex'>
            <div className='p-1 bg-transparent relative'>
              <div className='bg-slate-500 glass 'style={{ width: '52px', height: '52px', borderRadius: '15%' }}></div>
            </div>
            <div className='flex truncate'>
              <div className='flex flex-col pl-5'>
                <div className='skeleton font-bold rounded-full bg-slate-500 w-52 h-4 mt-1'> </div>
                <div className='skeleton h-4 bg-slate-500 mt-3 w-20'></div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }

  return <ul>{placeholders}</ul>;
};

export default Placeholders;
