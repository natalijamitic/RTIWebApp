import Subject from '../model/Subject';

export function getSubjectsByDepartment(dept: String) {
    return Subject.find({department: dept}).then((result: any) => result);
}