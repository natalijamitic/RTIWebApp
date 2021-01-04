import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../Services/Projects/projects.service';

export interface IDoneProject {
  title: string;
  members: Array<String>;
  description: string;
}

@Component({
  selector: 'research-projects',
  templateUrl: './research-projects.component.html',
  styleUrls: ['./research-projects.component.scss']
})
export class ResearchProjectsComponent implements OnInit {

  public projects: Array<IDoneProject>;

  constructor(private projService: ProjectsService) { }

  ngOnInit(): void {
    this.projService.getAllDoneProjects().subscribe((result: Array<IDoneProject>) => {

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
