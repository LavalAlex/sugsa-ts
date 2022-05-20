const inputTicketEdit = ({assigned, classification})=>{
  
    if(assigned === "" && classification === "" || !assigned && !classification){
        return {error: "Error, You must provider an Technician or Classification"}

    }
    if (classification.length < 8) {
        return { classification: "Error, The classification must be at least 8 characters" };
      }
    return {}
}

module.exports = {inputTicketEdit}