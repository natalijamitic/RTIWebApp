import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from '../employees/employees.component';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { EmployeesService } from '../Services/Employees/employees.service';
import { UsersService } from '../Services/Users/users.service';

@Component({
  selector: 'display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit, OnDestroy {

  public employeeTitles = ["istrazivac", "laboratorijski inzenjer", "laboratorijski tehnicar", "redovni profesor", "vanredni profesor", "docent", "asistent", "saradnik u nastavi"];

  public user: IUser = null;

  public employeeOld: IEmployee = null;
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
    status: "Status",
    type: null,
    subjects: null
  };

  public msg: string = null;

  public pass1: string = null;
  public pass2: string = null;
  public firstLogin: string = "Prvo logovanje";

  private subscription: Subscription = null;

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  file: any;
  fileInputLabel: string;
  imgH: number = -1;
  imgW: number = -1;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService, private employeeService: EmployeesService, private formBuilder: FormBuilder, private authService: AuthenticationService) {
    this.subscription = this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = JSON.parse(this.router.getCurrentNavigation().extras.state.employee);
        this.firstLogin = this.user.firstLogin;

        this.employeeService.getEmployeeByUsername(this.user.username).subscribe((result: any) => {
          console.log(result);
          this.employeeOld = result;
          this.employee = {
            username: this.employeeOld.username,
            firstName: this.employeeOld.firstName,
            lastName: this.employeeOld.lastName,
            address: this.employeeOld.address,
            phoneNumber: this.employeeOld.phoneNumber,
            webpage: this.employeeOld.webpage,
            personalInfo: this.employeeOld.personalInfo,
            title: this.employeeOld.title,
            roomNumber: this.employeeOld.roomNumber,
            status: this.employeeOld.status,
            type: this.employeeOld.type,
            subjects: this.employeeOld.subjects
          };

          setTimeout(() => {
            (document.getElementById("selectTitleBox") as HTMLInputElement).value = this.employee.title;
          });
        })
      }
    });

    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  public update(): void {
    if (this.imgTooBig()) {
      return;
    }

    if ((this.pass1 && !this.pass2) || (!this.pass1 && this.pass2) || (this.pass1 && this.pass2 && this.pass1 != this.pass2)) {
      this.msg = "Sifre moraju da se podudaraju";
      return;
    }

    if (!this.isTeacher()) {
      this.employee.roomNumber = null;
      this.employee.type = 'laborant';
    } else {
      this.employee.type = 'nastavnik';
    }

    let employeeNew: IEmployee = {
      username: this.employee.username ? this.employee.username : this.user.username,
      firstName: this.employee.firstName ? this.employee.firstName : this.employeeOld.firstName,
      lastName: this.employee.lastName ? this.employee.lastName : this.employeeOld.lastName,
      address: this.employee.address ? this.employee.address : this.employeeOld.address,
      phoneNumber: this.employee.phoneNumber,
      webpage: this.employee.webpage,
      personalInfo: this.employee.personalInfo,
      title: this.employee.title,
      roomNumber: this.employee.roomNumber,
      status: this.employee.status,
      type: this.employee.type,
      subjects: this.employeeOld.subjects
    };

    let newUser: IUser = {
      username: this.employee.username ? this.employee.username : this.user.username,
      password: this.pass1 ? this.pass1 : this.user.password,
      firstLogin: this.firstLogin != "Prvo logovanje" ? this.firstLogin : this.user.firstLogin,
      type: this.user.type
    }

    this.msg = '';
    console.log(employeeNew);

    this.usersService.updateUser(this.user, newUser).subscribe((result: any) => {
      console.log(result);

      this.employeeService.updateEmployee(this.employeeOld, employeeNew).subscribe((result: any) => {
        console.log(result);
        this.user = newUser;
        this.msg = 'Uspesno izmenjeno.';
        this.uploadImage(result);

      })
    }, (error:HttpErrorResponse) => {
      this.msg = error.error.msg
    })

  }

  public uploadImage(result: any): void {

    if (!this.fileUploadForm.get('uploadedImage').value) {
      this.msg = result.msg;
      return;
    }

    const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
    formData.append('employeeUsername', `${this.employee.username}`);

    this.authService.postImage(formData).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.uploadFileInput.nativeElement.value = "";
        this.fileInputLabel = undefined;
        this.fileUploadForm.get('uploadedImage').setValue(null);

        this.msg = 'Uspesno izmenjeno.';
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

  private imgTooBig(): boolean {
    if (this.fileUploadForm.get('uploadedImage').value) {
      if (this.imgH > 300 || this.imgW > 300) {
        this.msg = "Slika moze biti maksimalnih dimenzija 300 x 300 px";
        this.uploadFileInput.nativeElement.value = "";
        this.fileInputLabel = undefined;
        this.fileUploadForm.get('uploadedImage').setValue(null);
        return true;
      } else {
        this.msg = '';
      }
    }
    return false;
  }
}
