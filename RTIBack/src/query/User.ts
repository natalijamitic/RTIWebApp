import { User, Employee, Student } from '../model/User';

export enum LoginError {
    WrongPassword,
    WrongUsername
}

export function loginUser(username: string, password: string): any {
    return User.findOne({username: username})
    .then( user => user ? (user.password === password ? user : LoginError.WrongPassword) : LoginError.WrongUsername);
}

export function stringifyUser(user): string {
    return JSON.stringify({username: user.username, password: user.password, firstLogin: user.firstLogin, type: user.type});
}
