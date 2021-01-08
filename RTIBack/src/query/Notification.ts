import {Notification, NotificationType} from '../model/Notification'

export function getRecentNotifications() {
    let filterDate = new Date(Date.now())
    filterDate.setMonth(filterDate.getMonth() - 3);

    return Notification.find({
        dateCreation: {
            $lt: Date.now(),
            $gt: filterDate
        }
    }).then((result: any) => result);
}

export function getNotificationTypes() {
    return NotificationType.find({}).then((result: any) => result);
}

export function getNotificationType(type: string) {
    return NotificationType.find({typeName: type}).then((result: any) => result);
}

export function updateNotificationType(oldType: string, newType: string) {
    console.log(newType);
    return NotificationType.findOneAndUpdate({typeName: oldType}, {typeName: newType}).then((r: any) => r);
}

export async function updateNotificationTypes(oldType: string, newType: string) {
    console.log("A");
    let oldT = await getNotificationType(oldType);
    console.log(oldT);
    await updateNotificationType(oldType, newType);
    let newT = await getNotificationType(newType);
    console.log(newT);


    return Notification.updateMany({type: oldT}, {type: newT[0]}).then((r: any)=> r);
}