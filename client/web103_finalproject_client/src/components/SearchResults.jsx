import React from "react";
import ArtistOverview from "./ArtistOverview";

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