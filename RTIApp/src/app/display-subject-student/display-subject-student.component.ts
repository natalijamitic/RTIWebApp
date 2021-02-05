import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISubjNotif } from '../display-subject-notifications/display-subject-notifications.component';
import { Itimetable } from '../master/master.component';
import { IStudent, IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { StudentService } from '../Services/Students/student.service';
import { ISubjectFull, SubjectsService } from '../Services/Subjects/subjects.service';
@Component({
  selector: 'display-subject-student',
  templateUrl: './display-subject-student.component.html',
  styleUrls: ['./display-subject-student.component.scss']
})
export class DisplaySubjectStudentComponent implements OnInit, OnDestroy {

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
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sub1 = this.activatedRoute.params.subscribe(params => {
      this.initComponent(params['code']);
    });
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
  }

  public initComponent(code: string): void {
    this.code = code;

    this.sub4 = this.subjService.getSubjectByCode(this.code).subscribe((subject: ISubjectFull) => {

      if (!subject) {
        this.router.navigate(["/error"]);
      }


      this.subject = subject;
      console.log(this.subject);

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

}
