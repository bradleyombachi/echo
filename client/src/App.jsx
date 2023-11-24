import React, { useEffect, useState } from 'react';
import Options from './components/PersonalizedTracks';
import PersonalizedTracks from './components/PersonalizedTracks';

function App() {
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    const getQueryStringParameter = (name) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    };

    const accessToken = getQueryStringParameter('access_token');

    if (accessToken) {
      setToken(accessToken);
      console.log({ accessToken });
      window.history.replaceState({}, document.title, '/');
    }
  }, []); // Run this effect only once when the component mounts

  const redirectToLogin = () => {
    window.location.href = 'http://localhost:8888/login';
  };

  

  return (
    <div className="h-screen bg-stone-900 text-white justify-center items-center bg-gradient-to-r from-slate-900">
      {token ? (
        <PersonalizedTracks token={token}/>
      ) : (
        <div className='flex justify-center items-center top-2'>
        
        <button className='mt-72 btn rounded-full' onClick={redirectToLogin}>Login to Spotify</button>
        
        </div>
      )}
    </div>
  );
}

export default App;
