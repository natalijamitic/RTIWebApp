"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    espb: {
        type: Number,
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
            }
        },
        required: true,
        default: {
            isExamExamplesHidden: false,
            examExamples: [],
            examSolutions: []
        }
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
        required: true,
        default: false
    },
    lab: {
        type: {
            isHidden: {
                type: Boolean,
                required: true
            },
            numberOfLabs: {
                type: Number,
                required: true,
                default: 0
            },
            basicInfo: {
                type: String,
                required: false
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
    comment: {
        type: String,
        required: false,
        default: ''
    }
});
exports.default = mongoose_1.default.model('Subject', SubjectModel, 'Subject');
//# sourceMappingURL=Subject.js.map