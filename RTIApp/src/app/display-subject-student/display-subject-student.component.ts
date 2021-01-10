import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IStudent, IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { StudentService } from '../Services/Students/student.service';

@Component({
  selector: 'display-subject-student',
  templateUrl: './display-subject-student.component.html',
  styleUrls: ['./display-subject-student.component.scss']
})
export class DisplaySubjectStudentComponent implements OnInit, OnDestroy {


  public loggedInUser: IUser = null;
  public loggedInStudent: IStudent = null;

  public code: string;

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;

  constructor(private authService: AuthenticationService,
              private studService: StudentService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.sub1 = this.activatedRoute.params.subscribe(params => {
      this.initComponent(params['code']);
    });
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

  public initComponent(code: string): void {
    this.code = code;

    this.sub2 = this.authService.isLoggedIn.subscribe((user: any) => {
      this.loggedInUser = JSON.parse(user);

      if (this.loggedInUser && this.loggedInUser.type == 'student') {
        this.sub3 = this.studService.getStudentByUsername(this.loggedInUser.username).subscribe((stud: IStudent) => {
          this.loggedInStudent = stud;
          if (!this.loggedInStudent.subjects.find((s: string) => s == this.code)) {
            this.router.navigate(["/error"]);
          }
        });
      }
    });
  }

}
