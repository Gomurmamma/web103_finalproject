import React from "react";
// NEED TO DEFINE ARTIST OVERVIEW COMPONENT

function SearchResults({ artists }) {
  return (
    <article className={style.SearchResults}>
      {artists?.map((artist, i) => (
        <ArtistOverview key={i} country={artist} />
      ))}
    </article>
  );
}

export default SearchResults;