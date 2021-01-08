import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IStudent, IUser } from '../registration/registration.component';
import { StudentService } from '../Services/Students/student.service';
import { UsersService } from '../Services/Users/users.service';

@Component({
  selector: 'display-student',
  templateUrl: './display-student.component.html',
  styleUrls: ['./display-student.component.scss']
})
export class DisplayStudentComponent implements OnInit, OnDestroy {

  public user: IUser = null;

  public studentOld: IStudent = null;
  public student: IStudent = {
    username: null,
    firstName: null,
    lastName: null,
    index: null,
    studyType: null,
    status: null
  };
  private _studentUsername = "piGGBBBBx";

  public get studentUsername(): string {
    this._studentUsername = `${this.student.lastName ? this.student.lastName[0].toLowerCase() : this.studentOld?.lastName[0]?.toLowerCase()}${this.student.firstName ? this.student.firstName[0].toLowerCase() : this.studentOld?.firstName[0]?.toLowerCase()}${this.student.index?.length > 2 ? this.student.index[2] : this.studentOld?.index[2]}${this.student.index?.length > 3 ? this.student.index[3] : this.studentOld?.index[3]}${this.student.index?.length > 8 ? this.student.index.substr(5, 4) : this.studentOld?.index.substr(5, 4)}${this.student.studyType !== 'Tip studija' ? this.student.studyType : 'x'}`;
    return this._studentUsername;
  }

  public msg: string = null;

  public pass1: string = null;
  public pass2: string = null;
  public firstLogin: string = "Prvo logovanje";

  private subscription: Subscription = null;

  constructor(private route: ActivatedRoute, private router: Router,
    private usersService: UsersService,
    private studentsService: StudentService) {
    this.subscription = this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = JSON.parse(this.router.getCurrentNavigation().extras.state.employee);
        this.firstLogin = this.user.firstLogin;

        this.studentsService.getStudentByUsername(this.user.username).subscribe((result: any) => {
          console.log(result);
          this.studentOld = result;
          this.student = {
            username: this.studentOld.username,
            firstName: this.studentOld.firstName,
            lastName: this.studentOld.lastName,
            index: this.studentOld.index,
            studyType: this.studentOld.studyType,
            status: this.studentOld.status
          };

        })
      }
    });

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public update(): void {
    if ((this.pass1 && !this.pass2) || (!this.pass1 && this.pass2) || (this.pass1 && this.pass2 && this.pass1 != this.pass2)) {
      this.msg = "Sifre moraju da se podudaraju";
      return;
    }


    let studentNew: IStudent = {
      username: `${this.studentUsername}@student.etf.rs`,
      firstName: this.student.firstName ? this.student.firstName : this.studentOld.firstName,
      lastName: this.student.lastName ? this.student.lastName : this.studentOld.lastName,
      index: this.student.index ? this.student.index : this.studentOld.index,
      studyType: this.student.studyType ? this.student.studyType : this.studentOld.studyType,
      status: this.student.status,
    };

    let newUser: IUser = {
      username: `${this.studentUsername}@student.etf.rs`,
      password: this.pass1 ? this.pass1 : this.user.password,
      firstLogin: this.firstLogin != "Prvo logovanje" ? this.firstLogin : this.user.firstLogin,
      type: this.user.type
    }

    this.msg = '';
    console.log(studentNew);

    if (studentNew.index == this.studentOld.index && studentNew.studyType == this.studentOld.studyType) {
      this.updateStudent(studentNew, newUser);
    } else {
      this.studentsService.existsStudent(studentNew).subscribe((result: any) => {
        this.updateStudent(studentNew, newUser);
      }, (error: HttpErrorResponse) => {
        this.msg = "Postoji vec korisnik s datim indeksom na datim studijama."
      })
    }

  }

  public updateStudent(studentNew: IStudent, newUser: IUser) {
    this.usersService.updateUser(this.user, newUser).subscribe((result: any) => {
      console.log(result);

      this.studentsService.updateStudent(this.studentOld, studentNew).subscribe((result: any) => {
        console.log(result);
        this.user = newUser;
        this.studentOld = studentNew;
        this.msg = 'Uspesno izmenjeno.';
      })

    }, (error: HttpErrorResponse) => {
      this.msg = error.error.msg
    })
  }
}
