import {Notification, NotificationType} from '../model/Notification'

export function getRecentNotifications() {
    let filterDate = new Date(Date.now())
    filterDate.setMonth(filterDate.getMonth() - 3);

    return Notification.find({
        dateCreation: {
            $gt: filterDate
        }
    }).then((result: any) => result);
}

export function getAllNotifications() {
    return Notification.find({}).then((result: any) => result);
}

export function getNotificationTypes() {
    return NotificationType.find({}).then((result: any) => result);
}

export function getNotificationType(type: string) {
    return NotificationType.find({name: type}).then((result: any) => result);
}


export async function insertNotification(notif: any) {
    let T = await getNotificationType(notif.type);
    notif.type = T[0];
    if (!notif.dateCreation) {
        notif.dateCreation = Date.now();
    }
    let N = new Notification(notif);
    return N.save().then((n: any) => n);
}

export function deleteNotification(date: any) {
    return Notification.deleteOne({dateCreation: date}).then((n: any) => n);
}

export async function insertNotificationType(newType: string) {
    let type = new NotificationType({name: newType});
    return type.save().then((t: any) => t);
}

export async function deleteNotificationType(type: string) {
    let T = await getNotificationType(type);
    await  Notification.deleteMany({type: T[0]}).then((r: any) => r);
    return NotificationType.deleteOne({name: type}).then((r: any) => r)
}

export function updateNotificationType(oldType: string, newType: string) {
    return NotificationType.findOneAndUpdate({name: oldType}, {name: newType}).then((r: any) => r);
}

export async function updateNotificationTypes(oldType: string, newType: string) {
    let oldT = await getNotificationType(oldType);
    await updateNotificationType(oldType, newType);
    let newT = await getNotificationType(newType);

    return Notification.updateMany({type: oldT}, {type: newT[0]}).then((r: any)=> r);
}