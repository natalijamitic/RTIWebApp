import { User, Employee, Student } from '../model/User';
import { Assignment } from '../model/Assignment';

var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

export enum LoginError {
    WrongPassword,
    WrongUsername
}

export async function loginUser(username: string, password: string): Promise<any> {
    let user = await User.findOne({ username: username });
    if (!user) return LoginError.WrongUsername;
    let samePass = await bcrypt.compare(password, user.password);
    return samePass ? user : LoginError.WrongPassword;
}

export async function firstLoginPassChange(username: string, oldPass: string, password: string): Promise<any> {
    let user = await existsUser({ username: username });
    console.log(user);
    if (user) {
        let samePass = await bcrypt.compare(oldPass, user.password);
        if (samePass) {
            await updateUserPass(username, password);
            return new Promise(resolve => {
                resolve({ status: 0, msg: "Uspesno izmenjena lozinka. Prijavite se ponovo." })
            });
        } else {
            return new Promise(resolve => {
                resolve({ status: -2, msg: "Neispravno uneta stara/trenutna lozinka." })
            });
        }
    } else {
        return new Promise(resolve => {
            resolve({ status: -1, msg: "Korisnik datog korisnickog imena ne postoji." })
        });
    }
}



export function existsStudent(student: any): any {
    return Student.findOne({ index: student.index, type: student.type })
        .then((user: any) => user);
}


export function existsStudent2(student: any): any {
    return Student.findOne({ username: student.username })
        .then((user: any) => user);
}

export function existsEmployee(employee: any): any {
    return Employee.findOne({ username: employee.username })
        .then((user: any) => user);
}

export function existsUser(user: any): any {
    return User.findOne({ username: user.username })
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

export function insertEmployee(employee: any): void {
    const newEmployee = new Employee(employee);
    newEmployee.save().then(u => {
    }).catch(err => {
        console.log(err);
        console.log("Error, couldn't save an employee in db.");
    })
}

export async function insertUser(user: any): Promise<any> {
    let hashedPassword = await bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS);
    user.password = hashedPassword;
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
            resolve({ status: -1, msg: "Korisnik sa tim indeksom na takvim studijama vec postoji." });
        });
    } else {
        exists = await existsStudent2(student);
        if (exists) {
            return new Promise(resolve => {
                resolve({ status: -1, msg: "Korisnik sa tim username-om vec postoji." });
            });
        }
        await insertUser(user);
        await insertStudent(student);
        return new Promise(resolve => {
            resolve({ status: 0, msg: "Korisnik uspesno registrovan." })
        });
    }
}

export async function registerEmployee(user: any, employee: any): Promise<any> {
    let exists = await existsEmployee(employee);

    if (exists) {
        return new Promise(resolve => {
            resolve({ status: -1, msg: "Korisnik sa takvim username-om vec postoji." });
        });
    } else {
        await insertUser(user);
        await insertEmployee(employee);
        return new Promise(resolve => {
            resolve({ status: 0, msg: "Korisnik uspesno registrovan." })
        });
    }
}

export async function changeUsernameEmployee(oldUsername: string, newUsername: string) {
    return Employee.findOneAndUpdate({ username: oldUsername }, { username: newUsername }).then((u: any) => u);
}
export async function changeUsernameStudent(oldUsername: string, newUsername: string) {
    return Student.findOneAndUpdate({ username: oldUsername }, { username: newUsername }).then((u: any) => u);
}

export function setNewUser(oldUser: any, newUser: any) {
    User.findOneAndUpdate({ username: oldUser.username }, { username: newUser.username, password: newUser.password, firstLogin: newUser.firstLogin }).then((u: any) => u);
}

