import React, { useState, useEffect } from "react";
import SearchResults from "./SearchResults";

const SearchFeatures = ({ artists }) => {
  const [searchField, setSearchField] = useState("");
  const [submittedSearchField, setSubmittedSearchField] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const [artistsResults, setArtistsResults] = useState([...artists.artistsData]);
  const [filteredArtists, setFilteredArtists] = useState([...artists.artistsData]);

  // Filter artists against the search text
  const filterByText = (data) => {
    if (!searchField || searchField === "") {
      return data;
    }
    const filteredArtistBySearch = data.filter(
      (artist) => artist.artistName.search(searchField) !== -1
    );
    return filteredArtistBySearch;
  };

  // Filter artists against the specified genre
  const filterByGenre = (data) => {
    if (!genreFilter || genreFilter === "") {
      return data;
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
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSubmittedSearchField(event.target.value);
  };

  // update display if new Search request or filter applied
  useEffect(() => {
    // apply any search criteria first
    let filteredArtists = filterByText(artistsResults);

    // then apply filtering
    let filterdData = filterByGenre(filteredArtists);

    // final artist results
    setFilteredArtists(filterdData);
  }, [submittedSearchField, genreFilter]);

  return (
    <section>
      <form>
        <fieldset>
          <input
            id="artistName"
            name="artistName"
            type="text"
            placeholder="Search for an artist..."
            title="Search for an artist"
            value={searchField}
            onChange={(e) => handleArtistSearchUpdate(e)}
          ></input>
          <button
            type="submit"
            onClick={(e) => {
              handleSearchSubmit(e);
            }}
          ></button>
        </fieldset>
        <fieldset>
            <select
            id="genre"
            name="genre"
            value={genreFilter}
            onChange={(e) => handleGenreChange(e)}
            title="Filter artists by genre">
                <option value="">
            {genreFilter === ""
              ? "Filter by Genre"
              : `Current Genre: ${genreFilter}`}
          </option>
          {genreFilter !== "" ? <option value="">all</option> : <></>}
          <option value="electronic">electronic</option>
          <option value="rap">rap</option>
          <option value="alternative">alternative</option>
          <option value="rock">rock</option>
          <option value="comedy">comedy</option>
          <option value="pop">pop</option>
          <option value="jazz">jazz</option>
            </select>
        </fieldset>
      </form>
      <SearchResults artists={filteredArtists} />
    </section>
  );
};

export default SearchFeatures;
