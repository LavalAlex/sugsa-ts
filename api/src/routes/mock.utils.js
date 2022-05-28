const { Router } = require("express");
const business = require('../Mock/Business.mock.json')
const departament = require('../Mock/Departament.mock.json');
const Business = require("../schemas/Business");
const technicals = require("../Mock/Technical.mock.json"); 
const Technical = require("../schemas/Technical");
const router = Router();


router.get('/business', async (req, res) => {
    for(var i =0; i<business.length; i++){
        const index = Math.floor(Math.random()*10)
        var arr =[]
        for(var j=0; j<= index; j++){
            arr.push(departament[j].name)
        }
        const newBusiness = await Business.create({
            name: business[i].business,
            departament: arr,
        })
    }


    res.status(200).send('ready')
})


router.get('/technical', async (req, res)=> {
    for(var i=0; i<technicals.length; i++){
        const newTechnical = await Technical.create({
            name: technicals[i].name,
            last_name: technicals[i].last_name,
            email: technicals[i].email,
        })
    }

    res.status(200).send('ready')
})



module.exports = router;
