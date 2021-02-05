import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeesService } from '../Services/Employees/employees.service';

export interface IPicture {
  contentType: string;
  image: string;
}
export interface IEmployee {
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  webpage: string;
  personalInfo: string;
  title: string;
  room: string;
  status: string;
  type: string;
  subjects: string[];
  profilePicture?: IPicture;
}

export interface IAssignment {
  subject: string;
  employees: string[];
}

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public employees: Array<IEmployee> = [];

  constructor(private emplService: EmployeesService, private router: Router) { }

  ngOnInit(): void {
    this.emplService.getAllEmployees().subscribe((result: Array<IEmployee>) => {
      if (result && result.length > 0) {
        this.employees = result;
        console.log(this.employees)

        this.emplService.getAssignmentList().subscribe((result: Array<IAssignment>) => {
          if (result && result.length > 0) {
            for (let subject of result) {
              for (let employee of subject.employees) {
                let emplIndex = this.employees.findIndex(empl => empl.username == employee);
                if (!this.employees[emplIndex].subjects) {
                  this.employees[emplIndex].subjects = [subject.subject];
                } else {
                  this.employees[emplIndex].subjects.push(subject.subject);
                }
              }
            }
          }

          console.log(this.employees)
        },
          (error: HttpErrorResponse) => {
            console.log(error);
          });

      }
    },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  public openEmployee(employee: IEmployee) {
    let navigationExtras: NavigationExtras = {
      state: {
        employee: JSON.stringify(employee)
      }
    }
    this.router.navigate(['zaposlen'], navigationExtras);
  }

}
