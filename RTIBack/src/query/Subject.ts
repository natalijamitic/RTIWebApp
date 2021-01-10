import Subject from '../model/Subject';

export function getAllSubjects() {
    return Subject.find({}).then((result: any) => result);
}

export function getSubjectsByDepartment(dept: String) {
    return Subject.find({ department: dept }).then((result: any) => result);
}

export function insertNotification(notif: any, subjects: string[]) {
    if (notif.dateCreation == null) {
        notif.dateCreation = Date.now();
    }

    return Subject.updateMany({ code: { $in: subjects } }, {
        $push: {
            notifications: notif
        }
    }).then((r: any) => r);
}

// export function insertFilesToNotifications(title: string, subjects: string[], file: string) {
//     console.log(title);
//     console.log(subjects);
//     console.log(file);
//     return Subject.updateMany(
//         {
//             code: {
//                 $in: subjects
//             },
//             "notifications.title": title
//         }, {

//         $push: {
//             "notifications.$.files": file
//         }
//     }).then((r: any) => {
//         console.log(r)
//     });
// }