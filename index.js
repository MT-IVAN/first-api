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
app.put("/bikers/:dang?", (req, res)=>{
    const newBiker = req.body;
    console.log(req.params);
    if(newBiker.name && newBiker.bike){
        const index = bikers.findIndex( biker => biker.name === newBiker.name)
        if (index >= 0){
            bikers[index].bike = newBiker.bike;
            return res.status(201).send(bikers);
        }else{
            return res.status(404).send(bikers);
        }
    }
})
// eliminar un biker
app.delete("/bikers", (req, res) => {
    const newBiker = req.body;
    if(newBiker.name){
        const index = bikers.findIndex( biker => biker.name === newBiker.name)
        if (index >= 0){
            bikers.splice(index,1);
            return res.status(201).send(bikers);
        }else{
            return res.status(404).send(bikers);
        }
    }
})


app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})









