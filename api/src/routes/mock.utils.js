const { Router } = require("express");
const business = require('../Mock/Business.mock.json')
const departament = require('../Mock/Departament.mock.json');
const Business = require("../schemas/Business");
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


router.get('/user', async (req, res)=> {
    
})

module.exports = router;
