import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbButtonLabel } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { ISubjectNew } from 'src/app/add-new-subject/add-new-subject.component';
import { INotification } from 'src/app/add-subject-notifications/add-subject-notifications.component';
import { ISubjNotif } from 'src/app/display-subject-notifications/display-subject-notifications.component';
import { ISubjectShort, IWeekly } from 'src/app/master/master.component';
import { environment } from 'src/environments/environment';

export interface ISubjExamMaterials {
    examExamples: string[];
    examSolutions: string[];
    isExamExamplesHidden: boolean;
}
export interface ISubjLab {
    labDescription: string;
    labMaterials: string[];
}
export interface ISubjLabMaterials {
    isHidden: boolean;
    numberOfLabs: number;
    basicInfo: string;
    labs: ISubjLab[];
}
export interface ISubjProject {
    basicInfo: string;
    examinationProcess: string;
    projectMaterials: string[];
}
export interface ISubjProjectMaterials {
    isHidden: boolean;
    projects: ISubjProject[];
}
export interface ISubjectFull {
    classTime: string[];
    excerTime: string[]
    code: string;
    department: string;
    espb: number;
    examMaterials: ISubjExamMaterials;
    exercises: string[];
    haveLab: boolean;
    lab: ISubjLabMaterials;
    lectures: string[];
    notifications: INotification[];
    project: ISubjProjectMaterials;
    propositions: string;
    semestar: number;
    subjectGoal: string;
    title: string;
    type: string;
    weekly: IWeekly;
    comment: string;
}

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
        return this.http.post(`${environment.api}/subjects/codes`, { codes });
    }

    getSubjectByCode(code: string) {
        return this.http.get(`${environment.api}/subjects/code/${code}`).pipe(map((s: any) => {
            let labs: ISubjLab[] = [];
            for (let l of s.lab.labs) {
                let lab: ISubjLab = {
                    labDescription: l.labDescription,
                    labMaterials: l.labMaterials
                }
                labs.push(lab);
            }
            let projs: ISubjProject[] = [];
            for (let p of s.project.projects) {
                let proj: ISubjProject = {
                    basicInfo: p.basicInfo,
                    examinationProcess: p.examinationProcess,
                    projectMaterials: p.projectMaterials
                }
                projs.push(proj);
            }
            let notifs: INotification[] = [];
            for (let n of s.notifications) {
                let notif: INotification = {
                    title: n.title,
                    content: n.content,
                    creator: n.creator,
                    files: n.files,
                    dateCreation: n.dateCreation
                }
                notifs.push(notif);
            }

            let subject: ISubjectFull = {
                type: s.type,
                department: s.department,
                semestar: s.semestar,
                title: s.title,
                code: s.code,
                weekly: s.weekly,
                espb: s.espb,
                classTime: s.classTime,
                excerTime: s.excerTime,
                propositions: s.propositions,
                subjectGoal: s.subjectGoal,
                examMaterials: {
                    examExamples: s.examMaterials.examExamples,
                    examSolutions: s.examMaterials.examSolutions,
                    isExamExamplesHidden: s.examMaterials.isExamExamplesHidden
                },
                lectures: s.lectures,
                exercises: s.exercises,
                haveLab: s.haveLab,
                lab: {
                    isHidden: s.lab.isHidden,
                    numberOfLabs: s.lab.numberOfLabs,
                    basicInfo: s.lab.basicInfo,
                    labs: labs
                },
                project: {
                    isHidden: s.project.isHidden,
                    projects: projs
                },
                notifications: notifs,
                comment: s.comment
            }
            return subject;
        }));
    }

    updateSubject(code: string, subject: ISubjectFull) {
        return this.http.post(`${environment.api}/subjects/update`, {code, subject});
    }

    insertSubject(subject: ISubjectNew) {
        return this.http.post(`${environment.api}/subjects/insert`, {subject});
    }

    deleteNotification(notif: INotification, code: string) {
        return this.http.delete(`${environment.api}/subjects/notification/${code}/${notif.dateCreation}/${notif.title}`);
    }

    postNotification(notif: INotification, subjects: string[]) {
        return this.http.post(`${environment.api}/subjects/insert/notification`, { notif, subjects });
    }
}