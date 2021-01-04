import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public error: string;

  public constructor(private authService: AuthenticationService) { }

  public ngOnInit(): void {
  }

  public login(): void{
    this.authService.login(this.username, this.password).subscribe(
      (result: any)=>{
        console.log(result);
        if (result) {

          // this.authService.proba().subscribe((b:Boolean)=>{
          //   console.log("CAO CAO " + b);
          // })
          console.log(result.msg)
        } else {
          console.log("Never");
        }
      },
      (error: HttpErrorResponse) => {
        this.error = error.error.msg
      })
  }
}
