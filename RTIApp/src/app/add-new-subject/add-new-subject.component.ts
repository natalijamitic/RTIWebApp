import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { SubjectsService } from '../Services/Subjects/subjects.service';

export interface ISubjectNew {
  type: string;
  department: string;
  semestar: number;
  title: string;
  code: string;
  timetable: {
    lecture: number,
    exercise: number,
    lab: number,
  };
  espb: number;
  classTime: string[];
  excerTime: string[];
  propositions: string;
  goal: string;
  comment: string;
}

@Component({
  selector: 'add-new-subject',
  templateUrl: './add-new-subject.component.html',
  styleUrls: ['./add-new-subject.component.scss']
})
export class AddNewSubjectComponent implements OnInit {

  public loggedInUser: IUser = null;

  public subject: ISubjectNew = null;

  public classTime: string;
  public excerTime: string;
  public msg: string;

  private sub1: Subscription;
  private sub2: Subscription;

  constructor(private authService: AuthenticationService,
    private subjService: SubjectsService,
    private router: Router) { }

  ngOnInit(): void {
    this.sub1 = this.authService.isLoggedIn.subscribe((user: any) => {
      this.loggedInUser = JSON.parse(user);

      if (this.loggedInUser && this.loggedInUser.type != 'admin') {
        this.router.navigate(["/error"]);
      }

      this.resetNewSubject();
    });
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }

  public resetNewSubject() {
    this.subject = {
      type: '',
      department: '',
      semestar: 1,
      title: '',
      code: '',
      timetable: {
        lecture: 0,
        exercise: 0,
        lab: 0,
      },
      espb: 0,
      classTime: [],
      excerTime: [],
      propositions: '',
      goal: '',
      comment: '',
    }
  }

  public update() {
    if (!this.subject || !this.subject.title || !this.subject.type || !this.subject.goal || !this.subject.propositions ||
        !this.classTime || !this.subject.department || !this.excerTime) {
      this.msg = "Popunite sva obavezna polja.";
      return;
    }
    this.msg = "";
    this.subject.classTime = this.classTime.split(';');
    this.subject.excerTime = this.excerTime.split(";");

    this.sub2?.unsubscribe();

    this.sub2 = this.subjService.insertSubject(this.subject).subscribe((result: any) => {
      console.log(result);
      this.msg = "Uspesno unet predmet";
      this.resetNewSubject();
    }, (error: HttpErrorResponse) => {
      this.msg = error.error.msg
    });

  }

}
