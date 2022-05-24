const bcrypt = require("bcrypt");
const saltRounds = 10;

//Schemas
const User = require("../schemas/User");
const Ticket = require("../schemas/Ticket");
const { now } = require("mongoose");

const createUser = async (name, email, password, business) => {
  password = bcrypt.hashSync(password, saltRounds);
  const user = await User.findOne({ email });
  if (user) return { error: "Error, this user does exits" };
  let newUser = new User({
    name,
    email,
    password,
    business,
  });
  newUser.save();
  return { msg: "Create Successfully" };
};

const findAll = async () => {
  var userAll = await User.find({});
  if (!userAll) return { error: `Error, no users information` };
  const users = userAll.map((e) => {
    return { email: e.email, name: e.name, business: e.business, id: e._id };
  });
  return users;
};

const findUser = async (email, password) => {
  const userAuth = await User.findOne({ email });
  if (!userAuth) return { error: "Error, this user does not exist" };
  const validate = await bcrypt.compare(password, userAuth.password);
  if (!validate) return { error: "Error, this user does not exist" };
  return { id: userAuth._id, email: userAuth.email, name: userAuth };
};

module.exports = { createUser, findAll, findUser };
