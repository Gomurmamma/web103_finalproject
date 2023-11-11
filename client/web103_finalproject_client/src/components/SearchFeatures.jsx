import React, {useState, useEffect} from "react";
// import SearchResults

const SearchFeatures = ({props}) => {
    const [searchField, setSearchField] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    
    const [artistsResults, setArtistsResults] = useState([...props.artistsData])
    const [filteredArtists, setFilteredArtists] = useState([]);

    // Filter artists against the specified genre
    const filterByGenre = () => {
        if (!genreFilter || genreFilter === ""){
            return artistsResults
        }

        const filteredArtists = artistsResults.filter(
            (artist) => artist.genre === genreFilter
        );
        return filteredArtists;
    };

    const handleGenreChange = (event) => {
        setGenreFilter(event.target.value);
    };

    useEffect(() => {
        let filterdData = filterByGenre(artistsResults);
        setFilteredArtists(filterdData);
    }, [artistsResults, genreFilter]);
    
}

export default SearchFeatures;