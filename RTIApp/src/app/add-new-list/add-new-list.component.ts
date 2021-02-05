import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from '../employees/employees.component';
import { ISubjectShort } from '../master/master.component';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { IList, SubjectsService } from '../Services/Subjects/subjects.service';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';

@Component({
  selector: 'add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.scss']
})
export class AddNewListComponent implements OnInit {
  public user: IUser;
  public empl: IEmployee;

  public subjects: ISubjectShort[] = [];
  public lists: IList[] = [];
  public newList: IList = null;
  public msg: string;

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;
  private sub5: Subscription;
  private sub6: Subscription;
  private sub7: Subscription;
  private sub8: Subscription;

  constructor(private authService: AuthenticationService,
    private employeeService: EmployeesService,
    private subjectService: SubjectsService,
    private uploadService: UploadFilesService,
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

          this.sub4 = this.subjectService.getSubjectsByCodes(result).subscribe((s: any) => {
            for (let subj of s) {
              this.subjects.push({
                code: subj.code,
                title: subj.title,
                type: subj.type,
                timetable: subj.timetable,
                semestar: subj.semestar,
                espb: subj.espb
              });
            }

            this.initNewList();
          });

          this.sub5 = this.subjectService.getAllListsByAuthor(this.empl.username).subscribe((l: any) => {
            this.lists = [...l];
            this.checkIfValidLists();
          })
        })

      })
    });
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    this.sub5?.unsubscribe();
    this.sub6?.unsubscribe();
    this.sub7?.unsubscribe();
    this.sub8?.unsubscribe();
  }

  public checkIfValidLists() {
    let now = new Date();
    for (let i = 0; i < this.lists.length; i++) {
      this.lists[i].valid = (new Date(this.lists[i].deadline)).getTime() < now.getTime() ? false : true;
    }
  }

  public initNewList() {
    if (this.subjects.length == 0) {
      this.newList = null;
      return;
    }
    this.newList = {
      author: this.empl.username,
      code: this.subjects[0].code,
      deadline: null,
      place: '',
      time: '',
      valid: true,
      title: '',
      limit: 0,
      created: null,
      files: []
    }
  }

  public addList() {
    if (!this.newList.code || !this.newList.deadline || !this.newList.place || !this.newList.time || !this.newList.title) {
      this.msg = "Popunite sva obavezna polja";
      return;
    }
    this.msg = '';
    this.newList.created = new Date();

    this.sub8?.unsubscribe();
    this.sub8 = this.subjectService.insertList(this.newList).subscribe((result: any) => {
      this.lists.push({...this.newList});
      this.initNewList();
      console.log(result);
    })
  }

  public lockList(num: number) {
    this.lists[num].valid = false;
    this.updateList(num);
  }

  public updateList(num: number): void {
    this.sub7?.unsubscribe();

    this.sub7 = this.subjectService.updateList(this.lists[num].created, this.lists[num]).subscribe((result: any) => {
      console.log(result);
    })
  }

  public downloadFile(fileName: string): void {
    this.sub6?.unsubscribe();

    this.sub6 = this.uploadService.downloadNotificationFile(fileName).subscribe((result: any) => {
      UploadFilesService.openDownloadedFile(result);
    });
  }
}
