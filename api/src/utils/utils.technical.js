const Business = require("../schemas/Business");
const Technical = require("../schemas/Technical");
const { EMAIL_USER } = process.env;
const transporter = require("../Conf/Mailer");

const createTechnical = async ({ name, last_name, business, email }) => {
  if (!name || !last_name || !business || !email)
    return { error: "Error debe proporcionar los datos necesarios!" };

  const isTechnicals = await Technical.findOne({ email });

  if (isTechnicals) return { error: "El técnico ya tiene una cuenta!" };
  const isBusiness = await Business.findOne({ name: business.toLowerCase() });

  if (!isBusiness) return { error: "Error no existe la empresa seleccionada!" };

  var password = newRandomPass();

  const newTechnical = await Technical.create({
    name: name.toLowerCase(),
    last_name: last_name.toLowerCase(),
    email,
    business: isBusiness.name,
    password
  });

  let technical = technicalBusiness(isBusiness._id, email);

  let info = await transporter.sendMail({
    from: `"ALTA DE CUENTA 👻" <${EMAIL_USER}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Nueva Cuenta ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Se acaba de dar de alta su cuenta, con la siguiente contraseña podra entrar SOLO UNA VEZ!!! Luego podra ingresar la contraseña que quiera! CONTRASEÑA: ${password}</b>
    `, // html body
  });

  return { msg: "Técnico creado con éxitos!" };
};

const technicalBusiness = async (idBusiness, email) => {
  const isTechnical = await Technical.findOne({ email });

  const business = await Business.findOne({_id:idBusiness})
  let technicals = business.technicals
  technicals.push(isTechnical) 
  const updateBusiness = await Business.findByIdAndUpdate(
    idBusiness,
    { technicals },
    { new: true }
  );

  return { msg: "Successfully" };
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
  createTechnical,
};
