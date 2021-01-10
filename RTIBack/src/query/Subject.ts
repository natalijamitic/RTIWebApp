import Subject from '../model/Subject';

export function getAllSubjects() {
    return Subject.find({}).then((result: any) => result);
}

export function getSubjectsByDepartment(dept: String) {
    return Subject.find({department: dept}).then((result: any) => result);
}