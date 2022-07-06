const userService = require("../../services/userService");

const createUser = async (req, res)=>{
    console.log(req.body);
    let user = req.body;
    userService.insert(user);
    res.status(201).send(user);
}


const updateUser = async (req, res)=>{
    console.log(req.body);
    let user = req.body;
    userService.updateOne(user);
    res.status(200).send(user);
}

const loginUser = async (req,res)=>{
    console.log(req.body);
    const filter ={
        user:"wehi2728773862376826",
        password:"987247478648746478"
    }
    userService.findOneByParams(filter);
    res.status(200).send(user);
}

const logoutUser = async (req,res)=>{
    
}


module.exports = {
    createUser,
    loginUser,
    logoutUser
}