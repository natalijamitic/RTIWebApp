import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISubjectShort } from '../master/master.component';
import { IStudent, IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { StudentService } from '../Services/Students/student.service';
import { SubjectsService } from '../Services/Subjects/subjects.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit, OnDestroy {

  public loggedInUser: IUser;
  public loggedInStudent: IStudent;

  public msg: string;

  public selectedSubject: [{ code: string }];
  public allSubjects: Array<ISubjectShort> = null;
  public subjects: Array<ISubjectShort> = null;
  public dropdownSettingsSubject: IDropdownSettings = {};

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;

  constructor(private authService: AuthenticationService,
              private studService: StudentService,
              private subjectService: SubjectsService) { }

  ngOnInit(): void {
    this.sub1 = this.authService.isLoggedIn.subscribe((user: any) => {
      this.loggedInUser = JSON.parse(user);

      if (this.loggedInUser && this.loggedInUser.type == 'student') {
        this.sub2 = this.studService.getStudentByUsername(this.loggedInUser.username).subscribe((stud: IStudent) => {
          this.loggedInStudent = stud;

          this.sub3 = this.subjectService.getAllSubjects().subscribe((result: Array<ISubjectShort>) => {
            this.allSubjects = [...result];
            this.subjects = result.filter((subj: ISubjectShort) => !this.loggedInStudent.subjects.find((s: string) => s == subj.code));

            console.log(this.loggedInStudent);
            console.log(this.subjects);
            console.log(this.allSubjects);
          })

        })
      }
    });


    this.dropdownSettingsSubject = {
      singleSelection: false,
      idField: 'code',
      textField: 'code',
      allowSearchFilter: true,
    }
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }

  public deleteSubject(subject: string, num: number): void {
    console.log(subject);
    this.studService.deleteSubject(this.loggedInStudent.username, subject).subscribe((result: any) => {
      this.loggedInStudent.subjects.splice(num, 1);
      this.subjects = this.allSubjects.filter((subj: ISubjectShort) => !this.loggedInStudent.subjects.find((s: string) => s == subj.code));
    })
  }

  public insertSubject(): void {
    if (!this.selectedSubject || this.selectedSubject.length < 1) {
      this.msg = "Izaberite makar jedan predmet."
      return;
    }

    let subjects: string[] = [];
    for (let sub of this.selectedSubject) {
      subjects.push(sub.code);
    }
    console.log(subjects);

    this.studService.insertSubjects(this.loggedInStudent.username, subjects).subscribe((result: any) => {
      this.loggedInStudent.subjects.push(...subjects);
      this.subjects = this.allSubjects.filter((subj: ISubjectShort) => !this.loggedInStudent.subjects.find((s: string) => s == subj.code));
      this.selectedSubject = null;
    })

  }

}
