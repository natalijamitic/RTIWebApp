import { Component, Input, OnInit } from '@angular/core';
import { ISubjectShort } from '../master/master.component';
import * as uuid from 'uuid'

@Component({
  selector: 'master-card',
  templateUrl: './master-card.component.html',
  styleUrls: ['./master-card.component.scss']
})
export class MasterCardComponent implements OnInit {

  @Input() semestar: number;
  @Input() subjects: Array<ISubjectShort>;

  public id = `collapse${uuid.v4()}`;

  constructor() { }

  ngOnInit(): void {
  }

}
