const Business = require("../schemas/Business");
const Technical = require("../schemas/Technical");

const createBusines = async ({ name, departament }) => {
  if (!name || !departament) {
    return { error: "Error debe proporcionar un nombre o un departamento" };
  } else {
    const isBusiness = await Business.findOne({ name: name.toLowerCase() });
    if (isBusiness) return { error: "Ya existe una empresa con ese nombre!" };
    const newBusiness = await Business.create({
      name: name.toLowerCase(),
      departament,
    });
    return { msg: "Empresa creada con éxitos" };
  }
};

const deleteDepartament = async ({ id, name, departament }) => {
  if (!id || !name || !departament)
    return { error: "Error debe proporcionar un nombre o un departamento" };
  else {
    const isBusiness = await Business.findOne({ _id: id });
    if (!isBusiness) return { error: "No existe empresa con ese id!" };
    let departBusiness = isBusiness.departament;
    departBusiness = departBusiness.filter((e) => e != departament);
    const update = await Business.findByIdAndUpdate(
      id,
      { departament: departBusiness },
      { new: true }
    );

    return { msg: "Departamento eliminado con éxitos!" };
  }
};

const findTechnicals = async (id) => {
  if (!id)
    return { error: "Error debe proporcionar un id para buscar empresa" };
  else {
    const isBusiness = await Business.findOne({ _id: id });
    if (!isBusiness) return { error: "No existe empresa con ese id!" };
    else {
      return isBusiness.technicals;
    }
  }
};

const technicalAssigned = async ({ idBusiness, idTechnical }) => {
  if (!idBusiness || !idTechnical)
    return {
      error: "Error debe proporcionar un id tanto de empresa como técnico",
    };
  else {
    const isTechnical = await Technical.findOne({ _id: idTechnical });
    if (!isTechnical) return { error: "Error no exites técnico con ese id" };
    const isBusiness = await Business.findOne({ _id: idBusiness });
    if (!isBusiness) return { error: "Error no exites empresa con ese id" };
    const updateBusiness = await Business.findByIdAndUpdate(
      idBusiness,
      { assignedTechnical: isTechnical },
      { new: true }
    );
    return { msg: "Técnico asignado con exito a la empresa!" };
  }
};

const deleteTechnical = async ({ idBusiness, idTechnical }) => {
  if (!idBusiness || !idTechnical)
    return {
      error: "Error debe proporcionar un id tanto de empresa como técnico",
    };
  else {
    const isTechnical = await Technical.findOne({ _id: idTechnical });
    if (!isTechnical) return { error: "Error no exites técnico con ese id" };
    const isBusiness = await Business.findOne({ _id: idBusiness });
    if (!isBusiness) return { error: "Error no exites empresa con ese id" };

    let allTechnicals = isBusiness.technicals;

    allTechnicals = allTechnicals.filter((e) => e._id != idTechnical);

    if (isBusiness.assignedTechnical) {
      if (isBusiness.assignedTechnical._id === idTechnical) {
        const update = {
          assignedTechnical: {},
          technicals: allTechnicals,
        };

        const updateBusiness = await Business.findByIdAndUpdate(
          idBusiness,
          update,
          { new: true }
        );

        return { msg: "Técnico eleminado con exito de la empresa!" };
      } else {
        const updateBusiness = await Business.findByIdAndUpdate(
          idBusiness,
          { technicals: allTechnicals },
          { new: true }
        );
        return { msg: "Técnico eleminado con exito de la empresa!" };
      }
    } else {
      const updateBusiness = await Business.findByIdAndUpdate(
        idBusiness,
        { technicals: allTechnicals },
        { new: true }
      );
      return { msg: "Técnico eleminado con exito de la empresa!" };
    }
  }
};

module.exports = {
  createBusines,
  deleteDepartament,
  findTechnicals,
  technicalAssigned,
  deleteTechnical,
};
