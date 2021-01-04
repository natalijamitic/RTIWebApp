import { Component, Input, OnInit } from '@angular/core';
import { IDoneProject } from '../research-projects/research-projects.component';
import uuid from 'uuid';

@Component({
  selector: 'research-projects-card',
  templateUrl: './research-projects-card.component.html',
  styleUrls: ['./research-projects-card.component.scss']
})
export class ResearchProjectsCardComponent implements OnInit {

  @Input() project: IDoneProject;

  public id = `collapse${uuid.v4()}`;
  constructor() { }

  ngOnInit(): void {
  }

}
