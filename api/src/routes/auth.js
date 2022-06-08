const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE_TIME, JWT_COOKIE_EXPIRE } = process.env;

const { createUser, findAll, findUser } = require("../utils/utils.auth");

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    if (newUser.error) res.status(404).send(newUser);
    else res.status(200).send({msg:"User creado con éxitos!"});
  } catch (e) {
    console.log("Error on signup:", e);
    res.status(404).send({error:"Error on the user register"});
  }
});

router.get("/allUser", async (req, res) => {
  try {
    const allUser = await findAll();
    if (allUser.error) res.status(404).send(allUser.error);
    else res.status(200).send(allUser);
  } catch (e) {
    console.log("Error on alluser:", e);
    res.status(404).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const userAuth = await findUser(email, password);

    if (!userAuth || userAuth.error)
      return res.status(404).send({error:userAuth.error, success: false });

    const id = userAuth.id;
    const token = jwt.sign({ id: id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE_TIME,
    });
    const cookiesOptions = {
      expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 3600 * 1000),
      httponly: true,
      Secure: true,
    };

    res.cookie("sugsa", token, cookiesOptions);
    res.status(200).send({ user: userAuth, success: true });
  } catch (e) {
    console.log("Error on login:", e);
    res.status(404).send(e);
  }
});

module.exports = router;
