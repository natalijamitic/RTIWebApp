import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from '../employees/employees.component';
import { IStudent, IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { StudentService } from '../Services/Students/student.service';
import { ISubjectFull, SubjectsService } from '../Services/Subjects/subjects.service';

@Component({
  selector: 'display-subject-student-information',
  templateUrl: './display-subject-student-information.component.html',
  styleUrls: ['./display-subject-student-information.component.scss']
})
export class DisplaySubjectStudentInformationComponent implements OnInit {

  public loggedInUser: IUser = null;
  public loggedInStudent: IStudent = null;

  public code: string;
  public subject: ISubjectFull = null;
  public employees: IEmployee[] = [];

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;
  private sub5: Subscription;

  constructor(private authService: AuthenticationService,
    private studService: StudentService,
    private subjService: SubjectsService,
    private empService: EmployeesService,
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
    this.sub5?.unsubscribe();
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

    this.sub1 = this.empService.getEmpoloyeesForSubject(this.code).subscribe((result: IEmployee[]) => {
      this.employees = result;
    },
    (error: HttpErrorResponse) => {
      this.router.navigate(["/error"]);
    });

  }

  public navigateToEmployee(employee: IEmployee) {
    let navigationExtras: NavigationExtras = {
      state: {
        employee: JSON.stringify(employee)
      }
    }
    this.router.navigate(['zaposlen'], navigationExtras);
  }

  public openEmployee(employee: IEmployee) {
    if (employee.subjects?.length > 0) {
      this.navigateToEmployee(employee);
    }
    this.sub5 = this.empService.getSubjectsForEmployee(employee.username).subscribe((subjects: string[]) => {
      employee.subjects = subjects;
      this.navigateToEmployee(employee);
    });

  }
}
