"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificatonType = exports.Notification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const NotificationsTypeModel = new Schema({
    typeName: {
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
    dateCreation: {
        type: Date,
        required: true,
        default: Date.now()
    },
    type: {
        type: NotificationsTypeModel,
        required: true
    }
});
const Notification = mongoose_1.default.model("Notification", NotificationModel, "Notification");
exports.Notification = Notification;
const NotificatonType = mongoose_1.default.model("NotificationType", NotificationsTypeModel, "NotificationType");
exports.NotificatonType = NotificatonType;
//# sourceMappingURL=Notification.js.map