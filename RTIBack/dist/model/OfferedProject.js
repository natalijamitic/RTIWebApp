"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const EndProjectModel = new Schema({
    title: {
        type: String
    },
    purpose: {
        type: String
    },
    description: {
        type: String
    }
});
exports.default = mongoose_1.default.model("EndProject", EndProjectModel, "EndProject");
//# sourceMappingURL=OfferedProject.js.map