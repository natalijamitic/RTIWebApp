import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from '../employees/employees.component';
import { ISubjectShort } from '../master/master.component';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { SubjectsService } from '../Services/Subjects/subjects.service';

@Component({
  selector: 'display-subjects-employee',
  templateUrl: './display-subjects-employee.component.html',
  styleUrls: ['./display-subjects-employee.component.scss']
})
export class DisplaySubjectsEmployeeComponent implements OnInit {
  public user: IUser;
  public empl: IEmployee;

  public subjects: ISubjectShort[] = [];

  public selectedSubject: string;

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;

  constructor(private authService: AuthenticationService,
    private employeeService: EmployeesService,
    private subjectService: SubjectsService,
    private router: Router) { }

  ngOnInit(): void {
    this.sub1 = this.authService.isLoggedIn.subscribe((result: any) => {
      this.user = JSON.parse(result);

      if (!this.user)
        return;

      this.sub2 = this.employeeService.getEmployeeByUsername(this.user.username).subscribe((employee: IEmployee) => {
        this.empl = employee;

        if (this.empl.type != 'nastavnik') {
          this.router.navigate(['/error']);
          return;
        }

        this.sub3 = this.employeeService.getSubjectsForEmployee(this.user.username).subscribe((result: Array<string>) => {

          this.subjectService.getSubjectsByCodes(result).subscribe((s: any) => {

            for (let subj of s) {
              this.subjects.push({
                code: subj.code,
                title: subj.title,
                type: subj.type,
                timetable: subj.timetable,
                semestar: subj.semestar,
                espb: subj.espb
              });
            }

            if (this.subjects.length > 0) {
              this.selectedSubject = this.subjects[0].code;
            }

          });
        })

      })
    });
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
  }
}
