import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ArtistOverview = (props) => {
  const [artist, setArtist] = useState({
    imageURL: "",
    artistID: "",
    artistName: ""
  });

  useEffect(() => {
    setArtist({
        artistName: props.artistName,
      imageURL: props.imageURL,
      artistID: props.artistID,
    });
  }, [props]);

  return (
    <figure>
      <Link to={`/artists/` + artist.artistID}>
        <img src={artist.imageURL} alt={artist.artistName + `profile image`}></img>
      </Link>

      <figcaption>
        <h4>
        <Link to={`/artists/` + artist.artistID}>{artist.artistName}</Link>
        </h4>
            
      </figcaption>
    </figure>
  );
};
export default ArtistOverview;