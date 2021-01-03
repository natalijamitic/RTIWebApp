import { Mongoose } from "mongoose"
import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const OfferedProjectModel = new Schema({
    title:{
        type: String
    }, 
    purpose: {
        type: String
    }, 
    description:{
        type: String
    }
});

export default mongoose.model("OfferedProjectModel", OfferedProjectModel, "Offered" )