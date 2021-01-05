import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const SubjectModel = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["izborni", "obavezni"]
    },
    department: {
        type: String,
        required: true,
        enum: ['si', 'rti', 'ostali', 'master']
    },
    semestar: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    weekly: {
        type: {
            lecture:{
                type: Number,
                required: true
            },
            exercise:{
                type: Number,
                required: true
            },
            lab: {
                type: Number,
                required: true
            }
        },
        required: true
    },
    espb: {
        type: Number,
        required: true
    },
    classTime: {
        type: [String],
        required: true
    },
    propositions: {
        type: String,
        required: true
    },
    subjectGoal: {
        type: String,
        required: true
    },
    examMaterials: {
        type: {
            examExamples: {
                type: [String],
                required: false
            },
            examSolutions: {
                type: [String],
                required: false
            },
            isExamExamplesHidden: {
                type: Boolean,
                required: true,
                default: false
            }
        },
        required: false
    },
    lectures: {
        type: [String],
        required: false
    },
    exercises: {
        type: [String],
        required: false
    },
    haveLab: {
        type: Boolean,
        required: true
    },
    lab: {
        type: {
            isHidden: {
                type: Boolean,
                required: true
            },
            numberOfLabs: {
                type: Number,
                required: true
            },
            basicInfo: {
                type: String,
                required: true
            },
            labs: {
                type: [{
                    labDescription: {
                        type: String,
                        required: true
                    },
                    labMaterials: {
                        type: Array,
                        required: false
                    }
                }],
                required: true
            }
        },
        required: false
    },
    project: {
        type: {
            isHidden: {
                type: Boolean,
                required: true
            },
            projects: {
                type: [{
                    basicInfo: {
                        type: String,
                        required: true
                    },
                    examinationProcess: {
                        type: String,
                        required: true
                    },
                    projectMaterials: {
                        type: String,
                        required: false
                    }
                }]
            },
            required: false
        }
    },
    notifications: {
        type: [{
            title: {
                type: String,
                required: true
            },
            dateCreation: {
                type: Date,
                required: true,
                default: Date.now()
            },
            content: {
                type: String,
                required: true
            }
        }],
        required: false
    }
}
);


export default mongoose.model('Subject', SubjectModel, 'Subject');

