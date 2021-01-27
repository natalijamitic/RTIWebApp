import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { ISubjectFull, SubjectsService } from '../Services/Subjects/subjects.service';

@Component({
  selector: 'display-subject-employee',
  templateUrl: './display-subject-employee.component.html',
  styleUrls: ['./display-subject-employee.component.scss']
})
export class DisplaySubjectEmployeeComponent implements OnInit {

  public loggedInUser: IUser = null;

  public code: string;
  public subject: ISubjectFull = null;

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


}
