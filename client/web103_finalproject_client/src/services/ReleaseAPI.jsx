
const fetchFanById = async ({id}) => {
    try{
        const response = await fetch(`http://localhost:3001/fans/{id}`);
        const eventsData = await response.json();
        return eventsData;
    }
    catch(error){
        console.log("There was an error fetching the Events data.")
    }
}

export default {
    fetchFanById,
}