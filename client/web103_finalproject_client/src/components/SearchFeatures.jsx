import React, {useState, useEffect} from "react";
// import SearchResults

const SearchFeatures = ({props}) => {
    const [searchField, setSearchField] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    
    const [artistsResults, setArtistsResults] = useState([...props.artistsData])
    const [filteredArtists, setFilteredArtists] = useState([]);

    // Filter artists against the search text
    const filterByText = (data) => {

        if (!searchField || searchField === ""){
            return data
        }
        const filteredArtistBySearch = data.filter(
            (artist) => artist.artistName.search(searchField) !== -1
        );
        return filteredArtistBySearch;
    }

    // Filter artists against the specified genre
    const filterByGenre = (data) => {
        if (!genreFilter || genreFilter === ""){
            return data
        }

        const filteredArtists = data.filter(
            (artist) => artist.genre === genreFilter
        );
        return filteredArtists;
    };

    const handleGenreChange = (event) => {
        setGenreFilter(event.target.value);
    };

    const handleArtistSearchUpdate = (event) => {
        event.preventDefault();
        setSearchField(event.target.value);
    }

    // update display if new Search request or filter applied
    useEffect(() => {
        // apply any search criteria first
        let filteredArtists = filterByText(artistsResults);

        // then apply filtering
        let filterdData = filterByGenre(filteredArtists);

        // final artist results
        setFilteredArtists(filterdData);
        
    }, [artistsResults, genreFilter]);




}

export default SearchFeatures;