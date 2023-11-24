import React, { useState } from 'react';

const Dropdown = ({ shortTerm, mediumTerm, longTerm }) => {
  const [rangeChosen, setRangeChosen] = useState(false);

  const handleSelection = (term, correspondingFunction) => {
    setRangeChosen(true);
    // Call handleSelection for the dropdown
    // Call the corresponding function based on the term
    correspondingFunction();
  };

  return (
    <div>
      {!rangeChosen ? (
        <div className='mt-2'>
          <ul className="dropdown-content z-[1] menu p-2 shadow glass bg-white rounded-box text-slate-900 w-52">
            <li className="hover:bg-gray-100 active:bg-glass">
              <a className="block px-4 py-2" onClick={() => handleSelection('shortTerm', shortTerm)}>
                Short-term (4 weeks)
              </a>
            </li>
            <li className="hover:bg-gray-100">
              <a className="block px-4 py-2" onClick={() => handleSelection('mediumTerm', mediumTerm)}>
                Medium-term (6 months)
              </a>
            </li>
            <li className="hover:bg-gray-100">
              <a className="block px-4 py-2" onClick={() => handleSelection('longTerm', longTerm)}>
                Long-term (Several years)
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
