import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISubjectShort } from '../master/master.component';
import { IStudent, IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { StudentService } from '../Services/Students/student.service';
import { IList, IStudentList, SubjectsService } from '../Services/Subjects/subjects.service';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';

@Component({
  selector: 'app-display-lists-student',
  templateUrl: './display-lists-student.component.html',
  styleUrls: ['./display-lists-student.component.scss']
})
export class DisplayListsStudentComponent implements OnInit {
  public user: IUser;
  public stud: IStudent;

  public subjects: ISubjectShort[] = [];
  public lists: IList[] = [];

  public msg: string;

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;
  private sub5: Subscription;
  private sub6: Subscription;
  private sub7: Subscription;

  constructor(private authService: AuthenticationService,
    private studentsService: StudentService,
    private subjectService: SubjectsService,
    private uploadService: UploadFilesService,
    private router: Router) { }

  ngOnInit(): void {
    this.sub1 = this.authService.isLoggedIn.subscribe((result: any) => {
      this.user = JSON.parse(result);

      if (!this.user || this.user.type != 'student') {
        this.router.navigate(['error']);
        return;
      }

      this.sub2 = this.studentsService.getStudentByUsername(this.user.username).subscribe((student: IStudent) => {
        this.stud = student;

        if (this.stud.subjects == null || this.stud.subjects.length == 0) {
          this.lists = [];
        } else {
          this.sub3 = this.subjectService.getAllListsBySubjects(this.stud.subjects).subscribe((l: any) => {
            this.lists = [...l];
            this.checkIfValidLists();
          });
        }

      });
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
  }

  public checkIfValidLists() {
    let now = new Date();
    for (let i = 0; i < this.lists.length; i++) {
      this.lists[i].valid = (new Date(this.lists[i].deadline)).getTime() < now.getTime() ? false : true;
    }
  }


  public register(num: number) {
    this.lists[num].files.push({ student: this.stud.username });

    this.updateList(num);
  }

  public remove(num: number) {
    this.lists[num].files = this.lists[num].files.filter((f: IStudentList) => {
      return (f.student != this.stud.username);
    })

    this.updateList(num);
  }

  public getFile(num: number): string {
    if (!this.lists) {
      return '';
    }

    for (let f of this.lists[num].files) {
      if (f.file) {
        return f.file;
      }
    }
    return '';
  }

  public showFile(num: number): boolean {
    if (!this.lists) {
      return false;
    }

    for (let f of this.lists[num].files) {
      if (f.student == this.stud.username && f.file) {
        return true;
      }
    }
    return false;

  }

  public canPostFile(num: number): boolean {
    if (this.lists[num].valid && this.lists[num].files.length < this.lists[num].limit) {
      for (let f of this.lists[num].files) {
        if (f.student == this.stud.username && f.file) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  public canRegister(num: number): boolean {
    if (this.lists[num].valid && this.lists[num].files.length < this.lists[num].limit) {
      for (let f of this.lists[num].files) {
        if (f.student == this.stud.username) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  public canRemove(num: number): boolean {
    for (let f of this.lists[num].files) {
      if (f.student == this.stud.username) {
        return true;
      }
    }
    return false;
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

  public listUpdated($event, num: number): void {
    this.lists[num] = $event.list;
    this.updateList(num);
  }
}
