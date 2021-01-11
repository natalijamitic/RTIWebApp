import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { INotification } from 'src/app/add-subject-notifications/add-subject-notifications.component';
import { ISubjectShort } from 'src/app/master/master.component';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SubjectsService {

    constructor(private http: HttpClient) {

    }

    getSubjectsByDepartment(dept: string) {
        return this.http.get(`${environment.api}/subjects/${dept}`)
            .pipe(
                map((s: any) => {
                    let subjects: Array<ISubjectShort> = [];
                    for (let subj of s) {
                        subjects.push({
                            type: subj.type,
                            semestar: subj.semestar,
                            code: subj.code,
                            title: subj.title,
                            weekly: subj.weekly,
                            espb: subj.espb,
                        });
                    }
                    return subjects;
                })
            );
    }

    getAllSubjects() {
        return this.http.get(`${environment.api}/subjects`)
        .pipe(
            map((s: any) => {
                let subjects: Array<ISubjectShort> = [];
                for (let subj of s) {
                    subjects.push({
                        type: subj.type,
                        semestar: subj.semestar,
                        code: subj.code,
                        title: subj.title,
                        weekly: subj.weekly,
                        espb: subj.espb,
                    });
                }
                return subjects;
            })
        );
    }

    getSubjectsByCodes(codes: string[]) {
        return this.http.post(`${environment.api}/subjects/codes`, {codes});
    }

    deleteNotification(notif: INotification, code: string) {
        return this.http.delete(`${environment.api}/subjects/notification/${code}/${notif.dateCreation}/${notif.title}`);
    }

    postNotification(notif: INotification, subjects: string[]) {
        return this.http.post(`${environment.api}/subjects/insert/notification`, {notif, subjects});
    }
}