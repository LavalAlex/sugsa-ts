const { Router } = require("express");
const router = Router();

const Technical = require("../schemas/Technical");
const { createTechnical } = require("../utils/utils.technical");

router.get("/allTechnicals", async (req, res) => {
  try {
    const allBusiness = await Technical.find({});
    res.status(200).send(allBusiness);
  } catch (e) {
    console.log("Error on allTechnical:", e);
    res.status(404).send(e);
  }
});

router.post("/create", async (req, res) => {
  try {

    const newTechnical = await createTechnical(req.body)

    if(newTechnical.error) res.status(500).send(newTechnical)
    res.status(200).send({msg: "Técnico creado con éxito"})

  } catch (e) {
    console.log("Error al crear técnico",e)
    res.satus(500).send({error: "Error al crear Técnico!"})
  }
});

module.exports = router;
