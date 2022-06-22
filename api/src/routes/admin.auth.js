const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE_TIME, JWT_COOKIE_EXPIRE } = process.env;

const {
  createAdmin,
  findAll,
  findAdmin,
  newPassword,
  createUserAdmin,
} = require("../utils/utils.authAdmin");

const router = Router();

const transporter = require("../Conf/Mailer");

router.get("/signup", async (req, res) => {
  try {
   const newAdmin = await createAdmin();
    if (newAdmin.error) res.status(404).send(newAdmin);
    else res.status(200).send(newAdmin);
  } catch (e) {
    console.log("Error al crear cuenta de admin:", e);
    res.status(404).send({ error: "Error al crear cuenta de admin" });
  }
});

router.get("/allUser", async (req, res) => {
  try {
    const allAdmin = await findAll();
    if (allAdmin.error) res.status(404).send(allAdmin.error);
    else res.status(200).send(allAdmin);
  } catch (e) {
    console.log("Error on alluser:", e);
    res.status(404).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const adminAuth = await findAdmin(email, password);

    if (!adminAuth || adminAuth.error) return res.status(404).send(adminAuth);
    else {
      const token = jwt.sign({ user: adminAuth }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE_TIME,
      });
      adminAuth.token = token;
      res.status(200).send({ user: adminAuth, success: true });
    }
  } catch (e) {
    console.log("Error on login:", e);
    res.status(404).send({ error: "Error al logearse, intentelo más tarde" });
  }
});

router.put("/password", async (req, res) => {
  try {
    const newPass = await newPassword(req.body);
    if (newPass.error) res.status(500).send(newPass);
    else res.status(200).send({ newPass: false });
  } catch (e) {
    console.log("Error al crear la nueva contraseña", e);
    res.status(500).send({ error: "Error al crear la contraseña" });
  }
});

router.post("/userCreate", async (req, res) => {
  try {
    const newUser = await createUserAdmin(req.body);
    if (newUser.error) res.status(500).send(newUser);
    else res.status(200).send({ msg: "Usuario creado con éxitos!" });
  } catch (e) {
    console.log("Error al crear nuevo usuario", e);
    res.status(500).send({ error: "Error al crear nuevo usuario" });
  }
});

module.exports = router;
