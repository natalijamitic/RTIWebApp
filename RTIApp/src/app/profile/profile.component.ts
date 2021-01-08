import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn.subscribe((user: any) => this.user = JSON.parse(user));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public isFirstLogin(): boolean {
    return this.user.firstLogin === 'yes' ? true : false;
  }
}
