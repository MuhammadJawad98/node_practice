const express = require('express');
const noteRoute = express();

noteRoute.get('/',(req,res)=>{
res.status(200).send("note get request");
});


noteRoute.post('/',(req,res)=>{
    res.status(200).send("note post request");
});

module.exports = noteRoute;