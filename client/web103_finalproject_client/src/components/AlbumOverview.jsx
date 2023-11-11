import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AlbumOverview = (props) => {
  const [album, setAlbum] = useState({
    releaseID: "",
    title: "",
    imageURL: "",
    artistID: "",
    artistName: "",
  });

  useEffect(() => {
    setAlbum({
      releaseID: props.releaseID,
      title: props.title,
      imageURL: props.imageURL,
      artistID: props.artistID,
    });
  }, [props]);

  return (
    <figure>
      <Link to={`/releases/` + album.releaseID}>
        <img src={album.imageURL} alt={album.title + `cover art`}></img>
      </Link>

      <figcaption>
        <ul>
          <li>
            <Link to={`/releases/` + album.releaseID}>{album.title}</Link>
          </li>
          <li>
            <Link to={`/artists/` + album.artistID}>{album.artistName}</Link>
          </li>
        </ul>
      </figcaption>
    </figure>
  );
};
export default AlbumOverview;
