const { Router } = require("express");
const router = Router();

// const Business = require("../schemas/Business");

const Departament = require("../schemas/Departament");

router.get("/allDepartament", async (req, res) => {
  try {
    const allBusiness = await Departament.find({});
    res.status(200).send(allBusiness);
  } catch (e) {
    console.log("Error al buscar departamentos:", e);
    res.status(404).send(e);
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartament = new Departament({
      name: name.toLowerCase(),
    });
    newDepartament.save()
    res.status(200).send({ msg: "Departamento creado con éxito" });
  } catch (e) {
    console.log("Error en crear departamento:", e);
    res.status(404).send(e);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const updateDep = await Departament.findByIdAndUpdate(
      id,
      { name: update.toLowerCase() },
      { new: true }
    );

    res.status(200).send({ msg: "Departamento actualizado con éxito!" });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error al actualizar departamento");
  }
});

module.exports = router;
