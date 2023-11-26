import React, { useEffect, useState } from 'react'

function AddToPlaylist({uri, token}) {
  const [playlists, setPlaylists] = useState([])
  const [userID, setUserID] = useState('')

  const getUserPlaylists = async () => {
    try {
      const res = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch user profile. Status: ${res.status}`);
      }

      const userData = await res.json();
      setUserID(userData.id)

      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const data = await response.json()
        const filteredPlaylists = data.items.filter((playlist) => userData.id === playlist.owner.id);
        setPlaylists(filteredPlaylists);        

        if (!response.ok){
          throw new Error(`Failed to fetch playlists. Status: ${response.status}`);
        }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(()=>{
    getUserPlaylists()
  }, [])

  useEffect(()=>{
    console.log(playlists)
  }, [playlists])


  return (
    <div>
      <div className='font-bold mb-5'>
      Choose playlist to add to: 
      </div>
        {playlists ? (
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5'>
          {playlists.map((playlist)=> (
            <div
            key={playlist.id}
            className="flex flex-col rounded-lg overflow-hidden w-28 h-40 hover:opacity-80 p-1 hover:cursor-pointer hover:scale-105 transition-transform bg-gray-800 ease-in text-white active:scale-100"
          >
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="h-28 w-full object-cover rounded-t-lg"
            />
            <div className="mt-2 text-xs font-semibold">{playlist.name}</div>
          </div>
          ))}
          </div>
      ): (
        null
      )}
    </div>
  )
}

export default AddToPlaylist