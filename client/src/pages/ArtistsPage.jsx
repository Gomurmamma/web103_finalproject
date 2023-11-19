import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SearchFeatures from '../components/SearchFeatures'
import artistsServices from '../services/ArtistAPI';


const ArtistsPage = () => { 
    const [artists, setArtists] = [];

    useEffect(() => {
        async function startFetching(){
            const artistsData = await artistsServices.fetchAllArtists();
      
            if (!stopFetch){
              setArtists(artistsData);
              
            }
          }
      
          let stopFetch = false;
          startFetching();
          return () => {
            stopFetch = true;
          }
    
    }, []);

    return (
        <SearchFeatures artists={artists}/>
    )
}

export default ArtistsPage