import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../registration/registration.component';
import { UsersService } from '../Services/Users/users.service';

@Component({
  selector: 'display-admin',
  templateUrl: './display-admin.component.html',
  styleUrls: ['./display-admin.component.scss']
})
export class DisplayAdminComponent implements OnInit, OnDestroy {

  public user: IUser = null;

  public msg: string = null;

  public username: string = null;
  public pass1: string = null;
  public pass2: string = null;
  public firstLogin: string = "Prvo logovanje";

  private subscription: Subscription = null;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) {
    this.subscription = this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = JSON.parse(this.router.getCurrentNavigation().extras.state.employee);
        console.log(this.user)
        this.username = this.user.username;
        this.firstLogin = this.user.firstLogin;
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

    this.msg = '';
    let updateUser: IUser = {
      username: this.username ? this.username : this.user.username,
      password: this.pass1 ? this.pass1 : this.user.password,
      firstLogin: this.firstLogin != "Prvo logovanje" ? this.firstLogin : this.user.firstLogin,
      type: this.user.type
    };

    console.log(updateUser);
    this.usersService.updateUser(this.user, updateUser).subscribe((result: any) => {
      console.log(result);
      this.user = updateUser;
      this.msg = 'Uspesno izmenjeno.';
    }, (error:HttpErrorResponse) => {
      this.msg = error.error.msg
    })

  }
}
