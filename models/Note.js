import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    name: {
        type: String,
    },
    fromCity: {
        type: String,
    },
    toCity: {
        type: String,
    },
    date: {
        type: String,
    },
    loadInfo: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})


mongoose.models = {}
module.exports = mongoose.model("Note",noteSchema);