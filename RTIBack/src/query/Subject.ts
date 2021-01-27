import Subject from '../model/Subject';

export function getAllSubjects() {
    return Subject.find({}).then((result: any) => result);
}

export function getSubjectsByDepartment(dept: String) {
    return Subject.find({ department: dept }).then((result: any) => result);
}

export function getSubjectsByCodes(codes: string[]) {
    return Subject.find({ code: { $in: codes } }).then((r: any) => r);
}

export function getSubjectByCode(code: string) {
    return Subject.findOne({ code: code }).then((r: any) => r);
}

export function insertSubject(subj: any) {
    let subject = new Subject(subj);
    return subject.save().then(u => {
            //ok
        });
}

export function deleteSubjectByCode(code: string) {
    return Subject.deleteOne({code: code}).then((r: any) => r);
}

export async function updateSubject(code: string, subj: any) {
    await deleteSubjectByCode(code);
    return insertSubject(subj);
}

export function deleteNotificationFromSubject(code: string, date: any, title: string) {
    return Subject.updateOne({ code: code }, { $pull: { "notifications": { dateCreation: date, title: title } } }).then((r: any) => r);
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