import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmployee } from '../employees/employees.component';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit , OnDestroy{

  public emp: IEmployee = null;

  private subscription: Subscription = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.subscription = this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.emp = JSON.parse(this.router.getCurrentNavigation().extras.state.employee);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
