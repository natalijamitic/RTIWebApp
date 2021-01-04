import { User, Employee, Student } from '../model/User';
import { Assignment } from '../model/Assignment';

export enum LoginError {
    WrongPassword,
    WrongUsername
}

export function loginUser(username: string, password: string): any {
    return User.findOne({username: username})
    .then( (user: any) => user ? (user.password === password ? user : LoginError.WrongPassword) : LoginError.WrongUsername);
}

export function stringifyUser(user: any): string {
    return JSON.stringify({username: user.username, password: user.password, firstLogin: user.firstLogin, type: user.type});
}

export function getAllEmployees(): any {
    return Employee.find({}).then((emp: any) => emp);
}

export function getAllAssignments(): any {
    return Assignment.find({}).then((emp: any) => emp);
}