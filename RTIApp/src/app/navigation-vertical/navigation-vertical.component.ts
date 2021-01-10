import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from '../registration/registration.component';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'navigation-vertical',
  templateUrl: './navigation-vertical.component.html',
  styleUrls: ['./navigation-vertical.component.scss']
})
export class NavigationVerticalComponent implements OnInit, OnDestroy {

  public user: IUser = null;
  public subscription: Subscription;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn.subscribe((user: any) => {
      this.user = JSON.parse(user);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();}
  }
}
