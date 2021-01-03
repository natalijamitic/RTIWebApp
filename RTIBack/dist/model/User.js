"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.Employee = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
        type: Number,
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
});
const User = mongoose_1.default.model("User", UserModel, "User");
exports.User = User;
const Employee = mongoose_1.default.model("Employee", EmployeeModel, "Employee");
exports.Employee = Employee;
const Student = mongoose_1.default.model("Student", StudentModel, "Student");
exports.Student = Student;
//# sourceMappingURL=User.js.map