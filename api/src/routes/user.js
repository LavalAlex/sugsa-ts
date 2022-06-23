const { Router } = require("express");
const User = require("../schemas/User");
const { deleteUser, deleteDepartamentUser, updateUser } = require("../utils/utils.user");
const router = Router();

router.get("/findOne/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) res.status(404).send({ error: "Debe proporcionar un id" });
else{
    const user = await User.findOne({_id:id})
    if(!user) res.status(404).send({error:"No existe user con ese id"})
    else{
        res.status(200).send(user)
    }
}  
} catch (e) {
    console.log("Error al buscar user por id", e);
    res.status(404).send({error:"Error al buscar user por id"});
}
});

router.put("/delete", async (req, res)=>{
    try{
        const user = await deleteUser(req.body)
        if(user.error) res.status(404).send(user)
        else{
            res.status(200).send(user)
        }
    }catch(e){
        console.log("Error al dar de baja el usuario", e);
        res.status(404).send({error:"Error al dar de baja el usuario"});
    }
})

router.put("/departament", async (req, res)=>{
    try{
        const user = await deleteDepartamentUser(req.body)
        if(user.error) res.status(404).send(user)
        else{
            res.status(200).send(user)
        }
    }catch(e){
        console.log("Error al eliminar departamento ususario", e);
        res.status(404).send({error:"Error al departamento ususario"});
    }
})

router.put("/update", async (req, res) =>{
    try{
        console.log(req.body)
        const user = await updateUser(req.body)
        if(user.error) res.status(404).send(user)
        else{
            res.status(200).send(user)
        }
    }catch(e){
        console.log("Error al cambiar nombre y/o apellido del usuario", e);
        res.status(404).send({error:"Error al cambiar nombre y/o apellido del usuario"});
    }
})

module.exports = router;
