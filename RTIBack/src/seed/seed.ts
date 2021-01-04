import {seedAllAssignments} from './Assignment'
import {seedAllUsers} from './User'
import {seedAllNotifications} from './Notification'
import {seedAllDoneProjects} from './DoneProject'
import {seedAllOfferedProjects} from './OfferedProject'

function seed(): void {
    seedAllUsers();
    seedAllAssignments();
    seedAllNotifications();
    seedAllDoneProjects();
    seedAllOfferedProjects();
}

export default seed;