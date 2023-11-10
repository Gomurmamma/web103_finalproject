const fetchFanById = async ({id}) => {
    try{
        const response = await fetch(`http://localhost:5001/fans/${id}`);
        const fanData = await response.json();
        return fanData;
    }
    catch(error){
        console.log("There was an error fetching the Fan data.")
    }
}

export default {
    fetchFanById,
}