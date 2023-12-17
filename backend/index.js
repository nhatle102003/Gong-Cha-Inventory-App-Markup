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

//Get method to get ALL items from database 

app.get('/items', async (req, res) => {
    try{
        const items = await Inventory.find({})
        return res.status(200).json({
            total: items.length,
            data: items
        })
    }catch(error){
        console.log(error.message)
        reponse.status(500).send({message: error.message})
    }
})

//Get method to get ONE items from database by ID

app.get('/items/:id', async (req, res) => {
    try{
        const {id} = req.params
        const item = await Inventory.findById(id)

        return res.status(200).json({
            item
        })
    }catch(error){
        console.log(error.message)
        reponse.status(500).send({message: error.message})
    }
})

//Route to find a item with a unique id and update the item

app.put('/items/:id', async (req, res) => {
    try{
        if(!req.body.name || !req.body.quantity || !req.body.metrics){
            return reponse.status(400).send({
                message: "Send all required fields"
            })
        }
        const {id} = req.params
        const result = await Inventory.findByIdAndUpdate(id, req.body)

        if (!result){
            return res.status(404).json({message: 'Item not found'})
        }
        return res.status(200).send({message: 'Item updated'})
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }

})

//route for deleting an item 
app.delete('/items/:id', async (req, res) => {
    try{
        const {id} = req.params
        const result = await Inventory.findByIdAndDelete(id)

        if (!result){
            return res.status(404).json({message: 'Item not found'})
        }
        return res.status(200).send({message: 'Item deleted'})
        
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
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

