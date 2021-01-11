import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeComponent } from '../employee/employee.component';
import { IEmployee } from '../employees/employees.component';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';

@Component({
  selector: 'navigation-vertical',
  templateUrl: './navigation-vertical.component.html',
  styleUrls: ['./navigation-vertical.component.scss']
})
export class NavigationVerticalComponent implements OnInit, OnDestroy {

  public user: IUser = null;
  public emp: IEmployee = null;

  private sub1: Subscription;
  private sub2: Subscription;
  constructor(private authService: AuthenticationService,
              private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.sub1 = this.authService.isLoggedIn.subscribe((user: any) => {
      this.user = JSON.parse(user);
      if (this.user && this.user.type == 'zaposlen') {
        this.sub2 = this.employeeService.getEmployeeByUsername(this.user.username).subscribe((result: IEmployee) => {
          this.emp = result;
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();

  }
}
