import List from '../model/List';
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

export async function insertSubject(subj: any) {
    let s = await getSubjectByCode(subj.code);
    console.log(s);
    if (s != null) {
        return new Promise(resolve => {
            resolve({ status: -1, msg: "Predmet sa takvim akronimom vec postoji." });
        });
    } else {
        let subject = new Subject(subj);
        await subject.save();
    //     return subject.save().then(u => {
    //         //ok
    //     });
    // }
        return new Promise(resolve => {
            resolve({ status: 0, msg: "Predmet uspesno dodat." });
        });
    }

}


export function deleteSubjectByCode(code: string) {
    return Subject.deleteOne({ code: code }).then((r: any) => r);
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




export function getAllListsBySubject(codes: string[]) {
    return List.find({ code: { $in: codes }  }).then((result: any) => result);
}

export function getAllListsByAuthor(author: string) {
    return List.find({ author: author }).then((result: any) => result);
}

export async function updateList(lOld, lNew) {
    await deleteList(lOld, lNew.title, lNew.author);
    return insertList(lNew);
}

export function insertList(l) {
    let list = new List(l);
    return list.save().then(u => {
        // saved
     }).catch(err => {
         console.log("Error, couldn't save a list type in db.");
     })
}

export function deleteList(date, title, author) {
    return List.deleteOne({created: date, title: title, author: author}).then((r: any) => {
        return(r);
    });
}