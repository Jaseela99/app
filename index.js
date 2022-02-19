const express =require("express")

const app = express()

const PORT =process.env.PORT||9000;

app.listen(PORT,()=>console.log('server is live on port 9000'))




