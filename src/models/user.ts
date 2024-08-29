import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4()
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

export default mongoose.model("users", userSchema);