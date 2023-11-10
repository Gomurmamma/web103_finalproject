import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AlbumOverview = (props) => {
  const [album, setAlbum] = useState({
    releaseID: props.releaseID,
    title: props.title,
    imageURL: props.imageURL,
    artistID: props.artistID,
    artistName: props.artistName
  });

  useEffect(() => {
    setGift({
      releaseID: props.releaseID,
      title: props.title,
      imageURL: props.imageURL,
      artistID: props.artistID,
    });
  }, [props]);

  return (
    <figure>
      <img src={imageURL} alt={title + `cover art`}></img>
      <figcaption>
        <ul>
          <li>
            <Link to={`/releases/` + releaseID}>{title}</Link>
          </li>
          <li>
            <Link to={`/artists/` + artistID}>{artistName}</Link>
          </li>
        </ul>
      </figcaption>
    </figure>
  );
};
export default AlbumOverview;
