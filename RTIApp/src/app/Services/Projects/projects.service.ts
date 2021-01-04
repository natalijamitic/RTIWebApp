import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { INotification } from 'src/app/notification/notification.component';
import { IOfferedProject } from 'src/app/projects/projects.component';
import { IDoneProject } from 'src/app/research-projects/research-projects.component';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) {

  }

  getAllOfferedProjects() {
    return this.http.get(`${environment.api}/projects/offered`)
      .pipe(
        map((p: any) => {
          let projects: Array<IOfferedProject> = [];
          for (let proj of p) {
            projects.push({
              title: proj.title,
              description: proj.description,
              purpose: proj.purpose
            });
          }
          return projects;
        })
      );
  }

  getAllDoneProjects() {
    return this.http.get(`${environment.api}/projects/done`)
      .pipe(
        map((p: any) => {
          let projects: Array<IDoneProject> = [];
          for (let proj of p) {
            projects.push({
              title: proj.title,
              description: proj.description,
              members: proj.members
            });
          }
          return projects;
        })

      );
  }

}