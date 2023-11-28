import React, { useState, useEffect } from 'react';
import { IoPlayForward, IoPlay, IoPause } from "react-icons/io5";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOpenInNew } from "react-icons/md";
import AddToPlaylist from './AddToPlaylist';
import CurrentTrack from './CurrentTrack';
import { IoSettingsSharp } from "react-icons/io5";
import Filters from './Filters';
import { FaSliders } from "react-icons/fa6";
import Dropdown from './Dropdown';
import ReactDOM from 'react-dom'
import Settings from './Settings';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Placeholders from './Placeholders';



const PersonalizedTracks = ({ token }) => {



  const [recommendations, setRecommendations] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [recList, setRecList] = useState([]);
  const [audio, setAudio] = useState(new Audio());
  const [inputValue, setInputValue] = useState('');
  const [selectedTrack , setSelectedTrack] = useState('');
  const [showSelectedTrack, setShowSelectedTrack] = useState(false);
  const [tracksSelected, setTracksSelected] = useState(false);
  const [artistsSelected, setArtistsSelected] = useState(false);
  const [term, setTerm] = useState('');
  const [autoPlay, setAutoPlay] = useState(false);
  const [progress, setProgress] = useState(null);
  const [showList, setShowList] = useState(false);
  const [numPlaceholders, setNumPlaceholders] = useState(0);

  // Determines if audio will play automatically
  const handleToggleChange = () => {
    setAutoPlay(!autoPlay);
  }

  const placeholderStyles = {
    border: '1px',
    width: '50px',

  }

  const handleArtistSelection = () =>  {
    setArtistsSelected((prevState)=>!prevState);
    tracksSelected ? (
      setTracksSelected((prevState)=>!prevState)
    ) : (
      null
    )
  }


  const handleTrackSelection = () => {
    setTracksSelected((prevState)=> !prevState);
    artistsSelected ? (
      setArtistsSelected((prevState)=>!prevState)
    ) : (
      null
    )
  }

  // Options for time range parameter
  const handleShortTerm = () => {
    setTerm('short')
  }

   const handleMediumTerm = () => {
    setTerm('medium')
  }

  const handleLongTerm = () => {
    setTerm('long')
  }

  const handleExternalLink = (spotifyUrl) => {
    window.open(spotifyUrl, '_blank')
  }

  // Search input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Determines which track is displayed
  const handleSelectTrack = (track) => {
    setSelectedTrack(track)
    setShowSelectedTrack(true);
  }

  const handlePlay = (previewUrl) => {
    
    // Pause the currently playing audio (if any)
    audio.pause();
  
    // Set the new audio source to the preview URL
  
    // Play the new audio after it has loaded
    audio.play();

    
    // Toggle the play/pause state
    setIsPlaying((prevState) => !prevState);

    audio.addEventListener('timeupdate', function() {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(currentProgress);
    });

    audio.addEventListener('ended', function() {
      if (autoPlay) {
      // If autoPlay is true, perform actions based on whether artists or tracks are selected
      if (artistsSelected) {
        getTopArtistsAndRecFromArtists();
      } else if (tracksSelected) {
        getTopTracksandRecFromTracks();
      }
    }

    else {
      setIsPlaying((prevState) => !prevState);
    }

      
    });
  };

// Function to pause playback
   const handlePause = (preview_url) => {
    audio.pause();
    setIsPlaying((prevState)=>!prevState);
  }



  const getTopArtistsAndRecFromArtists = async () => {
    setShowList(true)
    audio.pause();
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${term}_term&limit=5`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch top artists. Status: ${response.status}`);
      }
  
      const data = await response.json();
      const artistIDs = data.items.map(artist => artist.id).join(',');

      const recResponse = await fetch(`https://api.spotify.com/v1/recommendations?limit=1&seed_artists=${artistIDs}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!recResponse.ok) {
        throw new Error(`Failed to fetch recommendation. Status: ${recResponse.status}`);
      }
  
      const recData = await recResponse.json();
      setRecommendations(recData);
      const newArray = [recData, ...recList];
      setRecList(newArray);
      setSelectedTrack(recData.tracks[0]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getTopTracksandRecFromTracks = async () => {
    setShowList(true)
    audio.pause();
    try {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch top tracks. Status: ${response.status}`);
      }

      const data = await response.json();
      
      const trackIDs = data.items.map(track => track.id).join(',');
      const recResponse = await fetch(`https://api.spotify.com/v1/recommendations?limit=1&seed_tracks=${trackIDs}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!recResponse.ok) {
        throw new Error(`Failed to fetch recommendation. Status: ${recResponse.status}`);
      }
  
      const recData = await recResponse.json();
      setRecommendations(recData);
      const newArray = [recData, ...recList];
      setRecList(newArray);
      setSelectedTrack(recData.tracks[0]);
    }
      catch (error) {
        console.error('Error:', error);
      }
  }

  // Handles switching track
useEffect(()=>{
  recList && recList.length>0 ? (
    setProgress(0),
    audio.pause(),
    setIsPlaying(false),
    setAudio(new Audio(selectedTrack.preview_url))
  ) : (
    null
  )
}, [selectedTrack])

// Handles autoplay
useEffect(()=>{
  setProgress(0);
  autoPlay ? (
  handlePlay()

  ) : (null)

}, [audio])

//Handles placeholder rendering
useEffect(()=> {
  recList.length < 4 ? (
    setNumPlaceholders(4-recList.length)
  ): (null)
  
}, [recList])


  return (
    <div className='h-screen justify-center items-center bg-gradient-to-r from-slate-900 text-white overflow-y-auto overflow-x-clip '>
      <header className=' flex top-0 h-14 bg-slate-700 fixed w-full items-center px-5 z-50 justify-between'> 
        <div className='flex'>
          <div className='font-bold'>ECHO</div>
          <div className='font-light pl-3'>Spotify Recommendations</div>
        </div>
        
        <div className='flex gap-2'>
        <button className='p-3 rounded-lg hover:cursor-pointer bg-slate-600 flex justify-center items-center active:scale-95 transition ease-in hover:bg-slate-500 '
        onClick={()=>document.getElementById('my_modal_2').showModal()}>
        <FaSliders />
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box glass">
            <Filters onArtistSelection={handleArtistSelection} onTrackSelection={handleTrackSelection} artistsSelected={artistsSelected} tracksSelected={tracksSelected} handleShortTerm={handleShortTerm} handleMediumTerm={handleMediumTerm} handleLongTerm={handleLongTerm}/>
            
            <div className="modal-action">
              <form method="dialog">
                <button className="btn rounded-full">Save</button>
              </form>
            </div>
          </div>
        </dialog>

        <div>
        <button className='p-3 rounded-lg hover:cursor-pointer bg-slate-600 flex justify-center items-center active:scale-95 transition ease-in hover:bg-slate-500 
        ' onClick={()=>document.getElementById('my_modal_3').showModal()}
        >
        <IoSettingsSharp />
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box glass">
            <Settings handleToggleChange={handleToggleChange} autoPlay={autoPlay}/>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn rounded-full">Save</button>
              </form>
            </div>
          </div>
        </dialog>
        </div>

      </div>
      </header>
      
      <div className='flex pt-16 flex-col justify-center items-center flex-grow'>
      <div className='flex flex-col top-0 w-full justify-center md:flex-row items-center'>
      <div className=' top-0  w-96 flex flex-col justify-center'>      
      
        <div>
        {recommendations.tracks && recommendations.tracks.length > 0 ? (
          <div>
        <div className='flex'> 
          {recommendations.tracks.map((track)=> (

            <div  key={track.id}>
          
          <CurrentTrack track={selectedTrack} />

          <div className='flex justify-between w-full md:w-auto items-center'>
          <div className='flex tooltip tooltip-bottom' data-tip='Add to Playlist'>
          <button className='btn btn-circle mt-5 bg-slate-700 border-none text-white hover:bg-slate-500' onClick={()=>document.getElementById('my_modal_1').showModal()} > <FaPlus className='text-xl'/>
          </button>
          <dialog id="my_modal_1" className="modal">
          <div className="modal-box glass">
            <AddToPlaylist uri={track.uri} token={token}/>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn rounded-full">Close</button>
              </form>
            </div>
          </div>
          
        </dialog>
         </div>


          
         <div className='flex btn-circle mt-5 justify-center items-center relative tooltip tooltip-bottom' data-tip="Preview song">
        <div className='btn btn-circle bg-slate-700 border-none text-white hover:bg-slate-500' onClick={ !isPlaying ? () => handlePlay(track.preview_url) : () => handlePause(track.preview_url)} >
          <div>
          <CircularProgressbar className='flex absolute top-0 right-0 w-13 top' value={`${progress}`} text="" 
          styles={buildStyles({
            pathColor: 'white',
            trailColor: "transparent"
          })} />
          </div>
          <div className='absolute'>
            {isPlaying ? (
              <IoPause className='text-xl'/>
            ): (
              <IoPlay className='text-xl'/>
            )}
            </div> 
          </div>
          </div>
  
   
          <div className='btn btn-circle mt-5 bg-slate-700 border-none text-white hover:bg-slate-500' > <IoPlayForward className='text-xl' onClick={ 
          artistsSelected ?(getTopArtistsAndRecFromArtists) : 
          tracksSelected ? (getTopTracksandRecFromTracks) :
          null}/> </div>
          
        </div>
          </div>
          ))}
        </div>
          
        </div>
      ) : (
        <div className='flex justify-center flex-col items-center'>
        <div>No recommendations available.</div>
        <div className='btn rounded-full mt-5 bg-white text-slate-900' onClick={ 
          artistsSelected ?(getTopArtistsAndRecFromArtists) : 
          tracksSelected ? (getTopTracksandRecFromTracks) :
          null}>Generate</div>
        </div>
      )}
      </div>

    
      
    </div>
    
    {showList ? (
          <div className='flex flex-col w-full md:w-96 h-full top-0 gap-0 relative justify-center pt-7'>
          
          <ul className='flex flex-col gap-3 h-96 overflow-y-auto overflow-x-clip px-5'> 
        {recList
          .filter(rec => 
            rec.tracks[0].name.toLowerCase().includes(inputValue.toLowerCase()) ||
            rec.tracks[0].artists[0].name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((rec) => (
            <div key={rec.tracks[0].id}>
            <li>
              <div className='bg-slate-700 flex flex-row items-center rounded-xl p-3 gap-5 hover:cursor-pointer justify-between transition w-full hover:bg-slate-600 active:bg-slate-500' onClick={()=>handleSelectTrack(rec.tracks[0])}>
                <div className='flex'>
                  <div className='p-1 bg-white relative'>
                 
                       <img src={rec.tracks[0].album.images[0].url} height={50} width={50} />
                       
                  </div>
                  <div className='flex truncate overflow-hidden'>
                      <div className='flex flex-col pl-5'>
                        <p className='font-bold'>{rec.tracks[0].name}</p>
                        <p>{rec.tracks[0].artists[0].name}</p>
                      </div>
                  </div>
                  
                </div>
                <div className='tooltip mr-2' data-tip="Open in Spotify">
                  <div className='flex justify-center items-center'>
                    <MdOpenInNew className='text-xl active:scale-90' onClick={() => handleExternalLink(rec.tracks[0].external_urls.spotify)}/>
                  </div>
                </div>
              </div>
            </li>

            </div>
          ))}
        {recList.length < 4 ? (
          <Placeholders numPlaceholders={numPlaceholders}/>   
        ): (null)}
      </ul>
      
            <div className='py-12 px-12'>

            </div>

              <div className='flex  justify-between items-center py-5 px-5 gap-5 bottom-0 absolute w-full'>
                <div className='w-full mb-2'>
                <input
                  type="text"
                  className="input bg-slate-700 text-white py-2 px-4 rounded-lg w-full mr-7 "
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Search songs"
                  name="searchQuery" // Add a name attribute
                    />
                </div>
              <div className='tooltip ' data-tip='Create Playlist'>
              <div className='btn btn-circle bg-slate-700 border-none text-white hover:bg-slate-500 mb-3' > <MdOutlinePlaylistAdd className='text-xl'/>
              </div>
              </div>
      
              </div>
              
          </div>
          

    ): (null)}


    </div>
    </div>
    </div>
    

  );
};

export default PersonalizedTracks;
