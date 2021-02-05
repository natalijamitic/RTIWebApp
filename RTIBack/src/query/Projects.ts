import DoneProject from '../model/DoneProject'
import EndProject from '../model/EndProject'

export function getDoneProjects() {
    return DoneProject.find({}).then((result: any) => result);
}

export function getEndProjects() {
    return EndProject.find({}).then((result: any) => result);
}