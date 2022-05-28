const { Router } = require("express");
const router = Router();


const Technical = require("../schemas/Technical");

router.get("/allTechnicals", async (req, res) => {
  try {
    const allBusiness = await Technical.find({});
    res.status(200).send(allBusiness);
  } catch (e) {
    console.log("Error on allTechnical:", e);
    res.status(404).send(e);
  }
});

module.exports = router