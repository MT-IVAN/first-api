const express = require("express"); // module , files
const bikers = require("./database");
const bodyParser = require("body-parser");
const app = express(); // incializas express. servidor ya esta listo.

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // entender el json dentro del body que viene en request

//listar bikers

app.get("/bikers", (req, res)=>{
    return res.status(200).send(bikers);
});
//agregar un biker
app.post("/bikers", (req, res)=>{
    const newBiker = req.body;
    if(newBiker?.name){
        if(bikers.find((biker) => biker.name === newBiker.name)){
            return res.status(409).send({"error": "biker already exists"});
        }else{
            bikers.push(newBiker);
            return res.status(201).send(bikers);
        }
    }
    return res.status(401).send({"error": "property name is required"});

    
});


// modificar su moto

// eliminar un biker



app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})









