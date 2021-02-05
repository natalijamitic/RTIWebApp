import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFileInfo } from '../display-subject-employee-exam-materials/display-subject-employee-exam-materials.component';
import { IEmployee } from '../employees/employees.component';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { ISubjectFull, ISubjLab, SubjectsService } from '../Services/Subjects/subjects.service';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';

export interface ILabFiles {
  labDescription: string;
  labMaterials: IFileInfo[];
  original: string;
}

@Component({
  selector: 'display-subject-employee-lab-materials',
  templateUrl: './display-subject-employee-lab-materials.component.html',
  styleUrls: ['./display-subject-employee-lab-materials.component.scss']
})
export class DisplaySubjectEmployeeLabMaterialsComponent implements OnInit {
  public loggedInUser: IUser = null;
  public fullName: string;

  public code: string;
  public subject: ISubjectFull = null;

  public files: ILabFiles[] = [];

  public newLab: ISubjLab;

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
      this.initNewLab();

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

  public initNewLab(): void {
    this.newLab = {
      labMaterials: [],
      labDescription: ''
    }
  }

  public initFiles(): void {
    this.files = [];
    if (this.subject.lab.labs.length == 0)
      return;
    for (let lab of this.subject.lab.labs) {

      let labMaterials: IFileInfo[] = [];
      for (let file of lab.labMaterials) {
        let info: string[] = file.split('`');
        labMaterials.push({
            original: file,
            title: info[0].substring(0, info[0].indexOf('.')),
            author: `${info[2]} ${info[3]}`,
            date: new Date(parseInt(info[5].substring(0, info[5].indexOf('.')))),
            size: parseInt(info[4]),
            type: file.substr(file.lastIndexOf("."))
        })
      }
      let l: ILabFiles = {
        labDescription: lab.labDescription,
        labMaterials: labMaterials,
        original: JSON.stringify(lab)
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
    if (this.subject.lab.numberOfLabs > 0) {
      this.subject.bLab = true;
    }
    this.updateSubject();
  }

  public deleteLab(num): void {
    this.subject.lab.labs.splice(num, 1);
    this.initFiles();
    this.updateSubject();
  }

  public addNewLab(): void {
    this.subject.lab.labs.push(this.newLab);
    this.subject.bLab = true;
    this.initFiles();
    this.initNewLab();
    this.updateSubject();
  }
}
