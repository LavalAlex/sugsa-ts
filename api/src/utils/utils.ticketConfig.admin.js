const Business = require("../schemas/Business");
const TicketConfig = require("../schemas/TicketConfig");

const createTicketConfig = async ({
  business,
  classification,
  classification_default,
  clasDelete
}) => {
  const isBusiness = await Business.findOne({ name: business });
  if (!isBusiness) return { error: "No existe empresa con ese nombre!" };
  const isTicket = await TicketConfig.findOne({ business });
  if(clasDelete){
    if(clasDelete === isTicket.classification_default){
      let updateClassification = isTicket.classification;
      updateClassification = updateClassification.filter((e)=> e != clasDelete)
      const updaTicket = await TicketConfig.findByIdAndUpdate(isTicket._id, {
        classification: updateClassification,
        classification_default:{}
      });
      return { msg: "Clasificación creada con exitos!" };
    }else{

      let updateClassification = isTicket.classification;
      updateClassification = updateClassification.filter((e)=> e != clasDelete)
      const updaTicket = await TicketConfig.findByIdAndUpdate(isTicket._id, {
        classification: updateClassification,
      });
      return { msg: "Clasificación creada con exitos!" };
    }
  
  }
  if (isTicket) {
    if(classification_default){
      const updaTicket = await TicketConfig.findByIdAndUpdate(isTicket._id, {
        classification_default,
      });
      return { msg: "Clasificación asignada con exitos!" };
    }else{
      let updateClassification = isTicket.classification;
      updateClassification.push(classification.toLowerCase());
      const updaTicket = await TicketConfig.findByIdAndUpdate(isTicket._id, {
        classification: updateClassification,
      });
      return { msg: "Clasificación creada con exitos!" };
    }
  } else {
    const newTicket = await TicketConfig.create({
      business,
      classification: classification.toLowerCase(),
      classification_default,
    });
    newTicket.save();

    return { msg: "Ticket-Config creado con éxitos!" };
  }
};

module.exports = { createTicketConfig };
