import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const SubjectModel = new Schema({
    code: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ['si', 'rti', 'ostali', 'master']
    },
    type: {
        type: String,
        required: true,
        enum: ["izborni", "obavezni"]
    },
    semestar: {
        type: Number,
        required: true,
    },
    espb: {
        type: Number,
        required: true
    },
    propositions: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false,
        default: ''
    },
    goal: {
        type: String,
        required: true
    },
    classTime: {
        type: [String],
        required: true
    },
    excerTime: {
        type: [String],
        required: true
    },
    timetable: {
        type: {
            lecture: {
                type: Number,
                required: true
            },
            exercise: {
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
    lectures: {
        type: [String],
        required: false
    },
    exercises: {
        type: [String],
        required: false
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
            },
            creator: {
                type: String,
                required: true
            },
            files: {
                type: [String],
                required: false
            }
        }],
        required: false
    },
    examMaterials: {
        type: {
            examples: {
                type: [String],
                required: false
            },
            solutions: {
                type: [String],
                required: false
            },
            isHidden: {
                type: Boolean,
                required: true,
            }
        },
        required: true,
        default: {
            isHidden: false,
            examples: [],
            solutions: []
        }
    },
    bLab: {
        type: Boolean,
        required: true,
        default: false
    },
    lab: {
        type: {
            isHidden: {
                type: Boolean,
                required: true
            },
            basicInfo: {
                type: String,
                required: false
            },
            numberOfLabs: {
                type: Number,
                required: true,
                default: 0
            },
            labs: {
                type: [{
                    labDescription: {
                        type: String,
                        required: true
                    },
                    labMaterials: {
                        type: [String],
                        required: true,
                        default: []
                    }
                }],
                required: true,
                default: {
                    labDescription: '',
                    labMaterials: new Array()
                }
            }
        },
        required: true,
        default: {
            isHidden: false,
            numberOfLabs: 0,
            labs: []
        }
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
                        type: [String],
                        required: false
                    }
                }],
                required: true,
                default: {
                    basicInfo: '',
                    examinationProcess: '',
                    projectMaterials: new Array()
                }
            }
        },
        required: true,
        default: {
            isHidden: false,
            projects: []
        }
    }
}
);


export default mongoose.model('Subject', SubjectModel, 'Subject');

