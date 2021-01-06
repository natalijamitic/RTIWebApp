import { User, Employee, Student } from '../model/User';
import { Assignment } from '../model/Assignment';

var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

export enum LoginError {
    WrongPassword,
    WrongUsername
}

export function loginUser(username: string, password: string): any {
    return User.findOne({username: username})
    .then( (user: any) => {
        if (!user) return LoginError.WrongUsername;
        return bcrypt.compare(password, user.password) ? user : LoginError.WrongPassword;
    });
}

export function existsStudent(student: any) : any {
    return Student.findOne({index: student.index, studyType: student.studyType})
    .then((user: any) => user);
}

export function insertStudent(student: any): void {
    const newStudent = new Student(student);
    newStudent.save().then(u => {
    }).catch(err => {
        console.log(err);
        console.log("Error, couldn't save a student in db.");
    })
}

export function insertUser(user: any): void {
    const newUser = new User(user);
    newUser.save().then(u => {
    }).catch(err => {
        console.log("Error, couldn't save an user in db.");
    });
}


export async function registerStudent(user: any, student: any): Promise<any> {
    let exists = await existsStudent(student);

    if (exists) {
        return new Promise(resolve => {
            resolve({status: -1, msg: "Korisnik na takvim studijama sa tim indeksom vec postoji."});
        });
    } else {

        let hashedPassword = await bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS);
        user.password = hashedPassword;
        await insertUser(user);
        await insertStudent(student);
        return new Promise(resolve => {
            resolve({status: 0, msg: "Korisnik uspesno registrovan. Mozete se ulogovati"})
        });
    }
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