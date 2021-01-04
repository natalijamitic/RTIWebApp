import {seedAllAssignments} from './Assignment'
import {seedAllUsers} from './User'
import {seedAllNotifications} from './Notification'
import {seedAllDoneProjects} from './DoneProject'
import {seedAllOfferedProjects} from './OfferedProject'
import { seedAllSubjects } from './Subject'

function seed(): void {
    seedAllUsers();
    seedAllAssignments();
    seedAllNotifications();
    seedAllDoneProjects();
    seedAllOfferedProjects();
    seedAllSubjects()
}

export default seed;