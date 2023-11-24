import React, { useEffect, useState } from 'react'

function AddToPlaylist({uri, token}) {
  const [playlists, setPlaylists] = useState([])

  const getUserPlaylists = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const data = await response.json()
        console.log(data.items)
        setPlaylists(data.items)
  
        if (!response.ok){
          throw new Error(`Failed to fetch playlists. Status: ${response.status}`);
        }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //getUserPlaylists();
  

  return (
    <div>ayo</div>
  )
}

export default AddToPlaylist