import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IEmployee } from '../employees/employees.component';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  public emp: IEmployee = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.emp = JSON.parse(this.router.getCurrentNavigation().extras.state.employee);
      }
    });
  }

  ngOnInit(): void {
  }

}
