const express = require('express');
const app = express();
const userRoute = require('./routes/userRoutes');
const noteRoute = require('./routes/noteRoutes');
const mongoose =  require("mongoose");
app.use(express.json());



app.use("/users",userRoute);
app.use("/notes",noteRoute);


app.get("/", (req , res) => {
res.send("Hello.....");
});

mongoose.connect("mongodb+srv://admin:admin@cluster0.ekuihgk.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    app.listen(3000,()=>{
        console.log('Server start on port 3000');
        })
}).catch((error)=>{ 
console.log(">>>>>>> error"+error);
})
