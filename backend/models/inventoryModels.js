import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        quantity: {
            type: String,
            required: true
        },
        metrics: {
            type: String,
            required: true
        },
        image: {
            type: String
        }
        
        //TODO - figured out the criteria for inventory
        //need to figure out do we really need to upload image
    },
    {
        timestamps: true
    }

)

export const Inventory = mongoose.model('Inventory', inventorySchema)