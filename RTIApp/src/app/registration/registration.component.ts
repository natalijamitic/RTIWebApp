import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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
export class RegistrationComponent implements OnInit, OnDestroy {

  private _studentUsername = "piGGBBBBx";

  public get studentUsername(): string {
    this._studentUsername = `${this.student.lastName ? this.student.lastName[0].toLowerCase() : 'p'}${this.student.firstName ? this.student.firstName[0].toLowerCase() : 'i'}${this.student.index?.length > 2 ? this.student.index[2] : 'G'}${this.student.index?.length > 3 ? this.student.index[3] : 'G'}${this.student.index?.length > 8 ? this.student.index.substr(5, 4) : 'BBBB'}${this.student.studyType !== 'Tip studija' ? this.student.studyType : 'x'}`;
    return this._studentUsername;
  }

  public employeeTitles = ["istrazivac", "laboratorijski inzenjer", "laboratorijski tehnicar", "redovni profesor", "vanredni profesor", "docent", "asistent", "saradnik u nastavi"];

  public employeeUsername: string;
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


  public loggedUser: IUser = null;
  private subscription: Subscription;
  private subscriptionStudent: Subscription;
  private subscriptionEmployee: Subscription;

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  file: any;
  fileInputLabel: string;
  imgH: number = -1;
  imgW : number = -1;
  public slika: string = null;

  public constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn.subscribe((user: any) => {
      this.loggedUser = JSON.parse(user);
    });

    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }

  onFileSelect(event) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        this.imgH = img.naturalHeight;
        this.imgW = img.naturalWidth;
      };
    };

    this.fileInputLabel = file.name;

    this.fileUploadForm.get('uploadedImage').setValue(file);
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

    this.subscriptionStudent = this.authService.registerStudent(this.userStud, this.student).subscribe(
      (result: any) => {
        this.msgStud = result.msg;
        this.emptyStudent();
      },
      (error: HttpErrorResponse) => {
        this.msgStud = error.error.msg;
      }
    );
  }

  public registerEmployee(): void {

    if (!this.employeeUsername || !this.employee.firstName || !this.employee.lastName || this.employee.title == "Zvanje" || !this.employee.address || !this.emplPass1 || !this.emplPass2 || (this.isTeacher() && !this.employee.roomNumber)) {
      this.msgEmpl = "Unesite sva obavezna polja.";
      return;
    }

    if (this.imgTooBig()) {
      return;
    }

    if (this.emplPass1 !== this.emplPass2) {
      this.msgEmpl = "Unete sifre se ne podudaraju.";
      return;
    }

    this.employee.username = `${this.employeeUsername}@etf.bg.ac.rs`;
    if (!this.isTeacher()) {
      this.employee.roomNumber = null;
      this.employee.type = 'laborant';
    } else {
      this.employee.type = 'nastavnik';
    }
    this.employee.status = 'aktivan';

    this.userEmpl = {
      username: this.employee.username,
      password: this.emplPass1,
      type: 'zaposlen',
      firstLogin: 'yes',
    };

    this.subscriptionEmployee = this.authService.registerEmployee(this.userEmpl, this.employee).subscribe(
      (result: any) => {

        if (this.loggedUser.type == 'admin') {
          this.uploadImage(result);
        } else {
          this.msgEmpl = result.msg;
          this.emptyEmployee();
        }

      },
      (error: HttpErrorResponse) => {
        this.msgEmpl = error.error.msg;
      }
    );
  }

  public uploadImage(result: any): void {

    if (!this.fileUploadForm.get('uploadedImage').value) {
      this.msgEmpl = result.msg;
      this.emptyEmployee();
      return;
    }

    const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
    formData.append('employeeUsername', `${this.employeeUsername}@etf.bg.ac.rs`);

    this.authService.postImage(formData).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.uploadFileInput.nativeElement.value = "";
        this.fileInputLabel = undefined;
        this.fileUploadForm.get('uploadedImage').setValue(null);

        this.msgEmpl = result.msg;
        this.emptyEmployee();
        this.slika = `data:image/png;base64,${response.finalImg.image}`;
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      alert(error.error.error);
    });

  }

  public isTeacher(): boolean {
    if (!this.employee.title || this.employeeTitles.findIndex((title: String) => title === this.employee.title) < 3) {
      return false;
    }
    return true;
  }

  public ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    if (this.subscriptionEmployee)
      this.subscriptionEmployee.unsubscribe();
    if (this.subscriptionStudent)
      this.subscriptionStudent.unsubscribe();
  }

  private imgTooBig(): boolean {
    if (this.fileUploadForm.get('uploadedImage').value) {
      if (this.imgH > 300 || this.imgW > 300) {
        this.msgEmpl = "Slika moze biti maksimalnih dimenzija 300 x 300 px";
        this.uploadFileInput.nativeElement.value = "";
        this.fileInputLabel = undefined;
        this.fileUploadForm.get('uploadedImage').setValue(null);
        return true;
      } else {
        this.msgEmpl = '';
      }
    }
    return false;
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

  private emptyEmployee(): void {
    this.employee = {
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
    this.userEmpl = {
      username: null,
      password: null,
      type: null,
      firstLogin: null,
    };
    this.emplPass1 = null;
    this.employeeUsername = null;
    this.emplPass2 = null;
  }
}
