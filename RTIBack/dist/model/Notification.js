"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.Notification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const NotificationsTypeModel = new Schema({
    name: {
        type: String,
        required: true
    }
});
const NotificationModel = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: NotificationsTypeModel,
        required: true
    },
    dateCreation: {
        type: Date,
        required: true,
        default: Date.now()
    }
});
const Notification = mongoose_1.default.model("Notification", NotificationModel, "Notification");
exports.Notification = Notification;
const NotificationType = mongoose_1.default.model("NotificationType", NotificationsTypeModel, "NotificationType");
exports.NotificationType = NotificationType;
//# sourceMappingURL=Notification.js.map