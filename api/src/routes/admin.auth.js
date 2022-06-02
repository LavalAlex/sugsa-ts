const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE_TIME, JWT_COOKIE_EXPIRE } = process.env;

const { createAdmin, findAll, findAdmin,  } = require("../utils/utils.authAdmin");

const router = Router();


const transporter = require('../Conf/Mailer')

router.post("/signup", async (req, res) => {
  try {
    var { name, email, password, empresa } = req.body;
    const newAdmin = await createAdmin(name, email, password, empresa);
    if (newAdmin.error) res.status(404).send(newAdmin);
    else res.status(200).send(newAdmin);
  } catch (e) {
    console.log("Error on signup:", e);
    res.status(404).send("Error on the user register");
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
    const { name, password, email } = req.body;
    console.log(req.body)
    const adminAuth = await findAdmin(email, password);
    if (!adminAuth || adminAuth.error) return res.status(404).send(adminAuth);

    const id = adminAuth.id;
    const token = jwt.sign({ id: id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE_TIME,
    });
    const cookiesOptions = {
      expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 3600 * 1000),
      httponly: true,
      Secure: true,
    };

    res.cookie("sugsa", token, cookiesOptions);
    res.status(200).send({ email: email, success: true });
  } catch (e) {
    console.log("Error on login:", e);
    res.status(404).send(e);
  }
});



module.exports = router;
