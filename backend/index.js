import express from "express";
import {PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import { Inventory } from "./models/inventoryModels.js";

const app = express();

//Middleway to parsing request body
app.use(express.json())

app.get("/", (request, reponse) => {
    console.log(request)
    return reponse.status(234).send("Welcome to Gong Cha POS")
});

//Route for Saving a new item
app.post('/items', async (request, reponse) => {
    try{
        if(!request.body.name || !request.body.quantity || !request.body.metrics){
            return reponse.status(400).send({
                message: "Send all required fields"
            })
        }
        const newItem = {
            name: request.body.name,
            quantity: request.body.quantity,
            metrics: request.body.metrics
        }

        const item = await Inventory.create(newItem);
        return reponse.status(200).send(item);
    }catch(error){      
        console.log(error.message)
        reponse.status(500).send({message: error.message})
    }
})


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        app.listen(PORT, () => {
            console.log('App connected to database');
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })

