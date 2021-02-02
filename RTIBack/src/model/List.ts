import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ListModel = new Schema({
    code: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: false
    },
    title: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    limit: {
        type: Number,
        required: true,
    },
    valid: {
        type: Boolean,
        required: true,
        default: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    files: {
        type: [{
            student: {
                type: String
            },
            file: {
                type: String,
                required: false
            }
        }],
        required: true,
        default: []
    }
});


export default mongoose.model('List', ListModel, 'List');

