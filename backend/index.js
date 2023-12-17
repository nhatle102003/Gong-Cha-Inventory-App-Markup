import express from "express";
import {PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import { Inventory } from "./models/inventoryModels.js";
import itemsRoute from "./routes/itemsRoute.js";
const app = express();

//Middleway to parsing request body
app.use(express.json())

app.get("/", (request, reponse) => {
    console.log(request)
    return reponse.status(234).send("Welcome to Gong Cha POS")
});

//middele way to use all route method
app.use("/items", itemsRoute)

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

