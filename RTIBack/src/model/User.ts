import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const UserModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["admin", "zaposlen", "student"]
    },
    firstLogin: {
        type: String,
        required: true,
        enum: ["yes", "no"],
        default: "yes"
    }
});

const EmployeeModel = new Schema({
    profilePicture: {
        type: {},
        required: false
    },
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    webpage: {
        type: String,
        required: false
    },
    personalInfo: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true,
        enum: ["redovni profesor", "vanredni profesor", "docent", "asistent", "saradnik u nastavi", "istrazivac", "laboratorijski inzenjer", "laboratorijski tehnicar"]
    },
    roomNumber: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ["aktivan", "neaktivan"]
    },
    type: {
        type: String,
        required: true,
        enum: ["nastavnik", "laborant"]
    }

});

const StudentModel = new Schema({
    username: {
        type: String,
        required: true
    },
    index: {
        type: String,
        required: true
    },
    studyType: {
        type: String,
        required: true,
        enum: ["d", "m", "p"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["aktivan", "neaktivan"]
    },
    subjects: {
        type: [String],
        required: false
    }
});

const User = mongoose.model("User", UserModel, "User");
const Employee = mongoose.model("Employee", EmployeeModel, "Employee");
const Student = mongoose.model("Student", StudentModel, "Student");

export {User, Employee, Student}