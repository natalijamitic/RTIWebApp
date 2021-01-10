import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: IUser = null;
  public subscription: Subscription;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn.subscribe((user: any) => {
      this.user = JSON.parse(user)
    },
    (error: any) => {
      console.log(error)
    });


  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();}
  }

  public isFirstLogin(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.firstLogin === 'yes' ? true : false;
  }

  public editProfile(): void {
    let navigationExtras: NavigationExtras = {
      state: {
        employee: JSON.stringify(this.user)
      }
    }
    this.router.navigate([`profil/obrada/${this.user.type}`], navigationExtras);
  }

}
