import mongoose, { mongo } from 'mongoose';


const Schema = mongoose.Schema;


const DoneProjectModel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    members: {
        type: [String],
        required: true
    }
});


export default mongoose.model("DoneProject", DoneProjectModel, "DoneProject");