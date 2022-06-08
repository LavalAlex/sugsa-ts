const validateNewTicket = ({ description}) => {


  if (!description) {
    return { description: "Error, Debe proporcionar una descripción!" };
  }
  if (description.length < 8) {
    return {
      description: "Error, La descripción debe tener al menos 8 caracteres",
    };
  }

  return {};
};

const inputTicketEdit = ({ assigned, classification}) => {
  if (
    (assigned === "" && classification === "") ||
    (!assigned && !classification )
  ) {
    return {
      error:
        "Error, You must provider an Technician or Classification or Description",
    };
  }

  if  (assigned && classification) {
    return { assigned ,classification };
  }
  if ( !assigned) {
    if(classification)
    return { classification };
  }
  if (assigned) {
    if(!classification)
    return { assigned };
  }

  return {};
};

const validateInputFeedback = (feedback) => {
  if (!feedback) return { feedback: "Error, You must provider a feedback" };
  if (feedback.length < 8) {
    return { feedback: "Error, The feedback must be at least 8 characters" };
  }
  return {};
};

const validateDescirption = ({ tech_descrip }) => {
  if (!tech_descrip)
    return {
      error: "Error, You must provider an Description",
    };
  if (tech_descrip.length < 4) {
    return {
      error: "Error, The description must be at least 8 characters",
    };
  }

  return {};
};
module.exports = { inputTicketEdit, validateNewTicket, validateInputFeedback, validateDescirption };
