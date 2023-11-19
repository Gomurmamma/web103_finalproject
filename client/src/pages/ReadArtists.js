import React, { useState, useEffect } from 'react';
import Card from '../components/Card';


const ReadArtists = (props) => {

    const [posts, setPosts] = useState([]);
    

    useEffect(() => {
        setPosts(props.data);
    }, [props]);
    
    return (
        <div className="ReadArtists">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card key={post.artistid} 
                         id={post.artistid} 
                         name={post.artistname} 
                         genre={post.genre} 
                         img_url={post.imageurl} 
                         />
                ) : <h3 className="noResults">{'No Artists Yet 😞'}</h3>
            }
        </div>  
    )
}

export default ReadArtists;