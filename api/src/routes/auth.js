const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE_TIME } = process.env;

const { createUser, findAll, findUser, newPasswordUser } = require("../utils/utils.auth");

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    if (newUser.error) res.status(404).send(newUser);
    else res.status(200).send({ msg: "User creado con éxitos!" });
  } catch (e) {
    console.log("Error on signup:", e);
    res.status(404).send({ error: "Error on the user register" });
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
      return res.status(404).send({ error: userAuth.error, success: false });

    const token = jwt.sign({ user: userAuth }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE_TIME,
    });

    userAuth.token = token
    res.status(200).send({ user: userAuth, success: true, token });
  } catch (e) {
    console.log("Error on login:", e);
    res.status(404).send(e);
  }
});

router.put("/password", async (req, res) => {
  try {
    console.log(req.body)
    const newPass = await newPasswordUser(req.body);
    if (newPass.error) res.status(500).send(newPass);
    else res.status(200).send({ newPass: false });
  } catch (e) {
    console.log("Error al crear la nueva contraseña", e);
    res.status(500).send({ error: "Error al crear la contraseña" });
  }
});

module.exports = router;
