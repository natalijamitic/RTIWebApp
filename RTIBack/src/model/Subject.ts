import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const SubjectModel = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["izborni", "obavezni"]
    },
    semestar: {
        type: Number,
        required: true,
    },
    subjectCode: {
        type: String,
        required: true
    },
    weekly: {
        type: {
            lectures:{
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
    ESPB: {
        type: Number,
        required: true
    },
    classTime: {
        type: [String],
        require: true
    },
    propositions: {
        type: String, 
        require: true
    },
    subjectGoal: {
        type: String, 
        require: true
    },
    examMaterials: {
        type: {
            examExamples: {
                type: [String], 
                require: true
            },
            examSolutions: {
                type: [String], 
                require: true
            },
            isExamExamplesHidden: {
                type: Boolean, 
                require: true, 
                default: false
            }
        }, 
        require: true
    },
    lectures: {
        type: [String], 
        require: true
    },
    exercises: {
        type: [String], 
        require: true
    },
    haveLab: {
        type: Boolean, 
        require: true
    },
    lab: {
        type: {
            isHidden: {
                type: Boolean, 
                require: true
            },
            numberOfLabs: {
                type: Number, 
                require: true
            },
            labs: {
                type: [{
                    basicInfo: {
                        type: String, 
                        require: true
                    },
                    instructions: {
                        type: String, 
                        require: true
                    },

                    labsDescription: {
                        type: String, 
                        require: true
                    },
                    labMaterials: {
                        type: Array, 
                        require: true
                    }
                }],
            }
        }
    },
    project: {
        type: {
            isHidden: {
                type: Boolean, 
                require: true
            },
            projects: {
                type: [{
                    basicInfo: {
                        type: String, 
                        require: true
                    },
                    examinationProcess: {
                        type: String, 
                        require: true
                    },
                    projectMaterials: {
                        type: String, 
                        require: true
                    }
                }]
            }, 
            require:true
        }
    },
    notifications: {
        type: [{
            title: {
                type: String
            },
            dateCreation: {
                type: Date
            },
            content: {
                type: String
            }
        }]
    }
}
);


export default mongoose.model('Subject', SubjectModel, 'Subject');

