import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const AssignmentModel = new Schema({
    employees: {
        type: [String],
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    group: {
        type: {
            name: {
                type: String,
                required: true
            },
            employees: {
                type: [String],
                required: true
            }
        },
        required: true
    }
});

const Assignment = mongoose.model("Assignment", AssignmentModel, "Assignment");

export {Assignment}