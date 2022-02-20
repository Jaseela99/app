const userCtrl = require("../controllers/userCtrl")

const router =(app)=>{
    app.post("/user",userCtrl.register)
    app.get("/user",userCtrl.getAllUsers)
    app.get("/user/:id",userCtrl.getUserById)
    app.delete("/user/:id",userCtrl.deleteUserById)
}


module.exports =router