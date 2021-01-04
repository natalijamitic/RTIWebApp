import DoneProject from '../model/DoneProject'
import OfferedProject from '../model/OfferedProject'

export function getDoneProjects() {
    return DoneProject.find({}).then((result: any) => result);
}

export function getOfferedProjects() {
    return OfferedProject.find({}).then((result: any) => result);
}