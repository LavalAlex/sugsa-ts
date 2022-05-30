const validateNewTicket = ({ description, classification }) => {
  if (!classification)
    return { classification: "Error, You must provider a classification" };
  if (classification.length < 3) {
    return {
      classification: "Error, The classification must be at least 3 characters",
    };
  }

  if (!description) {
    return { description: "Error, You must provider a description" };
  }
  if (description.length < 8) {
    return {
      description: "Error, The description must be at least 8 characters",
    };
  }

  return {};
};

const inputTicketEdit = ({ assigned, classification, tech_descrip }) => {
  console.log(tech_descrip)
  if (
    (assigned === "" && classification === "" && tech_descrip === "") ||
    (!assigned && !classification && !tech_descrip)
  ) {
    return {
      error:
        "Error, You must provider an Technician or Classification or Description",
    };
  }
  if (!assigned && !classification) {
    return { tech_descrip };
  }

  if (tech_descrip && assigned) {
    return { assigned, tech_descrip, classification };
  }
  if (!tech_descrip && !assigned) {
    return { classification };
  }
  if (!tech_descrip && assigned) {
    return { assigned, classification };
  }
  if (!assigned && tech_descrip) {
    return { tech_descrip, classification };
  }

  if (classification.length < 8) {
    return {
      classification: "Error, The classification must be at least 8 characters",
    };
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
module.exports = { inputTicketEdit, validateNewTicket, validateInputFeedback };
