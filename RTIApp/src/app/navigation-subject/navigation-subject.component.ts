import { Component, Input, OnInit } from '@angular/core';
import { ISubjectFull } from '../Services/Subjects/subjects.service';

@Component({
  selector: 'navigation-subject',
  templateUrl: './navigation-subject.component.html',
  styleUrls: ['./navigation-subject.component.scss']
})
export class NavigationSubjectComponent implements OnInit {

  @Input()
  public subject: ISubjectFull;

  constructor() { }

  ngOnInit(): void {
  }

}
