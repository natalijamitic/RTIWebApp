import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFileInfo } from '../display-subject-employee-exam-materials/display-subject-employee-exam-materials.component';
import { IEmployee } from '../employees/employees.component';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { ISubjectFull, ISubjProject, SubjectsService } from '../Services/Subjects/subjects.service';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';

export interface IProjectFiles {
  basicInfo: string;
  examinationProcess: string;
  projectMaterials: IFileInfo[];
  original: string;
}

@Component({
  selector: 'display-subject-employee-project-materials',
  templateUrl: './display-subject-employee-project-materials.component.html',
  styleUrls: ['./display-subject-employee-project-materials.component.scss']
})
export class DisplaySubjectEmployeeProjectMaterialsComponent implements OnInit {
  public loggedInUser: IUser = null;
  public fullName: string;

  public code: string;
  public subject: ISubjectFull = null;

  public files: IProjectFiles[] = [];

  public newProject: ISubjProject;

  public msg: string;

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;

  constructor(private authService: AuthenticationService,
    private empService: EmployeesService,
    private subjService: SubjectsService,
    private uploadService: UploadFilesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((value: any) => {
      this.initComponent(value[1].path);
    })
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
  }

  public initComponent(code: string): void {
    this.code = code;

    this.sub4 = this.subjService.getSubjectByCode(this.code).subscribe((subject: ISubjectFull) => {

      if (!subject) {
        this.router.navigate(["/error"]);
      }

      this.subject = subject;
      this.initFiles();
      this.initNewProject();

      this.sub2 = this.authService.isLoggedIn.subscribe((user: any) => {
        this.loggedInUser = JSON.parse(user);

        if (this.loggedInUser && this.loggedInUser.type == 'zaposlen') {
          this.sub3 = this.empService.getSubjectsForEmployee(this.loggedInUser.username).subscribe((subjects: Array<string>) => {
            if (!subjects.find((s: string) => s == this.code)) {
              this.router.navigate(["/error"]);
            }

            this.empService.getEmployeeByUsername(this.loggedInUser.username).subscribe((emp: IEmployee) => {
              this.fullName = emp.firstName + "`" + emp.lastName;
            })
          });
        }
      });
    },
      (error: HttpErrorResponse) => {
        this.router.navigate(["/error"]);
      });
  }

  public initNewProject(): void {
    this.newProject = {
      basicInfo: '',
      examinationProcess: '',
      projectMaterials: []
    }
  }

  public initFiles(): void {
    this.files = [];
    if (this.subject.project.projects.length == 0)
      return;

    for (let proj of this.subject.project.projects) {
      let projMaterials: IFileInfo[] = [];

      for (let file of proj.projectMaterials) {
        let info: string[] = file.split('`');
        projMaterials.push({
            original: file,
            title: info[0].substring(0, info[0].indexOf('.')),
            author: `${info[2]} ${info[3]}`,
            date: new Date(parseInt(info[5].substring(0, info[5].indexOf('.')))),
            size: parseInt(info[4]),
            type: file.substr(file.lastIndexOf("."))
        })
      }
      let l: IProjectFiles = {
        basicInfo: proj.basicInfo,
        examinationProcess: proj.examinationProcess,
        projectMaterials: projMaterials,
        original: JSON.stringify(proj)
      }

      this.files.push(l);
    }
  }

  public newSubject($event): void {
    this.subject = $event.subject;
    this.initFiles();
    this.updateSubject();
  }

  public updateSubject(): void {
    this.subjService.updateSubject(this.code, this.subject).subscribe((result: any) => {
      alert("Uspeh");
      this.msg = "Uspeh";
    })
  }

  public update(): void {
    this.updateSubject();
  }

  public deleteProject(num): void {
    this.subject.project.projects.splice(num, 1);
    this.initFiles();
    this.updateSubject();
  }

  public addNewProject(): void {
    this.subject.project.projects.push(this.newProject);
    this.initFiles();
    this.initNewProject();
    this.updateSubject();
  }
}
