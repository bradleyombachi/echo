import React, { useEffect, useState } from 'react'

function Modal({ onConfirm, onCancel, playlistName }) {
  return (
    <dialog id="playlistConfirm" className="modal">
      <div className="modal-box glass">
        <p>Are you sure you want to add to this playlist?</p>
        <div className="modal-action flex justify-center">
          <button className="btn rounded-full" onClick={onConfirm}>
            Confirm
          </button>
          <button className="btn rounded-full" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}

function AddToPlaylist({uri, token}) {
  const [playlists, setPlaylists] = useState([])
  const [userID, setUserID] = useState('')
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)

 
  const handlePlaylistSelection = (playlist) => {
    setSelectedPlaylist(playlist);
    document.getElementById('playlistConfirm').showModal();
  };

  const handleConfirm = () => {

    console.log(selectedPlaylist);
    
    document.getElementById('playlistConfirm').close();
  };

  const handleCancel = () => {
    document.getElementById('playlistConfirm').close();
  };


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


  return (
    <div>
      <div className='flex font-bold mb-5 justify-center'>
        Choose playlist to add to:
      </div>
      {playlists ? (
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 relative'>
          {playlists.map((playlist) => (
            <div className="group relative" key={playlist.id}>
              <div
                key={playlist.id}
                className="flex flex-col rounded-lg overflow-hidden w-28 h-28 hover:opacity-80 hover:cursor-pointer hover:scale-105 transition-transform bg-gray-800 ease-in text-white active:scale-100 relative"
                onClick={() => handlePlaylistSelection(playlist)}
              >
                <img
                  src={playlist.images[0]?.url}
                  alt={playlist.name}
                  className="h-28 w-full object-cover rounded-t-lg"
                />
                <div className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  {playlist.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        null
      )}
      <Modal onConfirm={handleConfirm} onCancel={handleCancel} />
    </div>
  );
}

export default AddToPlaylist