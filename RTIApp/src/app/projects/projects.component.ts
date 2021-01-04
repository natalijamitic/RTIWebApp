import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../Services/Projects/projects.service';

export interface IOfferedProject {
  title: string;
  purpose: string;
  description: string;
}

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Array<IOfferedProject>;

  constructor(private projService: ProjectsService) { }

  ngOnInit(): void {
    this.projService.getAllOfferedProjects().subscribe((result: Array<IOfferedProject>) => {

      if (result && result.length > 0) {
        this.projects = result;

        console.log(this.projects);
      }
    },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
