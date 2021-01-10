import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ISubjectShort } from '../master/master.component';
import * as uuid from 'uuid'
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { Subscription } from 'rxjs';
import { IStudent, IUser } from '../registration/registration.component';
import { StudentService } from '../Services/Students/student.service';

@Component({
  selector: 'master-card',
  templateUrl: './master-card.component.html',
  styleUrls: ['./master-card.component.scss']
})
export class MasterCardComponent implements OnInit, OnDestroy {

  @Input() semestar: number;
  @Input() subjects: Array<ISubjectShort>;

  public id = `collapse${uuid.v4()}`;

  public loggedInUser: IUser = null;
  public loggedInStudent: IStudent = null;

  private sub1: Subscription;

  constructor(private authService: AuthenticationService,
              private studService: StudentService) { }

  ngOnInit(): void {
    this.sub1 = this.authService.isLoggedIn.subscribe((user: any) => {
      this.loggedInUser = JSON.parse(user);

      if (this.loggedInUser && this.loggedInUser.type == 'student') {
        this.studService.getStudentByUsername(this.loggedInUser.username).subscribe((stud: IStudent) => {
          this.loggedInStudent = stud;
        })
      }

    });
  }

  ngOnDestroy(): void {
    if(this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  public showSubjectLink(subj: ISubjectShort): boolean {
    if (!this.loggedInStudent || !this.loggedInStudent.subjects) {
      return false;
    }
    if (this.loggedInStudent.subjects.find((s: string) => s == subj.code)) {
      return true;
    }
    return false;
  }

}
