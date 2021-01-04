import {seedAllAssignments} from './Assignment'
import {seedAllUsers} from './User'
import {seedAllNotifications} from './Notification'

function seed(): void {
    seedAllUsers();
    seedAllAssignments();
    seedAllNotifications();
}

export default seed;