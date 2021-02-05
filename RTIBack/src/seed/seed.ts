import {seedAllAssignments} from './Assignment'
import {seedAllUsers} from './User'
import {seedAllNotifications} from './Notification'
import {seedAllDoneProjects} from './DoneProject'
import {seedAllEndProjects} from './EndProject'
import { seedAllSubjects } from './Subject'
import { seedAllLists } from './List'

function seed(): void {
    seedAllUsers();
    seedAllAssignments();
    seedAllNotifications();

    seedAllDoneProjects();
    seedAllEndProjects();

    seedAllSubjects();
    seedAllLists();
}

export default seed;