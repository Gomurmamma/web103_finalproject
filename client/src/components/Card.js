import React from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  return (
      <div className="Card" style={{ backgroundImage:`url(${props.img_url})`}} >
        <div className="card-info">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="name">{props.name}</h2>
          <p className="genre">{props.genre}</p>
          <Link to={'artists/get/'+ props.artistid}><button className="seeMoreBtn">See More</button></Link>
        </div>
      </div>
  );
};

export default Card;