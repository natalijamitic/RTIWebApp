import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ISubjectShort } from 'src/app/master/master.component';
import { IStudent } from 'src/app/registration/registration.component';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class StudentService {

    constructor(private http: HttpClient) {

    }

    getStudentByUsername(username: string) {
        return this.http.get(`${environment.api}/students/${username}`)
            .pipe(
                map((stud: any) => {
                    let student: IStudent = {
                        username: stud.username,
                        firstName: stud.firstName,
                        lastName: stud.lastName,
                        index: stud.index,
                        type: stud.type,
                        status: stud.status,
                        subjects: stud.subjects,
                    };

                    return student;
                })
            );
    }

    existsStudent(student: IStudent) {
        return this.http.post(`${environment.api}/students/exists`, {student});
    }

    updateStudent(oldStud: IStudent, newStud: IStudent) {
        return this.http.post(`${environment.api}/students/update`, {oldStud, newStud});
    }

    insertSubjects(username: string, subjects: Array<string>) {
        return this.http.post(`${environment.api}/students/insert/subjects`, {username, subjects});
    }

    deleteSubject(username: string, subject: string) {
        return this.http.delete(`${environment.api}/students/delete/subject/${username}/${subject}`);
    }

}