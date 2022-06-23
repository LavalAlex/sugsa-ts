const { Router } = require("express");
const router = Router();

const Business = require("../schemas/Business");
const {
  createBusines,
  deleteDepartament,
  findTechnicals,
  technicalAssigned,
  deleteTechnical,
  findAllBusiness,
  addDepartament,
} = require("../utils/utils.business");

router.get("/allBusiness", async (req, res) => {
  try {
    const allBusiness = await Business.find({});
    if (!allBusiness)
      res.status(500).send({ error: "No hay empresas cargadas" });
    res.status(200).send(allBusiness);
  } catch (e) {
    console.log(newTicket);
    "Error al buscar todas las empresas registradas: ", e;
    res.status(404).send({ error: "Error al buscar las empresas registradas" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const newBusiness = await createBusines(req.body);
    if (newBusiness.error) {
      res.status(500).send(newBusiness);
    } else {
      res.status(200).send({ msg: "Empresa creada con éxitos" });
    }
  } catch (e) {
    console.log("Error al crear una empresa: ", e);
    res.status(500).send({ error: "Error al crear la empresa" });
  }
});

router.post("/departament", async (req, res) => {
  try {
    const { name } = req.body;
    const business = await Business.findOne({ name });
    res.status(200).send(business.departament);
  } catch (e) {
    console.log("Error al buscar departamento de una empresa: ", e);
    res
      .status(404)
      .send({ error: "Error al buscar departamento de una empresa" });
  }
});

router.put("/deleteDepartament", async (req, res) => {
  try {
    const updateBusiness = await deleteDepartament(req.body);
    if (updateBusiness.error) {
      res.status(500).send(updateBusiness);
    } else res.status(200).send(updateBusiness);
  } catch (e) {
    console.log("Error al eliminar una categoria de una empresa: ", e);
    res
      .status(404)
      .send({ error: "Error al eliminar una categoria de una empresa" });
  }
});

router.get("/technical/:id", async (req, res) => {
  try {
    const technicals = await findTechnicals(req.params.id);
    if (technicals.error) res.status(500).send(technicals);
    else res.status(200).send(technicals);
  } catch (e) {
    console.log("Error al buscar técnicos de una empresa: ", e);
    res.status(404).send({ error: "Error al buscar técnicos de una empresa" });
  }
});

router.put("/technicalAssigned", async (req, res) => {
  try {
    const technAssign = await technicalAssigned(req.body);
    if (technAssign.error) res.status(500).send(technAssign);
    else res.status(200).send(technAssign);
  } catch (e) {
    console.log("Error al asignar técnico a la empresa: ", e);
    res.status(404).send({ error: "Error al asignar técnico a la empresa" });
  }
});

router.put("/deleteTechnical", async (req, res) => {
  try {
    const technAssign = await deleteTechnical(req.body);
    if (technAssign.error) res.status(500).send(technAssign);
    else res.status(200).send(technAssign);
  } catch (e) {
    console.log("Error al eliminar técnico de la empresa: ", e);
    res.status(404).send({ error: "Error al eleminar técnico de la empresa" });
  }
});

router.get("/allUser/:name", async (req, res) => {
  try {
    const users = await findAllBusiness(req.params.name);
    if (users.error) res.status(404).send(users);
    else {
      res.status(200).send(users);
    }
  } catch (e) {
    console.log("Error al buscar todos los usuarios de una empresa: ", e);
    res
      .status(404)
      .send({ error: "Error al buscar todos los usuarios de una empresa" });
  }
});

router.put("/addDepartament", async(req, res)=>{
  try {
    const users = await addDepartament(req.body);
    if (users.error) res.status(404).send(users);
    else {
      res.status(200).send(users);
    }
  } catch (e) {
    console.log("Error al agregar departamento a la empresa: ", e);
    res
      .status(404)
      .send({ error: "Error al agregar departamento a la empresa" });
  }
})

module.exports = router;
