const validateNewPassword = ({ password }) => {
  if (!password) return { error: "Error, You must provider a password" };
  if (password.length < 6)
    return {
      error: "Error, The password must be at least 6 characters",
    };
  return {};
};

const validateLogin = ({ email, password }) => {
  if (!email) return { email: "Error, Debe poner un email" };
  if (email) {
    const validate = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!validate) {
      return { email: "Error, Esto no es un email" };
    }
  }

  if (!password) return { password: "Error, Debe proporcionar una contraseña" };
  if (password.length < 6)
    return {
      password: "Error, La contraseña debe ser mayor a 6 carácteres",
    };
  return {};
};

const validateSignup = ({
  name,
  email,
  password,
  business,
  departament,
  last_name,
}) => {
  var regName = / ^ [a-zA-Z] + [a-zA-Z] + $ / ;
  // console.log(name)
  // console.log(regName.test (name))
  // if (!regName.test(name)) {
  //   return {
  //     name: "El Nombre debe tener solo letras [a-z]",
  //   };
  // }
  if (!name) return { name: "Error, Debe proporcionar un Nombre" };
  if (name.length < 3)
    return {
      name: "Error, El Nombre debe ser mayor a 3 caracteres",
    };
  // if (!regName.test(last_name)) {
  //   return {
  //     last_name: "El Apellido debe tener solo letras [a-z]",
  //   };
  // }
  if (!last_name) {
    return { last_name: "Error ,Debe proporcionar un Apellido" };
  }
  if (last_name.length < 3)
    return {
      last_name: "El Apellido debe ser mayor a 3 caracteres ",
    };
  if (!business) return { business: "Error, Debe seleccionar una Empresa" };
  if (!departament)
    return { departament: "Error, Debe seleccionar un Departamento" };
  if (!email) return { email: "Error, Debe proporcionar un email" };
  if (email) {
    const validate = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!validate) {
      return { email: "Error, Is not an email" };
    }
  }

  if (!password) return { password: "Debe proporcionar una contraseña" };
  if (password.length < 6)
    return {
      password: "La contraseña debe tener mas de 6 caracteres",
    };

  return {};
};
module.exports = {
  validateNewPassword,
  validateLogin,
  validateSignup,
};
