import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../employees/employees.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

export interface IUser {
  username: string;
  password: string;
  type: string;
  firstLogin: string;
}

export interface IStudent {
  username: string;
  index: string;
  studyType: string;
  firstName: string;
  lastName: string;
  status: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private _studentUsername = "piGGBBBBx";

  public get studentUsername(): string {
    this._studentUsername = `${this.student.lastName ? this.student.lastName[0].toLowerCase() : 'p'}${this.student.firstName ? this.student.firstName[0].toLowerCase() : 'i'}${this.student.index?.length > 2 ? this.student.index[2] : 'G'}${this.student.index?.length > 3 ? this.student.index[3] : 'G'}${this.student.index?.length > 8 ? this.student.index.substr(5, 4) : 'BBBB'}${this.student.studyType !== 'Tip studija' ? this.student.studyType : 'x'}`;
    return this._studentUsername;
  }

  public employeeTitles = ["Istrazivac", "Laboratorijski inzenjer", "Laboratorijski tehnicar", "Redovni profesor", "Vanredni profesor", "Docent", "Asistent", "Saradnik u nastavi"];

  public employee: IEmployee = {
    username: null,
    firstName: null,
    lastName: null,
    address: null,
    phoneNumber: null,
    webpage: null,
    personalInfo: null,
    title: "Zvanje",
    roomNumber: null,
    status: null,
    type: null,
    subjects: null,
  };
  public userEmpl: IUser = {
    username: null,
    password: null,
    type: null,
    firstLogin: null,
  };
  public emplPass1: string;
  public emplPass2: string;

  public student: IStudent = {
    username: null,
    index: null,
    studyType: "Tip studija",
    firstName: null,
    lastName: null,
    status: null,
  };
  public userStud: IUser = {
    username: null,
    password: null,
    type: null,
    firstLogin: null
  };
  public studPass1: string;
  public studPass2: string;

  public msgEmpl: string = "";
  public msgStud: string = "";

  public constructor(private authService: AuthenticationService) { }

  public ngOnInit(): void {
  }

  public registerStudent(): void {
    // All mandatory fields typed in.
    if (!this.student.firstName || !this.student.lastName || !this.studPass1 || !this.studPass2 || !this.student.index || this.student.studyType === "Tip studija") {
      this.msgStud = "Unesite sva obavezna polja.";
      return;
    }

    // Pass confirmation matches original pass.
    if (this.studPass1 !== this.studPass2) {
      this.msgStud = "Unete sifre se ne podudaraju.";
      return;
    }

    // Good format of index.
    if (this.student.index.match(/^[0-9]{4}[/][0-9]{4}$/) == null) {
      this.msgStud = "Indeks nije u dobrom formatu";
      return;
    }

    this.student.username = `${this.studentUsername}@student.etf.rs`;
    this.student.status = 'aktivan';

    this.userStud = {
      username: `${this.studentUsername}@student.etf.rs`,
      password: this.studPass1,
      type: 'student',
      firstLogin: 'yes'
    };

    this.authService.registerStudent(this.userStud, this.student).subscribe(
      (result: any) => {
        this.msgStud = result.msg;
        this.emptyStudent();
      },
      (error: HttpErrorResponse) => {
        this.msgStud = error.error.msg;
      }
    )
  }

  public registerEmployee(): void {
    if (!this.emplPass1 || !this.emplPass2) {
      this.msgEmpl = "Unesite sva obavezna polja.";
      return;
    }
    if (this.emplPass1 !== this.emplPass2) {
      this.msgEmpl = "Unete sifre se ne podudaraju.";
      return;
    }
    this.msgEmpl = "";
  }

  public isTeacher(): boolean {
    if (!this.employee.title || this.employeeTitles.findIndex((title: String) => title === this.employee.title) < 3) {
      return false;
    }
    return true;
  }

  private emptyStudent(): void {
    this.student = {
      username: null,
      index: null,
      studyType: "Tip studija",
      firstName: null,
      lastName: null,
      status: null,
    };
    this.userStud = {
      username: null,
      password: null,
      type: null,
      firstLogin: null
    };
    this.studPass1 = null;
    this.studPass2 = null;
  }
}
