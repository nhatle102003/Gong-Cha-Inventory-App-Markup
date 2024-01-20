import  express  from "express";
import multer from 'multer'
import fs from 'fs-extra'
import { Inventory } from "../models/inventoryModels.js";

const tempDir = '../frontend/uploads'
const router = express.Router();
fs.ensureDirSync(tempDir)

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, "/uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({storage: storage})

//Route for Saving a new item
router.post('/', upload.single('itemImage') ,async (request, reponse) => {
    console.log(request.file)
    try{
        let imageLink 
        if(!request.body.name || !request.body.quantity || !request.body.metrics){
            return reponse.status(400).send({
                message: "Send all required fields"
            })
        }
        
        if(request.file){
            imageLink = request.file.path
        }else{
            imageLink = ""
        }
        const newItem = {
            name: request.body.name,
            quantity: request.body.quantity,
            metrics: request.body.metrics,
            image: imageLink
        }

        const item = await Inventory.create(newItem);
        return reponse.status(200).send(item);
    }catch(error){      
        console.log(error.message)
        reponse.status(500).send({message: error.message})
    }
})

//Get method to get ALL items from database 

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

export default router