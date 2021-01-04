import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from '../employees/employees.component';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  public emp: IEmployee = null;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.emp = JSON.parse(params.employee);
      console.log(this.emp.firstname);
    });
  }

  ngOnInit(): void {
  }

}
