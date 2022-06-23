const LowUser = require("../schemas/LowUser");
const User = require("../schemas/User");

const deleteDepartamentUser = async ({ email, departament }) => {
  if (!email) return { error: "Debe proporcionar el email del usuario!" };
  if (!departament)
    return {
      error: "Debe proporcionar el departamento donde trabaja el usuario!",
    };
  const user = await User.findOne({ email });
  if (!user) return { error: "No exites usuario con este email!" };
  const newDepartaments = user.departament.filter((e) => e != departament);

  const updateuser = await User.findByIdAndUpdate(user._id, {
    departament: newDepartaments,
  });
  return { msg: "Departamento elimindo con exitos!" };
};

const deleteUser = async ({ email }) => {
  if (!email) return { error: "Debe proporcionar el email del usuario!" };
  const user = await User.findOne({ email });
  if (!user) return { error: "No exites usuario con este email!" };
  const newUser = await LowUser.create({
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    business: user.business,
    departament: user.departament,
  });
  const deleteUser = await User.findByIdAndDelete(user._id);
  return { msg: "Eliminado con exitos" };
};

const updateUser = async ({ email, name, last_name }) => {
  if (!email) return { error: "Debe proporcionar el email del usuario!" };
  if (!name && !last_name) return { error: "Falta datos para modificar!" };
  
  const user = await User.findOne({ email });
  if (!user) return { error: "No exites usuario con este email!" };

  if (!last_name){
    const updaUser = await User.findByIdAndUpdate(user._id, {name})
    return {msg:"Nombre del usuario cambiado con éxitos!"}
  }else{
    if(!name){
      const updaUser = await User.findByIdAndUpdate(user._id, {last_name})
      return {msg:"Apellido del usuario cambiado con éxitos!"}
    }
    const updaUser = await User.findByIdAndUpdate(user._id, {name,last_name})
    return {msg:"Nombre y Apellido del usuario cambiado con éxitos!"}
  }   
};
module.exports = {
  deleteDepartamentUser,
  deleteUser,
  updateUser
};
