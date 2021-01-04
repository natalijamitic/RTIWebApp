import mongoose, { connect } from 'mongoose';
import { Notification, NotificatonType } from '../model/Notification';

const notificationTypes = [
    {
        typeName: "Pozivi za studentska takmicenja"
    },
    {
        typeName: "Obavestenja o konferencijama"
    },
    {
        typeName: "Ponude za prakse"
    },
    {
        typeName: "Ponude za posao"
    }
];

const notifications = [
    {
        title: "Poziv broj 1",
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo.",
        type: {},
        dateCreation: Date.parse('04 Sep 2020 00:12:00 GMT')
    },
    {
        title: "Poziv broj 2",
        type: {},
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 3",
        type: {},
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 4",
        type: {},
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 5",
        type: {},
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 6",
        type: {},
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 7",
        type: {},
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 8",
        type: {},
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    }
]

function saveNotification(i: Number): void {
    for (let j = 0; j < 2; j++) {
        let notification = new Notification(notifications[i++]);
        notification.save().then(u => {
            // status ok
        }).catch(err => {
            console.log("Error, couldn't save a notification in db.")
        })
    }
}

function seedNotificationTypes(): void {
    let i = 0;
    for (let n of notificationTypes) {
        let notificationType = new NotificatonType(n);
        notificationType.save().then(u => {
            notifications[i++].type = u;
            notifications[i++].type = u;
            saveNotification(i-2);
        }).catch(err => {
            console.log("Error, couldn't save a notification type in db.");
        })
    }
}

function seedAllNotifications(): void {
    const db = mongoose.connect('mongodb://localhost:27017/rti_katedra');
    const connection = mongoose.connection;

    connection.db.dropCollection('NotificationType', function (err, result) { });
    connection.db.dropCollection('Notification', function (err, result) { });

    new Promise(resolve => {
        seedNotificationTypes();
    }).then(async u => {
        (await db).disconnect();
    });
}

export { seedAllNotifications };