export async function updateUser(oldUser: any, newUser: any) {
    if (oldUser.username !== newUser.username) {
        //username is being changed -> change in Student/Employee
        let exists = await existsUser(newUser);
        if (exists) {
            return new Promise(resolve => {
                resolve({ status: -1, msg: "Korisnik sa takvim (novo izabranim) username-om vec postoji." });
            });
        }
        if (oldUser.type == 'student') {
            await changeUsernameStudent(oldUser.username, newUser.username);
        } else if (oldUser.type == 'zaposlen') {
            await changeUsernameEmployee(oldUser.username, newUser.username);
        }
    }
    // hash password if needed
    if (oldUser.password !== newUser.password) {
        let hashedPassword = await bcrypt.hash(newUser.password, BCRYPT_SALT_ROUNDS);
        newUser.password = hashedPassword;
    }

    await setNewUser(oldUser, newUser);
    return new Promise(resolve => {
        resolve({ status: 0, msg: "Korisnik uspesno izmenjen." });
    });
}

export function updateStudent(oldUser: any, newUser: any) {
    return Student.findOneAndUpdate({ username: newUser.username }, {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      index: newUser.index,
      type: newUser.type,
      status: newUser.status
    }).then((u: any) => u);
}

export function updateEmployee(oldUser: any, newUser: any) {
    return Employee.findOneAndUpdate({ username: newUser.username }, {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      address: newUser.address,
      phoneNumber: newUser.phoneNumber,
      webpage: newUser.webpage,
      personalInfo: newUser.personalInfo,
      title: newUser.title,
      room: newUser.room,
      status: newUser.status,
      type: newUser.type,
    }).then((u: any) => u);
}

export function deleteStudent(username: string) {
    Student.findOneAndDelete({ username: username }).then((s: any) => s);
}

export function deleteEmployee(username: string) {
    Employee.findOneAndDelete({ username: username }).then((e: any) => e);
}

export async function deleteUser(username: string, type: string) {
    if (type == 'zaposlen')
        await deleteEmployee(username);
    else if (type == 'student')
        await deleteStudent(username);

    User.findOneAndDelete({ username: username }).then((u: any) => u);
}

export function getAllUsers(): any {
    return User.find({}).then((u: any) => u);
}

export function getAllEmployees(): any {
    return Employee.find({}).then((emp: any) => emp);
}

export function getEmployeeByUsername(username: string): any {
    return Employee.findOne({ username: username }).then((emp: any) => emp);
}

export function getStudentByUsername(username: string): any {
    return Student.findOne({ username: username }).then((stud: any) => stud);
}


export function getAssignment(code: string): any {
    return Assignment.findOne({subject: code}).then((a: any) => a);
}

export async function getAllEmployeesForAssignment(code: string): Promise<any> {
    let assignment = await getAssignment(code);
    return Employee.find({ username: { $in: assignment.employees } }).then((r: any) => r);
}

export function getAllAssignmentsForEmployee(username: string) {
    return Assignment.find({employees: username}).then((emp: any) => emp);
}

export function getAllAssignments(): any {
    return Assignment.find({}).then((emp: any) => emp);
}

export function deleteAssignment(subject: string): any {
    return Assignment.deleteOne({subject: subject}).then((r: any) => r);
}

export function insertAssignment(ass: any): any {
    let A = new Assignment(ass);
    return A.save().then((r: any) => r);
}


export function insertSubjects(username: string, subjects: any) {
    return Student.updateOne({username: username}, {
        $push: {
            subjects: {
                $each: subjects
            }
        }
    }).then((r: any) => r);
}
export function deleteSubject(username: string, subject: string) {
    return Student.updateOne({username: username}, {
        $pull: {
            "subjects": subject
        }
    }).then((r: any) => r);
}


export async function updateUserPass(username: string, newPass: string): Promise<any> {
    let hashedPassword = await bcrypt.hash(newPass, BCRYPT_SALT_ROUNDS);

    User.findOneAndUpdate({ username: username }, { password: hashedPassword, firstLogin: 'no' }).then((result: any) => result);
}


export function stringifyUser(user: any): string {
    return JSON.stringify({ username: user.username, password: user.password, firstLogin: user.firstLogin, type: user.type });
}