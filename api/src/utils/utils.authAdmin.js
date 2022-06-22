const bcrypt = require("bcrypt");
const saltRounds = 10;

//Schemas
const Admin = require("../schemas/Admin");
const Ticket = require("../schemas/Ticket");
const Technical = require("../schemas/Technical");

const { now } = require("mongoose");
const  transporter  = require("../Conf/Mailer");
const User = require("../schemas/User");
const { EMAIL_USER } = process.env;

const createAdmin = async () => {
  password = bcrypt.hashSync("123456", saltRounds);
  const technical = await Technical.findOne({email: "admin@gmail.com"})
  if (technical) return { error: "Error, ya esta creada la cuenta del admin!" };
  let newAdmin = new Technical({
    name: "admin",
    last_name:"admin",
    email:  "admin@gmail.com",
    business: "sugsa",
    password,
    is_enabled:false
  });
  newAdmin.save();
  return { msg: "Create Successfully" };
};

const findAll = async () => {
  var adminAll = await Admin.find({});
  if (!adminAll) return { error: "Error, no hay usuarios cargados" };
  const users = adminAll.map((e) => {
    return { email: e.email, name: e.name, id: e._id };
  });
  return users;
};

const findAdmin = async (email, password) => {
  const isTechnical = await Technical.findOne({ email });
  if (!isTechnical) return { error: "Error, Este técnico no existe!" };
  if (isTechnical.is_enabled) {
    return { error: "Debe habilitar su cuenta!" };
  } else {
    const validate = await bcrypt.compare(password, isTechnical.password);
    if (!validate)
      return { error: "Error, El email o la contraseña es incorrecta!" };
    return {
      id: isTechnical._id,
      email: isTechnical.email,
      name: isTechnical.name,
    };
  }
};

const newPassword = async ({ email, password, code }) => {
  const isTechnical = await Technical.findOne({ email });
  if (!isTechnical) return { error: "Error, Este técnico no existe!" };
  if (isTechnical.is_enabled) {
    if (isTechnical.password === code) {
      password = bcrypt.hashSync(password, saltRounds);
      const update = {
        password,
        is_enabled: false,
      };
      const updateTech = await Technical.findByIdAndUpdate(
        isTechnical._id,
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

const createUserAdmin = async ({
  name,
  email,
  business,
  departament,
  last_name,
}) => {
  var password = newRandomPass();
  const user = await User.findOne({ email });
  if (user) return { error: "Error, el usuario ya tiene una cuenta!" };

  let newUser = new User({
    name: name.toLowerCase(),
    last_name: last_name.toLowerCase(),
    email,
    password,
    business,
    departament,
  });
  newUser.save();

  let info = await transporter.sendMail({
    from: `"ALTA DE CUENTA 👻" <${EMAIL_USER}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Nueva Cuenta ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Se le acaba de crear la cuenta, con el siguiente código podra habilitar su cuenta</b>
    <b> CÓDIGO:  ${password}</b>
    `, // html body
  });

  return { msg: "Técnico creado con éxitos!" };
};

const newRandomPass = () => {
  var password = "";
  var str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

  for (i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);

    password += str.charAt(char);
  }

  return password;
};


module.exports = {
  createAdmin,
  findAll,
  findAdmin,
  newPassword,
  createUserAdmin,
};
