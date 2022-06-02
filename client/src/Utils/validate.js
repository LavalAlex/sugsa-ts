const validateNewPassword = ({ password }) => {
  if (!password) return { error: "Error, You must provider a password" };
  if (password.length < 6)
    return {
      error: "Error, The password must be at least 6 characters",
    };
  return {};
};

const validateLogin = ({ email, password }) => {
  if (!email) return { email: "Error, You must provider an email" };
  if (email) {
    const validate = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!validate) {
      return { email: "Error, Is not an email" };
    }
  }

  if (!password) return { password: "Error, You must provider a password" };
  if (password.length < 6)
    return {
      password: "Error, The password must be at least 6 characters",
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
  if (!name) return { name: "Error, You must provider a name" };
  if (name.length < 3)
    return {
      password: "Error, The name must be at least 6 characters",
    };
  if (!last_name) {
    return { last_name: "Error, You must provider a last last name" };
  }
  if (last_name.length < 3)
    return {
      password: "Error, The last_name must be at least 6 characters",
    };
  if (!business) return { business: "Error, You must provider an business" };
  if (!departament)
    return { departament: "Error, You must provider an departament" };
  if (!email) return { email: "Error, You must provider an email" };
  if (email) {
    const validate = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!validate) {
      return { email: "Error, Is not an email" };
    }
  }

  if (!password) return { password: "Error, You must provider a password" };
  if (password.length < 6)
    return {
      password: "Error, The password must be at least 6 characters",
    };

  return {};
};
module.exports = {
  validateNewPassword,
  validateLogin,
  validateSignup,
};
