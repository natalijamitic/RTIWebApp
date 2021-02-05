import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EndProjectModel = new Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    purpose: {
        type: String
    }
});

export default mongoose.model("EndProject", EndProjectModel, "EndProject" )