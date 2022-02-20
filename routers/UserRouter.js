const userCtrl = require("../controllers/userCtrl")

const router =(app)=>{
    app.post("/user",userCtrl.register)
    app.get("/user",userCtrl.getAllUsers)
}


module.exports =router