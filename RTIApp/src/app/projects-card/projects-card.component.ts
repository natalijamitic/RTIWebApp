import { Component, Input, OnInit } from '@angular/core';

import uuid from 'uuid';
import { IOfferedProject } from '../projects/projects.component';

@Component({
  selector: 'projects-card',
  templateUrl: './projects-card.component.html',
  styleUrls: ['./projects-card.component.scss']
})
export class ProjectsCardComponent implements OnInit {

  @Input() project: IOfferedProject;

  public id = `collapse${uuid.v4()}`;

  constructor() { }

  ngOnInit(): void {
  }

}
