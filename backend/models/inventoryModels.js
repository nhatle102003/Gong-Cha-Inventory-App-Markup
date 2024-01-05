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
        }
        //TODO - figured out the criteria for inventory
    },
    {
        timestamps: true
    }

)

export const Inventory = mongoose.model('Inventory', inventorySchema)