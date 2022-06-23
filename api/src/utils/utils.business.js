// const { default: User } = require("../../../client/src/Pages/Admin/Tools/User/User");
const Business = require("../schemas/Business");
const Technical = require("../schemas/Technical");
const User = require("../schemas/User");

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

const findAllBusiness = async (name) => {
  if (!name) return { error: "Debe proporcionar un nombre de empresa" };
  else {
    name = name.toLowerCase();
    const business = await Business.findOne({ name });
    if (!business) return { error: "No existe empresa con ese nombre!" };
    else {
      const users = await User.find({ business: name });
      console.log(users);
      if (!users)
        return { error: "No existen usuarios registrados para esa empresa!" };
      else {
        return users;
      }
    }
  }
};

const addDepartament = async ({ departament, business }) => {
  if (!departament || !business) return { error: "Falta de datos!" };
  const updateBusiness = await Business.findOne({ name: business });
  const newDepartament = updateBusiness.departament;
  departament.map((e) => {
    newDepartament.push(e.name);
  });

  const newBusi = await Business.findByIdAndUpdate(updateBusiness._id, {
    departament: newDepartament,
  });
  return { msg: "Departamento agregado con éxitos!" };
};

module.exports = {
  createBusines,
  deleteDepartament,
  findTechnicals,
  technicalAssigned,
  deleteTechnical,
  findAllBusiness,
  addDepartament,
};
