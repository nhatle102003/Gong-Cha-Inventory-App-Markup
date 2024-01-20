import express from "express";
import {PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import { Inventory } from "./models/inventoryModels.js";
import itemsRoute from "./routes/itemsRoute.js";
import cors from 'cors';

const origin = 'http://127.0.0.1:5173'
const app = express();

//Middleway to parsing request body
app.use(express.json())


//middleway to handle CORs policy 
//only custom origins
app.use(
    cors({
        origin: origin,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)

app.get("/", (request, reponse) => {
    console.log(request)
    return reponse.status(234).send("Welcome to Gong Cha POS")
});

//middele way to use all route method
app.use("/items", itemsRoute)

app.use('/frontend/uploads', express.static('uploads'))

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

