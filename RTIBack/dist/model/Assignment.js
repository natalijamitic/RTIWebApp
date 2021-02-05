"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
const Assignment = mongoose_1.default.model("Assignment", AssignmentModel, "Assignment");
exports.Assignment = Assignment;
//# sourceMappingURL=Assignment.js.map