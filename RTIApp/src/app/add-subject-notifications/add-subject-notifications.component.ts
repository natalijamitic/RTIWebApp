import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { IEmployee } from '../employees/employees.component';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { SubjectsService } from '../Services/Subjects/subjects.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';

declare const tinymce: any;

export interface INotification {
  title: string;
  dateCreation: Date;
  content: string;
  creator: string;
  files?: string[];
}

@Component({
  selector: 'add-subject-notifications',
  templateUrl: './add-subject-notifications.component.html',
  styleUrls: ['./add-subject-notifications.component.scss']
})
export class AddSubjectNotificationsComponent implements OnInit, OnDestroy {

  public dropdownSettings: IDropdownSettings = {};
  public selectedSubjects: [];
  public subjects: Array<string> = null;

  public title: string;
  public dateCreation = null;

  public msg: string;

  public subjectsNotif: string[] = [];
  public notification: INotification = {
    title: null,
    content: null,
    dateCreation: null,
    creator: null
  }

  public user: IUser;
  public empl: IEmployee;
  public info: any = null;

  @ViewChild('uploadFiles') uploadFiles: UploadFilesComponent;

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;

  constructor(private authService: AuthenticationService,
    private employeeService: EmployeesService,
    private subjectService: SubjectsService,
    private router: Router) { }

  ngOnInit(): void {

    this.sub1 = this.authService.isLoggedIn.subscribe((result: any) => {
      this.user = JSON.parse(result);

      if (!this.user)
        return;

      this.sub2 = this.employeeService.getEmployeeByUsername(this.user.username).subscribe((employee: IEmployee) => {
        this.empl = employee;

        if (this.empl.type != 'nastavnik') {
          this.router.navigate(['/error']);
          return;
        }

        this.sub3 = this.employeeService.getSubjectsForEmployee(this.user.username).subscribe((result: Array<string>) => {
          this.subjects = result;
          console.log(this.subjects);
        })

      })
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: '',
      textField: '',
      enableCheckAll: false,
      allowSearchFilter: true,
    }
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
  }


  public add(): void {
    let content = tinymce.activeEditor.getContent();
    if (!this.title || !content || !this.selectedSubjects || this.selectedSubjects.length < 1) {
      this.msg = "Popunite sva obavezna polja.";
      return;
    }
    this.msg = "";

    this.notification = {
      title: this.title,
      content: content,
      dateCreation: this.dateCreation,
      creator: this.user.username
    }
    this.subjectsNotif = [...this.selectedSubjects];

    this.uploadFiles.info = {
      title: this.title,
      username: this.user.username
    }
    this.uploadFiles.uploadFiles();
  }

  public filesUploaded($event) {
    this.notification.files = $event.fileNames;
    this.subjectService.postNotification(this.notification, this.subjectsNotif).subscribe((result: any) => {
    })
  }
}
