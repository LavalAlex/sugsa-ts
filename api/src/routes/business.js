const { Router } = require("express");
const router = Router();

const Business = require("../schemas/Business");

router.get("/allBusiness", async (req, res) => {
  try {
    const allBusiness = await Business.find({});
    res.status(200).send(allBusiness);
  } catch (e) {
    console.log("Error on allbusiness:", e);
    res.status(404).send(e);
  }
});

router.post("/departament", async (req, res) => {
  try {
    const { name } = req.body;
    const {departament} = await Business.findOne({ name });
    res.status(200).send(departament);
  } catch (e) {
    console.log("Error on departament:", e);
    res.status(404).send(e);
  }
});



module.exports = router;