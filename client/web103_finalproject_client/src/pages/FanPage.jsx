import React from "react";
import { Link } from "react-router-dom";
import AlbumOverview from "../components/AlbumOverview";

const FanPage = ({fanData, customerReleases}) => {
  return (
    <section>
      <figure>
        <img src={fanData.imageURL} alt={fanData.name + `'s profile image`}></img>
        <figcaption>
            <h2>{fanData.name}</h2>
            <p>{fanData.location}</p>
            <p>{fanData.description}</p>
        </figcaption>
      </figure>
      <article>
        {
          customerReleases?.map((release, index) => (
            <AlbumOverview key={index} props={release}/>
          ))
        }
      </article>
    </section>
  );
};

export default FanPage;
