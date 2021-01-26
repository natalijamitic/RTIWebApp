import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IAssignmentFull } from 'src/app/assignment-configuration/assignment-configuration.component';
import { IAssignment, IEmployee } from 'src/app/employees/employees.component';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class EmployeesService {

    constructor(private http: HttpClient) {

    }

    getEmployeeByUsername(username: string) {
        return this.http.get(`${environment.api}/employees/${username}`)
            .pipe(
                map((emp: any) => {
                    let employee: IEmployee = {
                        username: emp.username,
                        firstName: emp.firstName,
                        lastName: emp.lastName,
                        address: emp.address,
                        phoneNumber: emp.phoneNumber,
                        webpage: emp.webpage,
                        personalInfo: emp.personalInfo,
                        title: emp.title,
                        roomNumber: emp.roomNumber,
                        status: emp.status,
                        type: emp.type,
                        subjects: [] as string[],
                        profilePicture: emp.profilePicture
                    };

                    return employee;
                })
            );
    }

    updateEmployee(oldEmp: IEmployee, newEmp: IEmployee) {
        return this.http.post(`${environment.api}/employees/update`, {oldEmp, newEmp});
    }

    getAllEmployees() {
        return this.http.get(`${environment.api}/employees`)
            .pipe(
                map((e: any) => {
                    let employees: Array<IEmployee> = [];
                    for (let emp of e) {
                        employees.push({
                            username: emp.username,
                            firstName: emp.firstName,
                            lastName: emp.lastName,
                            address: emp.address,
                            phoneNumber: emp.phoneNumber,
                            webpage: emp.webpage,
                            personalInfo: emp.personalInfo,
                            title: emp.title,
                            roomNumber: emp.roomNumber,
                            status: emp.status,
                            type: emp.type,
                            subjects: [] as string[],
                            profilePicture: emp.profilePicture
                        });
                    }
                    return employees;
                })
            );
    }

    getAssignmentList() {
        return this.http.get(`${environment.api}/assignments`)
            .pipe(
                map((a: any) => {
                    let assignments: Array<IAssignment> = [];
                    for (let ass of a) {
                        assignments.push({
                            subject: ass.subject,
                            employees: ass.employees
                        });
                    }
                    return assignments;
                })
            );
    }

    getAssignmentListFull() {
        return this.http.get(`${environment.api}/assignments`)
            .pipe(
                map((a: any) => {
                    let assignments: Array<IAssignmentFull> = [];
                    for (let ass of a) {
                        assignments.push({
                            subject: ass.subject,
                            employees: ass.employees,
                            group: ass.group
                        });
                    }
                    return assignments;
                })
            );
    }

    getSubjectsForEmployee(username: string) {
        return this.http.get(`${environment.api}/assignments/${username}`).pipe(
            map((a: any) => {
                let subjects: Array<string> = [];
                for (let ass of a) {
                    subjects.push(ass.subject);
                }
                return subjects;
            })
        );
    }

    getEmpoloyeesForSubject(code: string) {
        return this.http.get(`${environment.api}/assignments/code/${code}`).pipe(
            map((e: any) => {
                let employees: Array<IEmployee> = [];
                for (let emp of e) {
                    employees.push({
                        username: emp.username,
                        firstName: emp.firstName,
                        lastName: emp.lastName,
                        address: emp.address,
                        phoneNumber: emp.phoneNumber,
                        webpage: emp.webpage,
                        personalInfo: emp.personalInfo,
                        title: emp.title,
                        roomNumber: emp.roomNumber,
                        status: emp.status,
                        type: emp.type,
                        subjects: [] as string[],
                        profilePicture: emp.profilePicture
                    });
                }
                return employees;
            })
        );
    }

    insertAssignment(ass: IAssignmentFull) {
        return this.http.post(`${environment.api}/assignments/insert`, {ass});
    }

    deleteAssignment(subject: string) {
        return this.http.delete(`${environment.api}/assignments/delete/${subject}`);
    }
}