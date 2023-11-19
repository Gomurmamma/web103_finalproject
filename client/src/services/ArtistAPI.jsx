const fetchAllArtists = async () => {
    try{
        const response = await fetch(`http://localhost:5001/artists/`);
        const artistData = await response.json();
        return artistData;
    }
    catch(error){
        console.log("There was an error fetching the Artist data.")
    }
}

export default {
    fetchAllArtists,
}