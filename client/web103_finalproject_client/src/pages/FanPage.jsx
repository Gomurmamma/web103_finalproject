import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AlbumOverview from "../components/AlbumOverview";
import { useParams } from "react-router-dom";
import releasesServices from "../services/ReleaseAPI";

const FanPage = ({}) => {
  const { id } = useParams();

  const [fan, setFan] = useState({
    name: "",
    imageURL: "",
    location: "",
    description: "",
  });

  

  const [customerReleases, setCustomerReleases] = useState([]);


  useEffect(() => {
    async function startFetching(){
        const customerReleaseData = await releasesServices.fetchReleasesByCustomerID(id.toString());
        const fanData = await fanServices.fetchFanById(id);
  
        if (!stopFetch){
          setCustomerReleases(customerReleaseData);
          setFan(fanData);
        }
      }
  
      let stopFetch = false;
      startFetching();
      return () => {
        stopFetch = true;
      }

}, [id]);

  return (
    <section>
      <figure>
        <img src={fan.imageURL} alt={fan.name + `'s profile image`}></img>
        <figcaption>
          <h2>{fan.name}</h2>
          <p>{fan.location}</p>
          <p>{fan.description}</p>
        </figcaption>
      </figure>
      <article>
        {customerReleases?.map((release, index) => (
          <AlbumOverview key={index} props={release} />
        ))}
      </article>
    </section>
  );
};

export default FanPage;
