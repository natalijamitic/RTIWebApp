import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IStudent, IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { StudentService } from '../Services/Students/student.service';
import { ISubjectFull, SubjectsService } from '../Services/Subjects/subjects.service';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';

@Component({
  selector: 'display-subject-student-lecture',
  templateUrl: './display-subject-student-lecture.component.html',
  styleUrls: ['./display-subject-student-lecture.component.scss']
})
export class DisplaySubjectStudentLectureComponent implements OnInit {
  public loggedInUser: IUser = null;
  public loggedInStudent: IStudent = null;

  public code: string;
  public subject: ISubjectFull = null;

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

      this.sub2 = this.authService.isLoggedIn.subscribe((user: any) => {
        this.loggedInUser = JSON.parse(user);

        if (this.loggedInUser && this.loggedInUser.type == 'student') {
          this.sub3 = this.studService.getStudentByUsername(this.loggedInUser.username).subscribe((stud: IStudent) => {
            this.loggedInStudent = stud;

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


  public downloadFile(fileName: string): void {
    this.sub4?.unsubscribe();

    this.sub4 = this.uploadService.downloadNotificationFile(fileName).subscribe((result: any) => {
      UploadFilesService.openDownloadedFile(result);
    });
  }

}
