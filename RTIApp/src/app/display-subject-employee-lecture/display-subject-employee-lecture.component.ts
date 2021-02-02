import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from '../employees/employees.component';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { ISubjectFull, SubjectsService } from '../Services/Subjects/subjects.service';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';

export interface IFileInfo {
  original: string;
  title: string;
  author: string;
  date: Date;
  size: number;
  type: string;
}

@Component({
  selector: 'display-subject-employee-lecture',
  templateUrl: './display-subject-employee-lecture.component.html',
  styleUrls: ['./display-subject-employee-lecture.component.scss']
})
export class DisplaySubjectEmployeeLectureComponent implements OnInit {
  public loggedInUser: IUser = null;
  public fullName: string;

  public code: string;
  public subject: ISubjectFull = null;

  public files: IFileInfo[] = [];

  public msg: string;

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;
  private sub5: Subscription;

  @ViewChild('uploadFiles') uploadFiles: UploadFilesComponent;

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

      this.sub2 = this.authService.isLoggedIn.subscribe((user: any) => {
        this.loggedInUser = JSON.parse(user);

        if (this.loggedInUser && this.loggedInUser.type == 'zaposlen') {
          this.sub3 = this.empService.getSubjectsForEmployee(this.loggedInUser.username).subscribe((subjects: Array<string>) => {
            if (!subjects.find((s: string) => s == this.code)) {
              this.router.navigate(["/error"]);
            }

            this.empService.getEmployeeByUsername(this.loggedInUser.username).subscribe((emp: IEmployee) => {
              this.fullName = emp.firstName + "`" + emp.lastName;
              this.uploadFiles.info = {
                title: '',
                username: this.fullName
              }
            })
          });
        }
      });
    },
      (error: HttpErrorResponse) => {
        this.router.navigate(["/error"]);
      });
  }

  public initFiles(): void {
    this.files = [];
    for (let file of this.subject.lectures) {
      let info: string[] = file.split('`');
      this.files.push({
        original: file,
        title: info[0].substring(0, info[0].indexOf('.')),
        author: `${info[2]} ${info[3]}`,
        date: new Date(parseInt(info[5].substring(0, info[5].indexOf('.')))),
        size: parseInt(info[4]),
        type: file.substr(file.lastIndexOf("."))
      })
    }
  }

  public deleteFile(file): void {
    this.subject.lectures = this.subject.lectures.filter((f: string) => f != file);
    this.initFiles();
    this.updateSubject();
  }

  public sortFiles(): void {
    this.subject.lectures = [];
    for (let file of this.files) {
      this.subject.lectures.push(file.original);
    }
    this.updateSubject();
  }

  public downloadFile(fileName: string): void {
    this.sub5?.unsubscribe();

    this.sub5 = this.uploadService.downloadNotificationFile(fileName).subscribe((result: any) => {
      UploadFilesService.openDownloadedFile(result);
    });
  }

  public filesUploaded($event): void {
    for (let file of $event.fileNames) {
      this.subject.lectures.push(file);
    }
    this.initFiles();
    this.updateSubject();
  }

  public add(): void {
    this.uploadFiles.uploadFiles();
  }

  public updateSubject(): void {
    this.subjService.updateSubject(this.code, this.subject).subscribe((result: any) => {
      console.log(result);
      this.msg = "Uspeh";
    })
  }

}
