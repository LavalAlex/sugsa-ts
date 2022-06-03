const { Router } = require("express");
const business = require('../Mock/Business.mock.json')
const departament = require('../Mock/Departament.mock.json');
const Business = require("../schemas/Business");
const technicals = require("../Mock/Technical.mock.json"); 
const Technical = require("../schemas/Technical");
const router = Router();

const user = require('../Mock/User.mock.json');
const User = require("../schemas/User");

router.get('/business', async (req, res) => {
    for(var i =0; i<business.length; i++){
        const index = Math.floor(Math.random()*10)
        var arr =[]
        var tech = []
        for(var j=0; j<= index; j++){
            arr.push(departament[j].name)
            tech.push(technicals[j])
        }
        const newBusiness = await Business.create({
            name: business[i].business,
            departament: arr,
            technicals: tech
            
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

router.get('/user', async (req, res) => {
    const business = await Business.find({})
    for(var i = 0; i<user.length; i++){
        const index = Math.floor(Math.random()*10)
        var j =business[index].departament.length < index? business[index].departament.length-1: index
        
        let newUser = new User({
            name:user[i].first_name.toLowerCase(),
            last_name:user[i].last_name.toLowerCase(),
            email:user[i].email,
            password:user[i].password,
            business:business[index].name,
            departament:business[index].departament[j],
          });
          newUser.save();
    }
    res.status(200).send({msg:"Creted successfully"})
})


module.exports = router;
