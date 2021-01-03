import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const NotificationsTypeModel = new Schema({
    typeName:{
        type: String,
        required: true
    }
});

const NotificationModel = new Schema({
    title : {
        type: String,
        required: true
    },
    content :{
        type: String,
        required: true
    },
    dateCreation:{
        type: Date,
        required: true,
        default: Date.now()
    },
    type:{
        type: NotificationsTypeModel,
        required: true
    }
});

const Notification = mongoose.model("Notification", NotificationModel, "Notification");
const NotificatonType = mongoose.model("NotificationType", NotificationsTypeModel, "NotificationType");

export {Notification, NotificatonType}

