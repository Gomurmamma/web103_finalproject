import React from "react";
import { Link } from "react-router-dom";

const FanPage = ({fanData}) => {
  return (
    <section>
      <figure>
        <img></img>
        <figcaption>
            <h2>fanData.name</h2>
            <p>fanData.location</p>
            <p>fanData.description</p>
        </figcaption>
      </figure>
      <article>
        
      </article>
    </section>
  );
};

export default FanPage;
