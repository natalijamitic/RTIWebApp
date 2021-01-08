import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {

  @Input()
  public isFirst: boolean = false;

  @Input()
  public user: string;

  public msg: string = null;
  public oldPass: string = null;
  public newPass1: string = null;
  public newPass2: string = null;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public resetPassword(): void {
    if (!this.oldPass || !this.newPass1 || !this.newPass2) {
      this.msg = "Popunite sva obavezna polja.";
      return;
    }

    if (this.newPass1 !== this.newPass2) {
      this.msg = "Novo unete sifre se ne podudaraju.";
      return;
    }

    this.authService.firstLoginPassChange(this.user, this.oldPass, this.newPass1).subscribe(
      (result: any) => {
        alert(result.msg);
        this.authService.logout();
      },
      (error: HttpErrorResponse) => {
        this.msg = error.error.msg;
      }
    )

  }

}
