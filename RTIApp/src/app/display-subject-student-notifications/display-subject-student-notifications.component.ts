import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INotification } from '../add-subject-notifications/add-subject-notifications.component';
import { IStudent, IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { StudentService } from '../Services/Students/student.service';
import { ISubjectFull, SubjectsService } from '../Services/Subjects/subjects.service';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';


declare const tinymce: any;

@Component({
  selector: 'display-subject-student-notifications',
  templateUrl: './display-subject-student-notifications.component.html',
  styleUrls: ['./display-subject-student-notifications.component.scss']
})
export class DisplaySubjectStudentNotificationsComponent implements OnInit {

  public loggedInUser: IUser = null;
  public loggedInStudent: IStudent = null;

  public code: string;
  public subject: ISubjectFull = null;

  public tinyMceInit;

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;

  constructor(private authService: AuthenticationService,
    private studService: StudentService,
    private subjService: SubjectsService,
    private uploadService: UploadFilesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initComponent(this.activatedRoute.parent.snapshot.url[1].path);

    this.tinyMceInit = {
      height: 250,
      menubar: false,
      readonly: 1
    }
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
  }

  public initComponent(code: string): void {
    this.code = code;

    this.sub1 = this.subjService.getSubjectByCode(this.code).subscribe((subject: ISubjectFull) => {

      if (!subject) {
        this.router.navigate(["/error"]);
      }

      this.subject = subject;
      this.subject.notifications.sort((n1: INotification, n2: INotification) => (new Date(n2.dateCreation)).getTime() - (new Date(n1.dateCreation)).getTime());
      console.log(this.subject);

      this.sub2 = this.authService.isLoggedIn.subscribe((user: any) => {
        this.loggedInUser = JSON.parse(user);

        setTimeout(() => {
          for (let i = 0; i < this.subject.notifications.length; i++) {
            tinymce.editors[i].mode.set('readonly');
            tinymce.editors[i].setContent(this.subject.notifications[i].content);
          }
        }, 2000);

        if (this.loggedInUser && this.loggedInUser.type == 'student') {
          this.sub3 = this.studService.getStudentByUsername(this.loggedInUser.username).subscribe((stud: IStudent) => {
            this.loggedInStudent = stud;

            setTimeout(() => {
              for (let i = 0; i < this.subject.notifications.length; i++) {
                tinymce.editors[i].mode.set('readonly');
                tinymce.editors[i].setContent(this.subject.notifications[i].content);
              }
            }, 2000);

            if (!this.loggedInStudent.subjects.find((s: string) => s == this.code)) {
              this.router.navigate(["/error"]);
            }
          });
        }
      });
    },
    (error: HttpErrorResponse) => {
      this.router.navigate(["/error"]);
    });
  }

  public isNewNotification(notif: INotification): boolean {
    if (!notif) {
      return false;
    }
    let todayDate = new Date();
    let notifDate = new Date(notif.dateCreation);
    let oneDay = 1000*60*60*24;
    let diff = Math.ceil((todayDate.getTime() - notifDate.getTime()) / oneDay);

    return diff > 7 ? false : true;
  }

  public downloadFile(fileName: string): void {
    this.sub4?.unsubscribe();

    this.sub4 = this.uploadService.downloadNotificationFile(fileName).subscribe((result: any) => {
      UploadFilesService.openDownloadedFile(result);
    });
  }
}
