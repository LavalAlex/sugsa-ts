const bcrypt = require("bcrypt");
const saltRounds = 10;

//Schemas
const User = require("../schemas/User");
const Ticket = require("../schemas/Ticket");
const { now } = require("mongoose");

const createUser = async ({name, email, password, business, departament, last_name}) => {
  password = bcrypt.hashSync(password, saltRounds);
  const user = await User.findOne({ email });
  if (user) return { error: "Error, el usuario ya tiene una cuenta!" };
  let newUser = new User({
    name:name.toLowerCase(),
    last_name:last_name.toLowerCase(),
    email,
    password,
    business,
    departament,
  });
  newUser.save();
  return { msg: "Create Successfully" };
};

const findAll = async () => {
  var userAll = await User.find({});
  if (!userAll) return { error: `Error, no exiten usuarios registrados` };
  const users = userAll.map((e) => {
    return { email: e.email, name: e.name, business: e.business, id: e._id, departament: e.departament , last_name: e.last_name};
  });
  return users;
};

const findUser = async (email, password) => {
  const userAuth = await User.findOne({ email });
  if (!userAuth) return { error: "Error, No existe usuario registrado" };
  const validate = await bcrypt.compare(password, userAuth.password);
  if (!validate) return { error: "Error, Email o Contraseña incorrecta" };
  return { id: userAuth._id, email: userAuth.email, name: userAuth.name,  last_name:userAuth.last_name };
};




const newPasswordUser = async ({ email, password, code }) => {
  const isUser = await User.findOne({ email });

  if (!isUser) return { error: "Error, Este técnico no existe!" };
  if (isUser.is_enabled) {
    if (isUser.password === code) {
      password = bcrypt.hashSync(password, saltRounds);

      const update = {
        password,
        is_enabled: false,
      };
      const updateTech = await User.findByIdAndUpdate(
        isUser._id,
        update,
        { new: true }
      );
      return { msg: "Contraseña creada con exito!" };
    } else {
      return { error: "Codigo no valido" };
    }
  } else {
    return { error: "Usted ya tiene habilitada su contraseña" };
  }
};

module.exports = { createUser, findAll, findUser, newPasswordUser};
