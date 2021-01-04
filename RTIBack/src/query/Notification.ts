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