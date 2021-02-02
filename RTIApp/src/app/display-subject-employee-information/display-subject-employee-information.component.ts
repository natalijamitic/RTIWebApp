import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { ISubjectFull, SubjectsService } from '../Services/Subjects/subjects.service';

@Component({
  selector: 'display-subject-employee-information',
  templateUrl: './display-subject-employee-information.component.html',
  styleUrls: ['./display-subject-employee-information.component.scss']
})
export class DisplaySubjectEmployeeInformationComponent implements OnInit {

  public loggedInUser: IUser = null;

  public code: string;
  public subject: ISubjectFull = null;
  public subjectOld: ISubjectFull = null;

  public classTime: string;
  public excerTime: string;
  public msg: string;

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;

  constructor(private authService: AuthenticationService,
    private empService: EmployeesService,
    private subjService: SubjectsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((value: any) => {
      this.initComponent(value[1].path);
    })
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
      this.subjectOld = { ...subject };
      this.classTime = this.subjectOld.classTime.join(";");
      this.excerTime = this.subjectOld.excerTime.join(";");

      this.sub2 = this.authService.isLoggedIn.subscribe((user: any) => {
        this.loggedInUser = JSON.parse(user);

        if (this.loggedInUser && this.loggedInUser.type == 'zaposlen') {
          this.sub3 = this.empService.getSubjectsForEmployee(this.loggedInUser.username).subscribe((subjects: Array<string>) => {
            if (!subjects.find((s: string) => s == this.code)) {
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

  public update() {
    if (!this.subject || !this.subject.title || !this.subject.semestar || !this.subject.espb
      || !this.subject.type || !this.subject.subjectGoal || !this.subject.weekly.exercise || !this.subject.weekly.lab ||
      !this.subject.weekly.lecture || !this.classTime || !this.excerTime) {
      this.msg = "Popunite sva obavezna polja.";
      return;
    }
    this.msg = "";
    this.subject.classTime = this.classTime.split(';');
    this.subject.excerTime = this.excerTime.split(";");
    console.log(this.subjectOld);
    console.log(this.subject);
    this.subjService.updateSubject(this.subjectOld.code, this.subject).subscribe((result: any) => {
      console.log(result);
      this.msg = "Uspesno";
    },
    (error: HttpErrorResponse) => {
      this.msg = "Greska na serveru";
    });
  }

}
