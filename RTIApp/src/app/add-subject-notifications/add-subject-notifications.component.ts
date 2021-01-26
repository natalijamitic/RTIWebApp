import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { ISubjNotif } from '../display-subject-notifications/display-subject-notifications.component';
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
export class AddSubjectNotificationsComponent implements OnInit, OnDestroy, AfterViewInit {

  public dropdownSettings: IDropdownSettings = {};
  public selectedSubjects: string[] = [];
  public selectedFiles: string[] = [];
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
  public notif: ISubjNotif;
  public notifOld: ISubjNotif;

  public info: any = null;

  public tinymceInit: any;

  @ViewChild('uploadFiles') uploadFiles: UploadFilesComponent;

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;

  constructor(private authService: AuthenticationService,
    private employeeService: EmployeesService,
    private subjectService: SubjectsService,
    private router: Router,
    private route: ActivatedRoute) {

    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.notif = JSON.parse(this.router.getCurrentNavigation().extras.state.notif);
        this.notifOld = JSON.parse(this.router.getCurrentNavigation().extras.state.notif);
        console.log(this.notif)
        if (this.notif) {
          setTimeout(() => {
            tinymce?.activeEditor.setContent(this.notif.notification.content)
          }, 0);
          this.title = this.notif.notification.title;
          this.selectedSubjects.push(this.notif.code);
          if (this.notif.notification.files) {
            this.selectedFiles = [...this.notif.notification.files];
          } else {
            this.notif.notification.files = [];
          }
          this.dateCreation = (this.notif.notification.dateCreation as unknown as string).substr(0, 16);

        }
      }
    });
  }

  ngOnInit(): void {

    this.tinymceInit = {
      height: 250,
      menubar: false,
      dataSpecial: this.notif,
      plugins: [
        'advlist autolink lists link image charmap print',
        'preview anchor searchreplace visualblocks code',
        'fullscreen insertdatetime media table paste',
        'help wordcount'
      ],
      toolbar:
        'undo redo | formatselect | bold italic | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | help'

    }

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

  ngAfterViewInit(): void {

    if (this.notif) {
      setTimeout(() => {
        tinymce.activeEditor.setContent(this.notif.notification.content)
      }, 0);
      setTimeout(() => {
        tinymce.activeEditor.setContent(this.notif.notification.content)
      }, 500);
      setTimeout(() => {
        tinymce.activeEditor.setContent(this.notif.notification.content)
      }, 800);
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
      creator: this.user.username,
      files: []
    }
    this.subjectsNotif = [...this.selectedSubjects];

    this.uploadFiles.info = {
      title: this.title,
      username: this.user.username
    }
    if (!this.uploadFiles.uploadFiles()) {
      this.postNotification();
    }
  }

  public filesUploaded($event) {
    this.notification.files = $event.fileNames;
    this.postNotification();
  }

  public postNotification() {
    if (this.notif) {
      this.notification.files = this.notification.files.concat(this.selectedFiles);
      this.subjectService.deleteNotification(this.notifOld.notification, this.notifOld.code).subscribe((result: any) => {
        this.subjectService.postNotification(this.notification, this.subjectsNotif).subscribe((result: any) => {
          this.router.navigate(['vesti/pregled']);
        })
      });
    }
    else this.subjectService.postNotification(this.notification, this.subjectsNotif).subscribe((result: any) => {
      this.router.navigate(['vesti/pregled']);
    })
  }

}
