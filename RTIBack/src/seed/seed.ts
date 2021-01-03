import {seedAllAssignments} from './Assignment'
import {seedAllUsers} from './User'

function seed(): void {
    seedAllUsers();
    seedAllAssignments();
}

export default seed;