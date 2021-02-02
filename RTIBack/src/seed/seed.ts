import {seedAllAssignments} from './Assignment'
import {seedAllUsers} from './User'
import {seedAllNotifications} from './Notification'
import {seedAllDoneProjects} from './DoneProject'
import {seedAllOfferedProjects} from './OfferedProject'
import { seedAllSubjects } from './Subject'
import { seedAllLists } from './List'

function seed(): void {
    seedAllUsers();
    seedAllAssignments();
    seedAllNotifications();
    seedAllDoneProjects();
    seedAllOfferedProjects();
    seedAllSubjects();
    seedAllLists();
}

export default seed;