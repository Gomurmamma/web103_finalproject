const fetchReleasesByCustomerID = async ({id}) => {
    try{
        const response = await fetch(`http://localhost:5001/releases/customer${id}`);
        const releasesData = await response.json();
        return releasesData;
    }
    catch(error){
        console.log("There was an error fetching the Customer's Releases data.")
    }
}

export default {
    fetchReleasesByCustomerID,
}