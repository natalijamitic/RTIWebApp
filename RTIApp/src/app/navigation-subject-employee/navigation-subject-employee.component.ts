import { Component, Input, OnInit } from '@angular/core';
import { ISubjectFull } from '../Services/Subjects/subjects.service';

@Component({
  selector: 'navigation-subject-employee',
  templateUrl: './navigation-subject-employee.component.html',
  styleUrls: ['./navigation-subject-employee.component.scss']
})
export class NavigationSubjectEmployeeComponent implements OnInit {

  @Input()
  public subject: string;

  constructor() { }

  ngOnInit(): void {
  }

}
